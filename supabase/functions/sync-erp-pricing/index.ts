import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LIGHTSPEED_TOKEN = Deno.env.get("LIGHTSPEED_API_TOKEN")!;
const LIGHTSPEED_BASE = "https://ihelpyou.vendhq.com/api/2.0";

// Tag IDs from the ERP
const TAG_IDS: Record<string, string> = {
  "tela iphone": "f457c729-6f58-9753-84b0-8d37fda453ef",
  "bateria iphone": "abd1ccee-a1ab-5123-41d6-ac5ce2cbdfc4",
  "traseira de vidro": "685b1077-e215-4633-8e03-bf4b10893d1b",
  "mao de obra": "76510b18-468a-4fc8-8159-cef6743b8f9c",
};

const TAG_ID_TO_GROUP: Record<string, string> = {};
for (const [group, tagId] of Object.entries(TAG_IDS)) {
  TAG_ID_TO_GROUP[tagId] = group;
}

interface ErpProduct {
  id: string;
  name: string;
  sku: string;
  price_including_tax: number;
  tag_ids: string[];
  active: boolean;
  deleted_at: string | null;
}

function extractModelAndVariant(name: string, group: string): { model: string; modelDisplay: string; variant: string | null } {
  let clean = name;
  
  // Remove group prefix
  const prefixes = ["Bateria ", "Tela ", "Traseira de Vidro ", "Traseira de vidro "];
  for (const p of prefixes) {
    if (clean.startsWith(p)) {
      clean = clean.slice(p.length);
      break;
    }
  }

  // Extract variant
  let variant: string | null = null;
  for (const v of ["Infinity", "Essential"]) {
    if (clean.includes(v)) {
      variant = v;
      clean = clean.replace(v, "").trim();
      break;
    }
  }

  const modelDisplay = clean.trim();
  const model = modelDisplay.toLowerCase();
  return { model, modelDisplay, variant };
}

async function fetchAllProducts(): Promise<ErpProduct[]> {
  const allProducts: ErpProduct[] = [];
  let after = 0;
  
  while (true) {
    const url = `${LIGHTSPEED_BASE}/products?page_size=500&after=${after}`;
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${LIGHTSPEED_TOKEN}` },
    });
    
    if (!res.ok) {
      throw new Error(`Lightspeed API error: ${res.status} ${await res.text()}`);
    }
    
    const data = await res.json();
    const products = data.data || [];
    allProducts.push(...products);
    
    if (products.length < 500) break;
    
    // Use version.max for pagination
    after = data.version?.max || 0;
    if (after === 0) break;
  }
  
  return allProducts;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    console.log("Starting ERP pricing sync...");

    // 1. Fetch all products from Lightspeed
    const allProducts = await fetchAllProducts();
    console.log(`Fetched ${allProducts.length} total products from ERP`);

    // 2. Filter by relevant tags
    const relevantTagIds = new Set(Object.values(TAG_IDS));
    const serviceProducts = allProducts.filter(p => 
      p.tag_ids?.some(t => relevantTagIds.has(t)) && 
      p.active !== false && 
      !p.deleted_at
    );
    console.log(`Found ${serviceProducts.length} service products with relevant tags`);

    // 3. Find labor price first
    let laborPrice = 99.9;
    const laborTagId = TAG_IDS["mao de obra"];
    const laborProduct = serviceProducts.find(p => p.tag_ids?.includes(laborTagId));
    if (laborProduct) {
      laborPrice = laborProduct.price_including_tax;
      console.log(`Labor price from ERP: R$ ${laborPrice}`);
    }

    // 4. Build upsert rows
    const rows: any[] = [];
    const seenKeys = new Set<string>();

    // Add labor row
    if (laborProduct) {
      rows.push({
        service_group: "mao de obra",
        model: null,
        model_display: null,
        variant: null,
        erp_product_id: laborProduct.id,
        service_name: laborProduct.name,
        service_sku: laborProduct.sku,
        service_price: laborProduct.price_including_tax,
        labor_price: 0,
        final_price: laborProduct.price_including_tax,
        active: true,
        synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      seenKeys.add("mao de obra||");
    }

    for (const product of serviceProducts) {
      // Skip labor (already handled) and Vidro iPhone
      if (product.tag_ids?.includes(laborTagId)) continue;
      
      // Determine service group from tags
      let serviceGroup: string | null = null;
      for (const tagId of product.tag_ids || []) {
        if (TAG_ID_TO_GROUP[tagId] && TAG_ID_TO_GROUP[tagId] !== "mao de obra") {
          serviceGroup = TAG_ID_TO_GROUP[tagId];
          break;
        }
      }
      if (!serviceGroup) continue;

      const { model, modelDisplay, variant } = extractModelAndVariant(product.name, serviceGroup);
      const key = `${serviceGroup}|${model}|${variant || ""}`;
      
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      rows.push({
        service_group: serviceGroup,
        model,
        model_display: modelDisplay,
        variant,
        erp_product_id: product.id,
        service_name: product.name,
        service_sku: product.sku,
        service_price: product.price_including_tax,
        labor_price: laborPrice,
        final_price: product.price_including_tax + laborPrice,
        active: true,
        synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    console.log(`Prepared ${rows.length} rows for upsert`);

    // 5. Upsert all rows
    const { error: upsertError } = await supabase
      .from("service_pricing")
      .upsert(rows, { onConflict: "service_group,model,variant" });

    if (upsertError) {
      throw new Error(`Upsert error: ${JSON.stringify(upsertError)}`);
    }

    // 6. Mark products NOT in this sync as inactive
    const syncedIds = rows.map(r => r.erp_product_id).filter(Boolean);
    if (syncedIds.length > 0) {
      const { error: deactivateError } = await supabase
        .from("service_pricing")
        .update({ active: false, updated_at: new Date().toISOString() })
        .not("erp_product_id", "in", `(${syncedIds.map(id => `"${id}"`).join(",")})`);

      if (deactivateError) {
        console.warn("Deactivate error (non-critical):", deactivateError);
      }
    }

    const summary = {
      total_erp_products: allProducts.length,
      service_products_found: serviceProducts.length,
      rows_upserted: rows.length,
      labor_price: laborPrice,
      synced_at: new Date().toISOString(),
    };

    console.log("Sync complete:", JSON.stringify(summary));

    return new Response(JSON.stringify({ success: true, ...summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Sync error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
