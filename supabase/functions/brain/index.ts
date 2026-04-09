import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BUFFER_WINDOW_MS = 6000;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_SUPABASE_URL");
const SUPABASE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY");

const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

// ==================== LOOKUP DATA ====================
const lookupData: any = {"labor_item": {"product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "name": "Mão de Obra", "sku": "10681", "price_including_tax": 99.9, "tag_ids": ["76510b18-468a-4fc8-8159-cef6743b8f9c"], "item_type": "labor"}, "groups": {"tela iphone": ["tela", "display", "frontal"], "bateria iphone": ["bateria"], "traseira de vidro": ["traseira", "traseira de vidro", "vidro traseiro", "back glass"]}, "models": {"iphone se 2ª geração": ["iphone se 2", "iphone se 2020", "se 2", "se 2a geração"], "iphone se 3ª geração": ["iphone se 3", "iphone se 2022", "se 3", "se 3a geração"], "iphone xs max": ["iphone xsmax", "xs max"], "iphone xs": ["iphone xs"], "iphone xr": ["iphone xr"], "iphone x": ["iphone x"], "iphone 11 pro max": ["iphone 11 pro max"], "iphone 11 pro": ["iphone 11 pro"], "iphone 11": ["iphone 11"], "iphone 12 pro max": ["iphone 12 pro max"], "iphone 12 pro": ["iphone 12 pro"], "iphone 12 mini": ["iphone 12 mini"], "iphone 12": ["iphone 12"], "iphone 13 pro max": ["iphone 13 pro max"], "iphone 13 pro": ["iphone 13 pro"], "iphone 13 mini": ["iphone 13 mini"], "iphone 13": ["iphone 13"], "iphone 14 pro max": ["iphone 14 pro max"], "iphone 14 pro": ["iphone 14 pro"], "iphone 14 plus": ["iphone 14 plus"], "iphone 14": ["iphone 14"], "iphone 15 pro max": ["iphone 15 pro max"], "iphone 15 pro": ["iphone 15 pro"], "iphone 15 plus": ["iphone 15 plus"], "iphone 15": ["iphone 15"], "iphone 16 pro max": ["iphone 16 pro max"], "iphone 16 pro": ["iphone 16 pro"], "iphone 16 plus": ["iphone 16 plus"], "iphone 16": ["iphone 16"], "iphone 16e": ["iphone 16e"], "iphone 17 pro max": ["iphone 17 pro max"], "iphone 17 pro": ["iphone 17 pro"], "iphone 17": ["iphone 17"], "iphone air": ["iphone air"], "iphone 8 plus": ["iphone 8 plus"], "iphone 8": ["iphone 8"], "iphone 7 plus": ["iphone 7 plus"], "iphone 7": ["iphone 7"], "iphone 6s plus": ["iphone 6s plus"], "iphone 6s": ["iphone 6s"], "iphone 6 plus": ["iphone 6 plus"], "iphone 6": ["iphone 6"], "iphone 5s/se": ["iphone 5s", "iphone se antigo", "iphone se 1", "5s/se"], "iphone 5c": ["iphone 5c"], "iphone 5": ["iphone 5"]}, "items_by_group_model": {"bateria iphone::iphone 11": [{"group": "bateria iphone", "model": "iPhone 11", "variant": null, "service_product_id": "3ffcc3c9-68b5-d0ca-46b4-d4f58b1be39e", "service_name": "Bateria iPhone 11", "service_sku": "11443", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone 11 pro": [{"group": "bateria iphone", "model": "iPhone 11 Pro", "variant": null, "service_product_id": "2f4db9eb-20e6-bd8b-d288-e84d4f6fe5bd", "service_name": "Bateria iPhone 11 PRO", "service_sku": "11456", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 11 pro max": [{"group": "bateria iphone", "model": "iPhone 11 Pro Max", "variant": null, "service_product_id": "d65055ed-d1f1-416c-9401-a317c31b3c9e", "service_name": "Bateria iPhone 11 PRO MAX", "service_sku": "11796", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 12 mini": [{"group": "bateria iphone", "model": "iPhone 12 Mini", "variant": null, "service_product_id": "4127ee20-6289-4cda-b3bd-a1414589d15e", "service_name": "Bateria iPhone 12 Mini", "service_sku": "12360", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12": [{"group": "bateria iphone", "model": "iPhone 12", "variant": null, "service_product_id": "ff82698a-60a9-4702-82b1-f6abae954b6f", "service_name": "Bateria iPhone 12 / 12 PRO", "service_sku": "12361", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro": [{"group": "bateria iphone", "model": "iPhone 12 Pro", "variant": null, "service_product_id": "ff82698a-60a9-4702-82b1-f6abae954b6f", "service_name": "Bateria iPhone 12 / 12 PRO", "service_sku": "12361", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro max": [{"group": "bateria iphone", "model": "iPhone 12 Pro Max", "variant": null, "service_product_id": "71f89955-b4d4-4523-9ede-bd7744592bb6", "service_name": "Bateria iPhone 12 PRO MAX", "service_sku": "12411", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13": [{"group": "bateria iphone", "model": "iPhone 13", "variant": null, "service_product_id": "8475145f-d428-4499-bb66-a1ae4b598076", "service_name": "Bateria iPhone 13", "service_sku": "12730", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 mini": [{"group": "bateria iphone", "model": "iPhone 13 Mini", "variant": null, "service_product_id": "d2bc7b7b-258f-48d6-b19e-8f04c7c616b3", "service_name": "Bateria iPhone 13 Mini", "service_sku": "12850", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 pro": [{"group": "bateria iphone", "model": "iPhone 13 Pro", "variant": null, "service_product_id": "9811b5e6-8975-4327-b0a5-af46971bdc56", "service_name": "Bateria iPhone 13 PRO", "service_sku": "12731", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 13 pro max": [{"group": "bateria iphone", "model": "iPhone 13 Pro Max", "variant": null, "service_product_id": "f3d68f28-d7d6-4605-9e83-17d9aa6421f0", "service_name": "Bateria iPhone 13 PRO MAX", "service_sku": "12732", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14": [{"group": "bateria iphone", "model": "iPhone 14", "variant": null, "service_product_id": "2c7b29e9-704d-4945-8d09-ec9904edde0b", "service_name": "Bateria iPhone 14", "service_sku": "13301", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 plus": [{"group": "bateria iphone", "model": "iPhone 14 Plus", "variant": null, "service_product_id": "6ee24013-2fe4-4c89-a60a-36165f775881", "service_name": "Bateria iPhone 14 Plus", "service_sku": "13302", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 pro": [{"group": "bateria iphone", "model": "iPhone 14 Pro", "variant": null, "service_product_id": "a38cdcf6-4b4b-4c5a-9b99-17c3ed0a7c74", "service_name": "Bateria iPhone 14 PRO", "service_sku": "13303", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 14 pro max": [{"group": "bateria iphone", "model": "iPhone 14 Pro Max", "variant": null, "service_product_id": "20342eb4-a64c-43db-be96-3779dc80b226", "service_name": "Bateria iPhone 14 PRO MAX", "service_sku": "13304", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15": [{"group": "bateria iphone", "model": "iPhone 15", "variant": null, "service_product_id": "b1d8ffc3-b2c2-4932-b9fa-96f065f3e70a", "service_name": "Bateria iPhone 15", "service_sku": "13585", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 plus": [{"group": "bateria iphone", "model": "iPhone 15 Plus", "variant": null, "service_product_id": "9f07b8af-176e-4619-b26d-39a306fbd943", "service_name": "Bateria iPhone 15 Plus", "service_sku": "13586", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 pro": [{"group": "bateria iphone", "model": "iPhone 15 Pro", "variant": null, "service_product_id": "60525c84-809d-4939-91fd-a20438455196", "service_name": "Bateria iPhone 15 PRO", "service_sku": "13587", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15 pro max": [{"group": "bateria iphone", "model": "iPhone 15 Pro Max", "variant": null, "service_product_id": "1cc013ef-7a9f-40cc-b576-33a5a3726e87", "service_name": "Bateria iPhone 15 PRO MAX", "service_sku": "13588", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16": [{"group": "bateria iphone", "model": "iPhone 16", "variant": null, "service_product_id": "d444efc4-20be-4ebd-8d5c-d65dba7b1e11", "service_name": "Bateria iPhone 16", "service_sku": "14073", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 plus": [{"group": "bateria iphone", "model": "iPhone 16 Plus", "variant": null, "service_product_id": "6eec6d7b-f30d-4fb9-aaac-6e4e18f5e20e", "service_name": "Bateria iPhone 16 Plus", "service_sku": "14074", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 pro": [{"group": "bateria iphone", "model": "iPhone 16 Pro", "variant": null, "service_product_id": "f89a1f45-aae8-4e99-897d-f16e9dfa2a1b", "service_name": "Bateria iPhone 16 PRO", "service_sku": "14075", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "bateria iphone::iphone 16 pro max": [{"group": "bateria iphone", "model": "iPhone 16 Pro Max", "variant": null, "service_product_id": "d4e63dd3-4df8-4cfa-957c-68e18f10e70b", "service_name": "Bateria iPhone 16 PRO MAX", "service_sku": "14076", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "tela iphone::iphone 11": [{"group": "tela iphone", "model": "iPhone 11", "variant": "Infinity", "service_product_id": "6ac26f2c-5c26-4cc6-838e-fddde56e6cd7", "service_name": "Tela iPhone 11 - Infinity", "service_sku": "11440", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}, {"group": "tela iphone", "model": "iPhone 11", "variant": "Essential", "service_product_id": "6ac26f2c-5c26-4cc6-838e-fddde56e6cd7-ess", "service_name": "Tela iPhone 11 - Essential", "service_sku": "11440-E", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "tela iphone::iphone 11 pro": [{"group": "tela iphone", "model": "iPhone 11 Pro", "variant": "Infinity", "service_product_id": "f4d8c6a2-1234-5678-abcd-111111111111", "service_name": "Tela iPhone 11 Pro - Infinity", "service_sku": "11453", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 11 Pro", "variant": "Essential", "service_product_id": "f4d8c6a2-1234-5678-abcd-111111111112", "service_name": "Tela iPhone 11 Pro - Essential", "service_sku": "11453-E", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "tela iphone::iphone 12": [{"group": "tela iphone", "model": "iPhone 12", "variant": "Infinity", "service_product_id": "a1b2c3d4-1234-5678-abcd-121212121212", "service_name": "Tela iPhone 12 - Infinity", "service_sku": "12340", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}, {"group": "tela iphone", "model": "iPhone 12", "variant": "Essential", "service_product_id": "a1b2c3d4-1234-5678-abcd-121212121213", "service_name": "Tela iPhone 12 - Essential", "service_sku": "12340-E", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "tela iphone::iphone 12 pro": [{"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "Infinity", "service_product_id": "b2c3d4e5-1234-5678-abcd-121212121214", "service_name": "Tela iPhone 12 Pro - Infinity", "service_sku": "12341", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "Essential", "service_product_id": "b2c3d4e5-1234-5678-abcd-121212121215", "service_name": "Tela iPhone 12 Pro - Essential", "service_sku": "12341-E", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "tela iphone::iphone 12 pro max": [{"group": "tela iphone", "model": "iPhone 12 Pro Max", "variant": "Infinity", "service_product_id": "c3d4e5f6-1234-5678-abcd-121212121216", "service_name": "Tela iPhone 12 Pro Max - Infinity", "service_sku": "12342", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 12 Pro Max", "variant": "Essential", "service_product_id": "c3d4e5f6-1234-5678-abcd-121212121217", "service_name": "Tela iPhone 12 Pro Max - Essential", "service_sku": "12342-E", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "tela iphone::iphone 13": [{"group": "tela iphone", "model": "iPhone 13", "variant": "Infinity", "service_product_id": "d4e5f6a7-1234-5678-abcd-131313131313", "service_name": "Tela iPhone 13 - Infinity", "service_sku": "12720", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 13", "variant": "Essential", "service_product_id": "d4e5f6a7-1234-5678-abcd-131313131314", "service_name": "Tela iPhone 13 - Essential", "service_sku": "12720-E", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "tela iphone::iphone 13 pro": [{"group": "tela iphone", "model": "iPhone 13 Pro", "variant": "Infinity", "service_product_id": "e5f6a7b8-1234-5678-abcd-131313131315", "service_name": "Tela iPhone 13 Pro - Infinity", "service_sku": "12721", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}, {"group": "tela iphone", "model": "iPhone 13 Pro", "variant": "Essential", "service_product_id": "e5f6a7b8-1234-5678-abcd-131313131316", "service_name": "Tela iPhone 13 Pro - Essential", "service_sku": "12721-E", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "tela iphone::iphone 13 pro max": [{"group": "tela iphone", "model": "iPhone 13 Pro Max", "variant": "Infinity", "service_product_id": "f6a7b8c9-1234-5678-abcd-131313131317", "service_name": "Tela iPhone 13 Pro Max - Infinity", "service_sku": "12722", "service_price": 750.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 849.9}, {"group": "tela iphone", "model": "iPhone 13 Pro Max", "variant": "Essential", "service_product_id": "f6a7b8c9-1234-5678-abcd-131313131318", "service_name": "Tela iPhone 13 Pro Max - Essential", "service_sku": "12722-E", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}], "tela iphone::iphone 14": [{"group": "tela iphone", "model": "iPhone 14", "variant": "Infinity", "service_product_id": "a7b8c9d0-1234-5678-abcd-141414141414", "service_name": "Tela iPhone 14 - Infinity", "service_sku": "13280", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 14", "variant": "Essential", "service_product_id": "a7b8c9d0-1234-5678-abcd-141414141415", "service_name": "Tela iPhone 14 - Essential", "service_sku": "13280-E", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "tela iphone::iphone 14 pro": [{"group": "tela iphone", "model": "iPhone 14 Pro", "variant": "Infinity", "service_product_id": "b8c9d0e1-1234-5678-abcd-141414141416", "service_name": "Tela iPhone 14 Pro - Infinity", "service_sku": "13281", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}, {"group": "tela iphone", "model": "iPhone 14 Pro", "variant": "Essential", "service_product_id": "b8c9d0e1-1234-5678-abcd-141414141417", "service_name": "Tela iPhone 14 Pro - Essential", "service_sku": "13281-E", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}], "tela iphone::iphone 14 pro max": [{"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "Infinity", "service_product_id": "c9d0e1f2-1234-5678-abcd-141414141418", "service_name": "Tela iPhone 14 Pro Max - Infinity", "service_sku": "13282", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}, {"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "Essential", "service_product_id": "c9d0e1f2-1234-5678-abcd-141414141419", "service_name": "Tela iPhone 14 Pro Max - Essential", "service_sku": "13282-E", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}], "tela iphone::iphone 15": [{"group": "tela iphone", "model": "iPhone 15", "variant": "Infinity", "service_product_id": "d0e1f2a3-1234-5678-abcd-151515151515", "service_name": "Tela iPhone 15 - Infinity", "service_sku": "13570", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}, {"group": "tela iphone", "model": "iPhone 15", "variant": "Essential", "service_product_id": "d0e1f2a3-1234-5678-abcd-151515151516", "service_name": "Tela iPhone 15 - Essential", "service_sku": "13570-E", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "tela iphone::iphone 15 pro": [{"group": "tela iphone", "model": "iPhone 15 Pro", "variant": "Infinity", "service_product_id": "e1f2a3b4-1234-5678-abcd-151515151517", "service_name": "Tela iPhone 15 Pro - Infinity", "service_sku": "13571", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}, {"group": "tela iphone", "model": "iPhone 15 Pro", "variant": "Essential", "service_product_id": "e1f2a3b4-1234-5678-abcd-151515151518", "service_name": "Tela iPhone 15 Pro - Essential", "service_sku": "13571-E", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}], "tela iphone::iphone 15 pro max": [{"group": "tela iphone", "model": "iPhone 15 Pro Max", "variant": "Infinity", "service_product_id": "f2a3b4c5-1234-5678-abcd-151515151519", "service_name": "Tela iPhone 15 Pro Max - Infinity", "service_sku": "13572", "service_price": 1100.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1199.9}, {"group": "tela iphone", "model": "iPhone 15 Pro Max", "variant": "Essential", "service_product_id": "f2a3b4c5-1234-5678-abcd-151515151520", "service_name": "Tela iPhone 15 Pro Max - Essential", "service_sku": "13572-E", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 16": [{"group": "tela iphone", "model": "iPhone 16", "variant": "Infinity", "service_product_id": "a3b4c5d6-1234-5678-abcd-161616161616", "service_name": "Tela iPhone 16 - Infinity", "service_sku": "14050", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}, {"group": "tela iphone", "model": "iPhone 16", "variant": "Essential", "service_product_id": "a3b4c5d6-1234-5678-abcd-161616161617", "service_name": "Tela iPhone 16 - Essential", "service_sku": "14050-E", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}], "tela iphone::iphone 16 pro": [{"group": "tela iphone", "model": "iPhone 16 Pro", "variant": "Infinity", "service_product_id": "b4c5d6e7-1234-5678-abcd-161616161618", "service_name": "Tela iPhone 16 Pro - Infinity", "service_sku": "14051", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}, {"group": "tela iphone", "model": "iPhone 16 Pro", "variant": "Essential", "service_product_id": "b4c5d6e7-1234-5678-abcd-161616161619", "service_name": "Tela iPhone 16 Pro - Essential", "service_sku": "14051-E", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}], "tela iphone::iphone 16 pro max": [{"group": "tela iphone", "model": "iPhone 16 Pro Max", "variant": "Infinity", "service_product_id": "c5d6e7f8-1234-5678-abcd-161616161620", "service_name": "Tela iPhone 16 Pro Max - Infinity", "service_sku": "14052", "service_price": 1300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1399.9}, {"group": "tela iphone", "model": "iPhone 16 Pro Max", "variant": "Essential", "service_product_id": "c5d6e7f8-1234-5678-abcd-161616161621", "service_name": "Tela iPhone 16 Pro Max - Essential", "service_sku": "14052-E", "service_price": 1100.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1199.9}], "traseira de vidro::iphone 8": [{"group": "traseira de vidro", "model": "iPhone 8", "variant": null, "service_product_id": "t1-0001", "service_name": "Traseira iPhone 8", "service_sku": "T-8", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone 8 plus": [{"group": "traseira de vidro", "model": "iPhone 8 Plus", "variant": null, "service_product_id": "t1-0002", "service_name": "Traseira iPhone 8 Plus", "service_sku": "T-8P", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone x": [{"group": "traseira de vidro", "model": "iPhone X", "variant": null, "service_product_id": "t1-0003", "service_name": "Traseira iPhone X", "service_sku": "T-X", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "traseira de vidro::iphone 11": [{"group": "traseira de vidro", "model": "iPhone 11", "variant": null, "service_product_id": "t1-0004", "service_name": "Traseira iPhone 11", "service_sku": "T-11", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 12": [{"group": "traseira de vidro", "model": "iPhone 12", "variant": null, "service_product_id": "t1-0005", "service_name": "Traseira iPhone 12", "service_sku": "T-12", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "traseira de vidro::iphone 13": [{"group": "traseira de vidro", "model": "iPhone 13", "variant": null, "service_product_id": "t1-0006", "service_name": "Traseira iPhone 13", "service_sku": "T-13", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 14": [{"group": "traseira de vidro", "model": "iPhone 14", "variant": null, "service_product_id": "t1-0007", "service_name": "Traseira iPhone 14", "service_sku": "T-14", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "traseira de vidro::iphone 15": [{"group": "traseira de vidro", "model": "iPhone 15", "variant": null, "service_product_id": "t1-0008", "service_name": "Traseira iPhone 15", "service_sku": "T-15", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}]}};

// ==================== HELPERS ====================

function getGreetingByHour(): string {
  const now = new Date();
  const brHour = (now.getUTCHours() - 3 + 24) % 24;
  if (brHour >= 5 && brHour < 12) return "Bom dia";
  if (brHour >= 12 && brHour < 19) return "Boa tarde";
  return "Boa noite";
}

function isStoreOpen(): { open: boolean; schedule: string } {
  const now = new Date();
  const brHour = (now.getUTCHours() - 3 + 24) % 24;
  const day = now.getUTCDay();
  // Adjust for BR timezone day boundary
  const brDay = brHour < (now.getUTCHours() < 3 ? 0 : -1) ? ((day - 1 + 7) % 7) : day;
  const actualDay = day; // simplified: use UTC day adjusted
  
  // Mon-Fri: 9-18, Sat: 9-13, Sun: closed
  if (actualDay === 0) return { open: false, schedule: "segunda a sexta das 9h às 18h e sábado das 9h às 13h" };
  if (actualDay === 6) {
    return brHour >= 9 && brHour < 13
      ? { open: true, schedule: "segunda a sexta das 9h às 18h e sábado das 9h às 13h" }
      : { open: false, schedule: "segunda a sexta das 9h às 18h e sábado das 9h às 13h" };
  }
  // Mon-Fri
  return brHour >= 9 && brHour < 18
    ? { open: true, schedule: "segunda a sexta das 9h às 18h e sábado das 9h às 13h" }
    : { open: false, schedule: "segunda a sexta das 9h às 18h e sábado das 9h às 13h" };
}

function getIdentity(): { name: string; intro: string } {
  const { open } = isStoreOpen();
  if (open) {
    return { name: "Emerson", intro: "Emerson, da iHelpU" };
  }
  return { name: "iHelper", intro: "iHelper, assistente virtual da iHelpU" };
}

// ==================== SLOT EXTRACTION (deterministic) ====================

function detectServiceGroup(text: string): string | null {
  const t = text.toLowerCase();
  // Also detect indirect references
  if (/\b(descarreg\w*|carrega\w*|carga|durando pouco|viciada|viciou|saúde da bateria|saude da bateria)\b/i.test(t)) return "bateria iphone";
  if (/(vidro de tr[aá]s|vidro traseiro|quebr\w* (a|o) traseira|traseira quebr)/i.test(t)) return "traseira de vidro";
  for (const [group, keywords] of Object.entries(lookupData.groups)) {
    for (const kw of keywords as string[]) {
      if (t.includes(kw)) return group;
    }
  }
  return null;
}

function detectModel(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z0-9 /+]/g, " ").replace(/\s+/g, " ");
  // Sort models by alias length desc to match "iphone 13 pro max" before "iphone 13"
  const entries = Object.entries(lookupData.models) as [string, string[]][];
  const sorted = entries.flatMap(([canonical, aliases]) =>
    aliases.map(a => ({ canonical, alias: a }))
  ).sort((a, b) => b.alias.length - a.alias.length);
  
  for (const { canonical, alias } of sorted) {
    if (t.includes(alias)) return canonical;
  }
  // Handle shorthand like "13", "14 pro", etc
  const shortMatch = t.match(/\b(1[0-7]|x[sr]?|se)\s*(pro\s*max|pro|plus|mini|e)?\b/);
  if (shortMatch) {
    const num = shortMatch[1];
    const suffix = (shortMatch[2] || "").trim();
    const candidate = `iphone ${num}${suffix ? " " + suffix : ""}`;
    for (const [canonical, aliases] of entries) {
      if (canonical === candidate || (aliases as string[]).includes(candidate)) return canonical;
    }
  }
  return null;
}

function detectDeviceType(text: string): string | null {
  const t = text.toLowerCase();
  if (/\bipad\b/.test(t)) return "ipad";
  if (/\bmac\s*book\b|\bmac\b/.test(t)) return "macbook";
  if (/\bapple\s*watch\b|\bwatch\b/.test(t)) return "apple_watch";
  if (/\bair\s*pod/i.test(t)) return "airpods";
  if (/\biphone\b/.test(t) || detectModel(t)) return "iphone";
  if (/\bsamsung\b|\bmotorola\b|\bxiaomi\b|\bredmi\b|\bgalaxy\b|\bpoco\b/.test(t)) return "other_brand";
  return null;
}

function isJustGreeting(text: string): boolean {
  const t = text.toLowerCase().replace(/[^a-zà-ú ]/g, "").trim();
  return /^(oi|ola|bom dia|boa tarde|boa noite|e ai|eai|fala|salve|hey|hello|hi|tudo bem|tudo certo|tudo bom)\s*[!?.]*\s*(tudo bem|tudo certo|tudo bom|como vai)?[!?.]*$/.test(t);
}

// ==================== QUOTE ENGINE ====================

function getQuote(group: string, model: string): any[] | null {
  const key = `${group}::${model}`;
  return lookupData.items_by_group_model[key] || null;
}

function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

function formatInstallment(price: number): string {
  const inst = price / 6;
  return `6x de ${formatPrice(inst)}`;
}

// ==================== PRE-SERVICE TEMPLATES ====================

function getPreServiceMessage(serviceType: string): string {
  if (serviceType === "tela iphone") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

• Garantia vitalícia na tela (Infinity) / 1 ano (Essential) — A maior do mercado e exclusividade iHelpU ✅

• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️

• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  if (serviceType === "bateria iphone") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

• Garantia de 1 ano — A maior do mercado ✅

• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️

• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  if (serviceType === "traseira de vidro") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

• Garantia de 1 ano — A maior do mercado ✅

• Reparo no mesmo dia! Ficar muito tempo sem iPhone não dá, né?

• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  return "";
}

function formatQuoteMessages(serviceType: string, model: string, items: any[]): string[] {
  const msgs: string[] = [];
  
  if (serviceType === "tela iphone") {
    const infinity = items.find((i: any) => i.variant === "Infinity");
    const essential = items.find((i: any) => i.variant === "Essential");
    
    let priceMsg = `Valores para troca de tela do ${capitalize(model)}:\n\n`;
    if (infinity) {
      priceMsg += `🔷 Infinity (qualidade premium):\n${formatPrice(infinity.final_price)} à vista ou ${formatInstallment(infinity.final_price)}\nGarantia VITALÍCIA na tela ✅\n\n`;
    }
    if (essential) {
      priceMsg += `🔶 Essential (ótimo custo-benefício):\n${formatPrice(essential.final_price)} à vista ou ${formatInstallment(essential.final_price)}\nGarantia de 1 ano ✅`;
    }
    msgs.push(priceMsg);
  } else if (serviceType === "bateria iphone") {
    const item = items[0];
    msgs.push(`Valor para troca de bateria do ${capitalize(model)}:\n\n${formatPrice(item.final_price)} à vista ou ${formatInstallment(item.final_price)}\nGarantia de 1 ano ✅`);
  } else if (serviceType === "traseira de vidro") {
    const item = items[0];
    msgs.push(`Valor para troca da traseira de vidro do ${capitalize(model)}:\n\n${formatPrice(item.final_price)} à vista ou ${formatInstallment(item.final_price)}\nGarantia de 1 ano ✅\n\nO reparo leva aproximadamente 6 horas. Importante: a traseira fragilizada pode acarretar riscos ao aparelho, então recomendamos o conserto o quanto antes.`);
  }
  
  return msgs;
}

function capitalize(s: string): string {
  return s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ==================== GPT NATURALIZER ====================

async function naturalize(text: string, customerName: string): Promise<string> {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) return text;
  
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 300,
        messages: [
          {
            role: "system",
            content: `Você é um assistente que reescreve mensagens de atendimento para soarem naturais e amigáveis, como se um humano tivesse escrito.
Regras:
- NÃO mude valores, preços, garantias, prazos ou informações técnicas
- NÃO adicione informações novas
- NÃO remova informações
- NÃO mude emojis existentes (pode reposicionar levemente)
- Mantenha o tom profissional mas caloroso
- Use o nome "${customerName}" naturalmente quando couber
- Responda APENAS com o texto reescrito, nada mais`
          },
          { role: "user", content: text }
        ]
      })
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content?.trim() || text;
  } catch {
    return text;
  }
}

// ==================== GPT INTENT EXTRACTOR (for ambiguous cases) ====================

async function extractIntent(message: string, context: string): Promise<{ service?: string; device?: string; model?: string; sentiment?: string }> {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) return {};
  
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content: `Extraia a intenção do cliente de uma assistência técnica de Apple.
Retorne JSON com:
- service: "tela"|"bateria"|"traseira"|null
- device: "iphone"|"ipad"|"macbook"|"apple_watch"|"airpods"|"other_brand"|null
- model: string do modelo exato (ex: "iphone 13 pro") ou null
- sentiment: "positive"|"negative"|"neutral"|"objection"

Contexto da conversa: ${context}
Responda APENAS o JSON.`
          },
          { role: "user", content: message }
        ]
      })
    });
    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "{}";
    return JSON.parse(raw.replace(/```json?\n?/g, "").replace(/```/g, ""));
  } catch {
    return {};
  }
}

// ==================== STATE MACHINE ====================

interface BotState {
  stage: string; // greeting | awaiting_problem | awaiting_model | ready_quote | post_quote | handoff | closed_store_informed | non_apple_rejected
  greeted: boolean;
  identity: string; // "Emerson" or "iHelper"  
  device_type: string | null; // iphone, ipad, macbook, etc.
  service_type: string | null; // "tela iphone", "bateria iphone", "traseira de vidro"
  model: string | null;
  quote_sent: boolean;
  pre_service_sent: boolean;
  handoff_reason: string | null;
}

function defaultState(): BotState {
  return {
    stage: "greeting",
    greeted: false,
    identity: getIdentity().name,
    device_type: null,
    service_type: null,
    model: null,
    quote_sent: false,
    pre_service_sent: false,
    handoff_reason: null,
  };
}

interface BrainResult {
  replies: string[];
  action: string; // "reply" | "handoff"
  state: BotState;
  handoff_reason?: string;
}

async function processStateMachine(
  message: string,
  state: BotState,
  customerName: string,
  history: any[]
): Promise<BrainResult> {
  const replies: string[] = [];
  const greeting = getGreetingByHour();
  const identity = getIdentity();
  const store = isStoreOpen();
  
  // Update identity
  state.identity = identity.name;
  
  // ---- SLOT EXTRACTION from current message ----
  const detectedService = detectServiceGroup(message);
  const detectedModel = detectModel(message);
  const detectedDevice = detectDeviceType(message);
  
  // Merge slots (never overwrite with null)
  if (detectedDevice) state.device_type = detectedDevice;
  
  // Only set service_type for iPhones (or if device not yet determined)
  if (detectedService) {
    if (!state.device_type || state.device_type === "iphone") {
      state.service_type = detectedService;
    }
  }
  if (detectedModel) {
    state.model = detectedModel;
    if (!state.device_type) state.device_type = "iphone";
  }
  
  // If we couldn't detect deterministically, use GPT for ambiguous messages
  if (!state.service_type && !state.device_type && !isJustGreeting(message) && !detectedModel) {
    const historyContext = history.slice(-4).map((h: any) => `${h.role}: ${h.content}`).join("\n");
    const intent = await extractIntent(message, historyContext);
    if (intent.service) {
      const serviceMap: Record<string, string> = { tela: "tela iphone", bateria: "bateria iphone", traseira: "traseira de vidro" };
      if (serviceMap[intent.service]) state.service_type = serviceMap[intent.service];
    }
    if (intent.device && !state.device_type) state.device_type = intent.device;
    if (intent.model && !state.model) {
      const matched = detectModel(intent.model);
      if (matched) state.model = matched;
    }
    if (intent.sentiment === "objection") {
      state.stage = "handoff";
      state.handoff_reason = "Cliente apresentou objeção";
    }
  }
  
  // If service detected but no device, assume iPhone for known groups
  if (state.service_type && !state.device_type) {
    state.device_type = "iphone";
  }
  
  // ---- HANDLE NON-APPLE BRANDS ----
  if (state.device_type === "other_brand") {
    if (!state.greeted) {
      replies.push(`${greeting}! 😊 A iHelpU é especializada em Apple, infelizmente não conseguimos ajudar com esse aparelho. 😔`);
    } else {
      replies.push(`A iHelpU é especializada em Apple, infelizmente não conseguimos ajudar com esse aparelho. 😔`);
    }
    state.greeted = true;
    state.stage = "non_apple_rejected";
    return { replies, action: "reply", state };
  }
  
  // ---- HANDLE NON-IPHONE APPLE DEVICES (handoff) ----
  if (state.device_type && ["ipad", "macbook", "apple_watch", "airpods"].includes(state.device_type)) {
    if (!state.greeted) {
      const deviceLabel = { ipad: "iPad", macbook: "MacBook", apple_watch: "Apple Watch", airpods: "AirPods" }[state.device_type] || state.device_type;
      
      if (state.model || detectedService) {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Vou encaminhar seu atendimento para um colega especialista em ${deviceLabel}. 😊`);
      } else {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Atendemos ${deviceLabel} sim! Para adiantar, me conta qual é o modelo e o que aconteceu com ele? Assim conseguimos agilizar o seu atendimento. 😊`);
      }
      state.greeted = true;
    } else {
      replies.push(`Vou encaminhar seu atendimento para um colega especialista. 😊`);
    }
    
    if (!store.open) {
      replies.push(`Estamos fechados neste momento. Nosso horário de atendimento é ${store.schedule}. Assim que abrirmos, daremos andamento ao seu atendimento! 😊`);
    }
    
    state.stage = "handoff";
    state.handoff_reason = `Atendimento ${state.device_type} — encaminhar para especialista`;
    return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
  }
  
  // ---- IPHONE FLOW (state machine) ----
  
  // STAGE: Greeting (first contact)
  if (!state.greeted) {
    state.greeted = true;
    
    if (isJustGreeting(message)) {
      // Just a greeting, no problem mentioned
      if (!store.open) {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊\n\nEstamos fechados neste momento. Nosso horário de atendimento é ${store.schedule}. Mas pode me contar o que precisa que já vou adiantando! Como posso te ajudar?`);
        state.stage = "awaiting_problem";
      } else {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Como posso te ajudar? 😊`);
        state.stage = "awaiting_problem";
      }
      return { replies, action: "reply", state };
    }
    
    // Greeting + problem in first message
    if (state.service_type && state.model) {
      // Has everything → go straight to quote
      if (!store.open) {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊\n\nEstamos fechados neste momento, mas nosso horário de atendimento é ${store.schedule}. Já vou te passando as informações!`);
      } else {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Certo, você está no lugar certo! 😊`);
      }
      // Continue to quote generation below
      state.stage = "ready_quote";
    } else if (state.service_type && !state.model) {
      // Has service but no model
      if (!store.open) {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊\n\nEstamos fechados neste momento, mas nosso horário é ${store.schedule}. Já vou adiantando! Qual é o modelo do seu iPhone?`);
      } else {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Certo, você está no lugar certo! Qual é o modelo do seu iPhone? 😊`);
      }
      state.stage = "awaiting_model";
      return { replies, action: "reply", state };
    } else {
      // Has some info but unclear
      if (!store.open) {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊\n\nEstamos fechados neste momento, nosso horário é ${store.schedule}. Mas pode me contar o que precisa que já vou adiantando!`);
      } else {
        replies.push(`${greeting}! Eu sou o ${identity.intro}. Me conta mais, o que aconteceu com o seu aparelho? 😊`);
      }
      state.stage = "awaiting_problem";
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Awaiting problem description
  if (state.stage === "awaiting_problem") {
    if (state.service_type && state.model) {
      replies.push(`Certo, ${capitalize(state.model)} com problema na ${state.service_type === "tela iphone" ? "tela" : state.service_type === "bateria iphone" ? "bateria" : "traseira de vidro"}. Você está no lugar certo! 😊`);
      state.stage = "ready_quote";
    } else if (state.service_type && !state.model) {
      replies.push(`Entendi! Qual é o modelo do seu iPhone? 😊`);
      state.stage = "awaiting_model";
      return { replies, action: "reply", state };
    } else if (!state.service_type && state.model) {
      replies.push(`Qual serviço você precisa para o ${capitalize(state.model)}? Temos troca de tela, bateria e traseira de vidro. 😊`);
      return { replies, action: "reply", state };
    } else {
      // Still unclear — use GPT to understand
      replies.push(`Me conta o que aconteceu com o seu aparelho para eu te ajudar melhor! 😊`);
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Awaiting model
  if (state.stage === "awaiting_model") {
    if (state.model) {
      replies.push(`${capitalize(state.model)}, perfeito! 😊`);
      state.stage = "ready_quote";
    } else {
      // Couldn't detect model
      replies.push(`Não consegui identificar o modelo. Pode me informar o modelo exato do seu iPhone? Por exemplo: iPhone 13, iPhone 14 Pro, etc.`);
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Ready to send quote
  if (state.stage === "ready_quote" && state.service_type && state.model) {
    const items = getQuote(state.service_type, state.model);
    
    if (!items || items.length === 0) {
      replies.push(`Infelizmente não encontrei o preço para esse modelo/serviço no momento. Vou te encaminhar para um colega que pode te ajudar! 😊`);
      state.stage = "handoff";
      state.handoff_reason = `Preço não encontrado: ${state.service_type} ${state.model}`;
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    // Send pre-service message
    if (!state.pre_service_sent) {
      replies.push(getPreServiceMessage(state.service_type));
      state.pre_service_sent = true;
    }
    
    // Send price
    const priceMessages = formatQuoteMessages(state.service_type, state.model, items);
    replies.push(...priceMessages);
    
    // Send closing question based on service type
    if (state.service_type === "bateria iphone") {
      replies.push(`Você sabe me dizer a saúde da sua bateria? Pode verificar em Ajustes → Bateria → Saúde da Bateria. Se estiver abaixo de 80%, recomendamos a troca! 😊\n\nFicou alguma dúvida? Gostaria de agendar o atendimento?`);
    } else if (state.service_type === "traseira de vidro") {
      replies.push(`Ficou alguma dúvida? Gostaria de agendar um horário para o reparo? 😊`);
    } else {
      replies.push(`Ficou alguma dúvida? Gostaria de agendar o atendimento? 😊`);
    }
    
    state.quote_sent = true;
    state.stage = "post_quote";
    
    // Save quote data
    if (supabase) {
      // We'll let the caller save state
    }
    
    return { replies, action: "reply", state };
  }
  
  // STAGE: Post-quote (after prices sent)
  if (state.stage === "post_quote") {
    const t = message.toLowerCase();
    
    // Check for scheduling intent
    if (/\b(agendar|agenda|marcar|horário|horario|sim|quero|vamos|bora)\b/.test(t)) {
      if (!store.open) {
        replies.push(`Nosso horário de atendimento é ${store.schedule}. Se chegar cedinho, conseguimos dar prioridade pro seu iPhone! Vou encaminhar para o Emerson finalizar o agendamento assim que abrirmos. 😊`);
      } else {
        replies.push(`Ótimo! Vou te encaminhar para o Emerson finalizar o agendamento. 😊`);
      }
      state.stage = "handoff";
      state.handoff_reason = "Cliente quer agendar atendimento";
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    // Check for objection or doubt
    if (/\b(caro|muito|não|nao|duvida|dúvida|pensar|depois|outro)\b/.test(t)) {
      replies.push(`Entendo! Vou te encaminhar para um colega que pode te ajudar melhor com isso. 😊`);
      state.stage = "handoff";
      state.handoff_reason = "Cliente com objeção ou dúvida pós-orçamento";
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    // Generic post-quote response
    replies.push(`Posso te ajudar com mais alguma coisa? Se quiser agendar, é só me dizer! 😊`);
    return { replies, action: "reply", state };
  }
  
  // Fallback
  replies.push(`Como posso te ajudar? 😊`);
  return { replies, action: "reply", state };
}

// ==================== DEBOUNCE + MAIN HANDLER ====================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const message: string = body.message || "";
    const history: any[] = body.history || [];
    const context = body.context || {};
    const conversationId: string = context.conversation_id || "";
    const customerFirstName: string = context.contact_first_name || "";
    const customerName: string = context.contact_display_name || customerFirstName || "amigo";

    console.log("=== BRAIN INPUT ===", JSON.stringify({
      message,
      history_length: history.length,
      conversation_id: conversationId,
      customer: customerName,
    }));

    if (!message.trim()) {
      return new Response(JSON.stringify({ replies: [], action: "reply", state: {} }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ---- DEBOUNCE: wait buffer then aggregate ----
    if (supabase && conversationId) {
      await new Promise(r => setTimeout(r, BUFFER_WINDOW_MS));
      
      // Get the latest inbound messages since last outbound
      const { data: recentMsgs } = await supabase
        .from("messages")
        .select("content_text, direction, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (recentMsgs && recentMsgs.length > 0) {
        // Find last outbound
        const lastOutIdx = recentMsgs.findIndex((m: any) => m.direction === "outbound");
        const pendingInbound = lastOutIdx === -1
          ? recentMsgs.filter((m: any) => m.direction === "inbound")
          : recentMsgs.slice(0, lastOutIdx).filter((m: any) => m.direction === "inbound");
        
        // Check if THIS execution's message is the latest
        const latestInbound = pendingInbound[0];
        if (latestInbound && latestInbound.content_text !== message) {
          // A newer message arrived — this execution is stale, skip
          console.log("=== BRAIN SKIP (stale) ===", { my_msg: message, latest: latestInbound.content_text });
          return new Response(JSON.stringify({ replies: [], action: "skip", state: {} }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        // Aggregate all pending inbound into one
        if (pendingInbound.length > 1) {
          const aggregated = pendingInbound.reverse().map((m: any) => m.content_text).filter(Boolean).join("\n");
          console.log("=== BRAIN AGGREGATED ===", { count: pendingInbound.length, aggregated });
          // Use aggregated message
          var effectiveMessage = aggregated;
        } else {
          var effectiveMessage = message;
        }
      } else {
        var effectiveMessage = message;
      }
    } else {
      var effectiveMessage = message;
    }

    // ---- LOAD STATE from conversations.bot_state ----
    let state: BotState = defaultState();
    if (supabase && conversationId) {
      const { data: conv } = await supabase
        .from("conversations")
        .select("bot_state")
        .eq("id", conversationId)
        .single();
      
      if (conv?.bot_state && typeof conv.bot_state === "object" && conv.bot_state.stage) {
        state = { ...defaultState(), ...conv.bot_state } as BotState;
      }
    }

    console.log("=== BRAIN STATE LOADED ===", JSON.stringify(state));

    // ---- PROCESS ----
    const result = await processStateMachine(effectiveMessage, state, customerFirstName || "amigo", history);

    // ---- NATURALIZE replies with GPT (light touch) ----
    const naturalizedReplies: string[] = [];
    for (const reply of result.replies) {
      // Only naturalize longer messages (skip short ones)
      if (reply.length > 80) {
        naturalizedReplies.push(await naturalize(reply, customerFirstName || "amigo"));
      } else {
        naturalizedReplies.push(reply);
      }
    }

    // ---- SAVE STATE ----
    if (supabase && conversationId) {
      await supabase
        .from("conversations")
        .update({ bot_state: result.state, last_quote_data: result.state.quote_sent ? result.state : null })
        .eq("id", conversationId);
    }

    console.log("=== BRAIN OUTPUT ===", JSON.stringify({
      action: result.action,
      replies_count: naturalizedReplies.length,
      state: result.state,
    }));

    return new Response(
      JSON.stringify({
        replies: naturalizedReplies,
        action: result.action,
        state: result.state,
        handoff_reason: result.handoff_reason || null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("BRAIN ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message, replies: ["Desculpe, tive um problema. Pode repetir?"], action: "reply" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
