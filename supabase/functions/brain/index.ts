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
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

// ==================== LOOKUP DATA (groups & models are semantic mappings, items come from DB) ====================
const lookupData: any = {
  "labor_item": { "product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "name": "Mão de Obra", "sku": "10681", "price_including_tax": 99.9, "tag_ids": ["76510b18-468a-4fc8-8159-cef6743b8f9c"], "item_type": "labor" },
  "groups": {
    "tela iphone": ["tela", "display", "frontal"],
    "bateria iphone": ["bateria"],
    "traseira de vidro": ["traseira", "traseira de vidro", "vidro traseiro", "back glass"]
  },
  "models": {
    "iphone se 2ª geração": ["iphone se 2", "iphone se 2020", "se 2", "se 2a geração", "iphone se 2nd geração"],
    "iphone se 3ª geração": ["iphone se 3", "iphone se 2022", "se 3", "se 3a geração"],
    "iphone xs max": ["iphone xsmax", "xs max", "iphone xs max", "xsmax"],
    "iphone xs": ["iphone xs", "xs"],
    "iphone xr": ["iphone xr", "xr"],
    "iphone x": ["iphone x", "x"],
    "iphone 11 pro max": ["iphone 11 pro max"],
    "iphone 11 pro": ["iphone 11 pro"],
    "iphone 11": ["iphone 11", "11"],
    "iphone 12 pro max": ["iphone 12 pro max"],
    "iphone 12 pro": ["iphone 12 pro"],
    "iphone 12 mini": ["iphone 12 mini"],
    "iphone 12": ["iphone 12", "12"],
    "iphone 13 pro max": ["iphone 13 pro max"],
    "iphone 13 pro": ["iphone 13 pro"],
    "iphone 13 mini": ["iphone 13 mini"],
    "iphone 13": ["iphone 13", "13"],
    "iphone 14 pro max": ["iphone 14 pro max"],
    "iphone 14 pro": ["iphone 14 pro"],
    "iphone 14 plus": ["iphone 14 plus"],
    "iphone 14": ["iphone 14", "14"],
    "iphone 15 pro max": ["iphone 15 pro max"],
    "iphone 15 pro": ["iphone 15 pro"],
    "iphone 15 plus": ["iphone 15 plus"],
    "iphone 15": ["iphone 15", "15"],
    "iphone 16 pro max": ["iphone 16 pro max"],
    "iphone 16 pro": ["iphone 16 pro"],
    "iphone 16 plus": ["iphone 16 plus"],
    "iphone 16": ["iphone 16", "16"],
    "iphone 16e": ["iphone 16e", "16e"],
    "iphone 17 pro max": ["iphone 17 pro max"],
    "iphone 17 pro": ["iphone 17 pro"],
    "iphone 17": ["iphone 17", "17"],
    "iphone air": ["iphone air", "air"],
    "iphone 8 plus": ["iphone 8 plus", "8 plus"],
    "iphone 8": ["iphone 8", "8"],
    "iphone 7 plus": ["iphone 7 plus", "7 plus"],
    "iphone 7": ["iphone 7", "7"],
    "iphone 6s plus": ["iphone 6s plus", "6s plus"],
    "iphone 6s": ["iphone 6s", "6s"],
    "iphone 6 plus": ["iphone 6 plus", "6 plus"],
    "iphone 6": ["iphone 6", "6"],
    "iphone 5s/se": ["iphone 5s", "iphone se antigo", "iphone se 1", "5s/se", "5s"],
    "iphone 5c": ["iphone 5c", "5c"],
    "iphone 5": ["iphone 5", "5"],
    "iphone se": ["iphone se", "se"]
  },
  "items_by_group_model": {} as Record<string, any[]>
};

// Load pricing data from service_pricing table
async function loadPricingData(): Promise<void> {
  if (!supabase) {
    console.warn("No supabase client, using empty pricing data");
    return;
  }
  
  try {
    const { data: laborRow } = await supabase
      .from("service_pricing")
      .select("service_price, erp_product_id")
      .eq("service_group", "mao de obra")
      .eq("active", true)
      .single();
    
    if (laborRow) {
      lookupData.labor_item.price_including_tax = laborRow.service_price;
      lookupData.labor_item.product_id = laborRow.erp_product_id;
    }
    
    const { data: pricingRows, error } = await supabase
      .from("service_pricing")
      .select("*")
      .eq("active", true)
      .neq("service_group", "mao de obra");
    
    if (error) {
      console.error("Error loading pricing data:", error);
      return;
    }
    
    const items: Record<string, any[]> = {};
    for (const row of pricingRows || []) {
      const key = `${row.service_group}::${row.model}`;
      if (!items[key]) items[key] = [];
      items[key].push({
        group: row.service_group,
        model: row.model_display,
        variant: row.variant,
        service_product_id: row.erp_product_id,
        service_name: row.service_name,
        service_sku: row.service_sku,
        service_price: row.service_price,
        labor_product_id: lookupData.labor_item.product_id,
        labor_name: "Mão de Obra",
        labor_price: lookupData.labor_item.price_including_tax,
        final_price: row.final_price,
      });
    }
    
    lookupData.items_by_group_model = items;
    console.log(`Loaded ${pricingRows?.length || 0} pricing items from DB, ${Object.keys(items).length} unique model-group combos`);
  } catch (err) {
    console.error("Failed to load pricing data:", err);
  }
}

let pricingLoaded = false;

// ==================== TYPES ====================
interface BotState {
  stage: string;
  greeted: boolean;
  identity: string;
  device_type: string | null;
  service_type: string | null;
  model: string | null;
  quote_sent: boolean;
  pre_service_sent: boolean;
  handoff_reason: string | null;
  closed_notice_sent: boolean;
  last_processed_at: string | null;
}

function defaultState(): BotState {
  return {
    stage: "greeting",
    greeted: false,
    identity: "iHelper",
    device_type: null,
    service_type: null,
    model: null,
    quote_sent: false,
    pre_service_sent: false,
    handoff_reason: null,
    closed_notice_sent: false,
    last_processed_at: null,
  };
}

// ==================== HELPERS ====================
function getTimeGreeting(): string {
  const now = new Date();
  const brHour = (now.getUTCHours() - 3 + 24) % 24;
  if (brHour >= 5 && brHour < 12) return "Bom dia";
  if (brHour >= 12 && brHour < 19) return "Boa tarde";
  return "Boa noite";
}

function getStoreInfo(): { open: boolean; schedule: string; identity: { name: string; intro: string } } {
  const now = new Date();
  const brHour = (now.getUTCHours() - 3 + 24) % 24;
  const dayOfWeek = now.getUTCDay();
  
  let open = false;
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    open = brHour >= 9 && brHour < 18;
  } else if (dayOfWeek === 6) {
    open = brHour >= 9 && brHour < 13;
  }
  
  const identity = open
    ? { name: "Emerson", intro: "Emerson, da iHelpU" }
    : { name: "iHelper", intro: "iHelper, assistente virtual da iHelpU" };
  
  return {
    open,
    schedule: "segunda a sexta das 9h às 18h, e sábados das 9h às 13h",
    identity,
  };
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

function isJustGreeting(msg: string): boolean {
  const t = msg.toLowerCase().replace(/[!?.,"']/g, "").trim();
  const greetings = ["boa noite", "boa tarde", "bom dia", "oi", "ola", "olá", "e aí", "e ai", "eai",
    "tudo bem", "tudo bom", "boa noite tudo bem", "boa tarde tudo bem", "bom dia tudo bem",
    "oi tudo bem", "ola tudo bem", "hey", "hello", "hi"];
  return greetings.some(g => t === g || t.startsWith(g + " ") && t.length < g.length + 15);
}

function detectService(msg: string): string | null {
  const t = msg.toLowerCase();
  for (const [group, keywords] of Object.entries(lookupData.groups as Record<string, string[]>)) {
    for (const kw of keywords) {
      if (t.includes(kw)) return group;
    }
  }
  return null;
}

function detectModel(msg: string, shortMatch = false): string | null {
  const t = msg.toLowerCase().replace(/[^a-z0-9\s\/]/g, "").trim();
  // Sort by length descending so "iphone 13 pro max" matches before "iphone 13"
  const sortedModels = Object.entries(lookupData.models as Record<string, string[]>)
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [canonical, aliases] of sortedModels) {
    for (const alias of aliases) {
      // Short aliases (<=2 chars): in shortMatch mode allow exact match; otherwise require context words
      if (alias.length <= 2 && !shortMatch) {
        const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const contextPattern = new RegExp(`(meu|minha|do meu|da minha|do|da|iphone|ifone)\\s+${escaped}\\b`, "i");
        if (contextPattern.test(t)) return canonical;
        continue;
      }
      if (shortMatch && alias.length <= 2) {
        // For short aliases, require exact match (not substring)
        if (t === alias || t === `iphone ${alias}`) return canonical;
      } else {
        if (t.includes(alias)) return canonical;
      }
    }
    if (t.includes(canonical)) return canonical;
  }
  return null;
}

function detectDevice(msg: string): string | null {
  const t = msg.toLowerCase();
  if (/\b(samsung|motorola|moto g|moto e|galaxy|xiaomi|redmi|poco|huawei|lg|asus|nokia|oneplus|oppo|vivo|realme)\b/.test(t)) return "other_brand";
  if (/\b(ipad|i pad)\b/.test(t)) return "ipad";
  if (/\b(macbook|mac book|imac|i mac|mac mini|mac pro|mac studio)\b/.test(t)) return "macbook";
  if (/\b(apple watch|iwatch|i watch)\b/.test(t)) return "apple_watch";
  if (/\b(airpods?|air pods?)\b/.test(t)) return "airpods";
  if (/\b(iphone|ifone|i phone|i fone)\b/.test(t)) return "iphone";
  return null;
}

function getQuote(serviceType: string, model: string): any[] | null {
  const key = `${serviceType}::${model}`;
  return lookupData.items_by_group_model[key] || null;
}

function getPreServiceMessage(serviceType: string): string {
  if (serviceType === "tela iphone") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:\n\n• Garantia vitalícia na tela - A maior do mercado e exclusividade iHelpU ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  if (serviceType === "bateria iphone") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — A maior do mercado ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  if (serviceType === "traseira de vidro") {
    return `Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — A maior do mercado ✅\n\n• Reparo no mesmo dia! Ficar muito tempo sem iPhone não dá, né?\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡`;
  }
  return "";
}

function formatQuoteMessages(serviceType: string, model: string, items: any[]): string[] {
  const modelDisplay = capitalize(model);
  
  if (serviceType === "tela iphone") {
    const infinity = items.find((i: any) => i.variant === "Infinity");
    const essential = items.find((i: any) => i.variant === "Essential");
    
    let msg = `Valores para troca de tela do ${modelDisplay}:\n\n`;
    if (infinity) {
      const parcela = (infinity.final_price / 6).toFixed(2).replace(".", ",");
      msg += `🔷 Infinity (qualidade premium):\nR$ ${infinity.final_price.toFixed(2).replace(".", ",")} à vista ou 6x de R$ ${parcela}\nGarantia VITALÍCIA na tela ✅\n\n`;
    }
    if (essential) {
      const parcela = (essential.final_price / 6).toFixed(2).replace(".", ",");
      msg += `🔶 Essential (ótimo custo-benefício):\nR$ ${essential.final_price.toFixed(2).replace(".", ",")} à vista ou 6x de R$ ${parcela}\nGarantia de 1 ano ✅`;
    }
    return [msg.trim()];
  }
  
  if (serviceType === "bateria iphone" && items.length > 0) {
    const item = items[0];
    const parcela = (item.final_price / 6).toFixed(2).replace(".", ",");
    return [`Valor para troca de bateria do ${modelDisplay}:\n\nR$ ${item.final_price.toFixed(2).replace(".", ",")} à vista ou 6x de R$ ${parcela}\nGarantia de 1 ano ✅`];
  }
  
  if (serviceType === "traseira de vidro" && items.length > 0) {
    const item = items[0];
    const parcela = (item.final_price / 6).toFixed(2).replace(".", ",");
    return [`Valor para troca da traseira de vidro do ${modelDisplay}:\n\nR$ ${item.final_price.toFixed(2).replace(".", ",")} à vista ou 6x de R$ ${parcela}\nGarantia de 1 ano ✅`];
  }
  
  return [];
}

// ==================== GPT INTENT EXTRACTION ====================
async function extractIntent(message: string): Promise<{ service: string | null; device: string | null; model: string | null; sentiment: string | null }> {
  // First try deterministic
  const service = detectService(message);
  const model = detectModel(message);
  const device = detectDevice(message);
  
  // If we got something useful, skip GPT
  if (service || model || device) {
    return { service, device, model, sentiment: null };
  }
  
  // Use GPT only for ambiguous messages
  if (!OPENAI_API_KEY) return { service: null, device: null, model: null, sentiment: null };
  
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content: `Você é um extrator de intenção para uma assistência técnica Apple. Extraia do texto:
- service: "tela"|"bateria"|"traseira"|null
- device: "iphone"|"ipad"|"macbook"|"apple_watch"|"airpods"|"other_brand"|null
- model: modelo específico ou null (ex: "iphone 13 pro")
- sentiment: "positive"|"negative"|"objection"|"neutral"|null
Retorne APENAS JSON válido, sem markdown.`,
          },
          { role: "user", content: message },
        ],
      }),
    });
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "{}";
    return JSON.parse(text);
  } catch {
    return { service: null, device: null, model: null, sentiment: null };
  }
}

// ==================== SESSION MANAGEMENT ====================
async function findOrCreateConversation(contactId: string, channelId: string): Promise<{ conversationId: string; state: BotState }> {
  if (!supabase) throw new Error("No supabase client");
  
  const SESSION_EXPIRE_MS = 30 * 60 * 1000; // 30 minutes
  
  // Look for existing open conversation for this contact + channel
  const { data: existing } = await supabase
    .from("conversations")
    .select("id, bot_state, last_interaction_at")
    .eq("contact_id", contactId)
    .eq("whatsapp_channel_id", channelId)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1);
  
  if (existing && existing.length > 0) {
    const conv = existing[0];
    
    // Auto-expire: if last interaction was > 30min ago, close old session and start fresh
    const lastInteraction = conv.last_interaction_at ? new Date(conv.last_interaction_at).getTime() : 0;
    const now = Date.now();
    if (lastInteraction > 0 && (now - lastInteraction) > SESSION_EXPIRE_MS) {
      console.log("=== SESSION EXPIRED ===", { conversation_id: conv.id, age_min: Math.round((now - lastInteraction) / 60000) });
      await supabase.from("conversations").update({ status: "closed" }).eq("id", conv.id);
      // Fall through to create new conversation below
    } else {
      const state = (conv.bot_state && typeof conv.bot_state === "object" && (conv.bot_state as any).stage)
        ? { ...defaultState(), ...(conv.bot_state as any) } as BotState
        : defaultState();
      
      console.log("=== SESSION REUSED ===", { conversation_id: conv.id, state_stage: state.stage });
      return { conversationId: conv.id, state };
    }
  }
  
  // Create new conversation
  const { data: newConv, error } = await supabase
    .from("conversations")
    .insert({
      contact_id: contactId,
      whatsapp_channel_id: channelId,
      status: "open",
      bot_enabled: true,
      bot_state: defaultState(),
    })
    .select("id")
    .single();
  
  if (error || !newConv) throw new Error(`Failed to create conversation: ${error?.message}`);
  
  console.log("=== SESSION CREATED ===", { conversation_id: newConv.id });
  return { conversationId: newConv.id, state: defaultState() };
}

// ==================== STATE MACHINE ====================
async function processStateMachine(
  message: string,
  state: BotState,
  customerName: string,
  history: any[]
): Promise<{ replies: Array<string | { text: string; delay_before: number }>; action: string; state: BotState; handoff_reason?: string }> {
  const replies: Array<string | { text: string; delay_before: number }> = [];
  const store = getStoreInfo();
  const greeting = getTimeGreeting();
  const identity = store.identity;
  
  // ---- SMART RESET: if greeting arrives during terminal stages, restart conversation ----
  if (isJustGreeting(message) && ["post_quote", "handoff", "non_apple_rejected"].includes(state.stage)) {
    console.log("=== BRAIN SMART RESET ===", { old_stage: state.stage, message });
    state = defaultState();
  }
  
  // Update identity in state
  state.identity = identity.name;
  
  // ---- EXTRACT INTENT ----
  const isAwaitingModel = state.stage === "awaiting_model";
  const detectedService = detectService(message);
  const detectedModel = detectModel(message, isAwaitingModel);
  const detectedDevice = detectDevice(message);
  
  // Map service keywords to group names
  const serviceMap: Record<string, string> = { tela: "tela iphone", bateria: "bateria iphone", traseira: "traseira de vidro" };
  
  // Keywords indicating a service we don't quote automatically — triggers handoff
  const unsupportedKeywords = ["câmera", "camera", "face id", "faceid", "alto-falante",
    "alto falante", "microfone", "placa", "botão", "botao", "carregador", "conector",
    "speaker", "dock", "sensor", "desbloqueio", "desbloquear", "software", "atualização",
    "atualizacao", "touch id", "touchid", "sim", "chip", "antena", "vibra", "vibracall",
    "auricular", "lanterna", "flash", "ligar", "nao liga", "não liga", "travou", "travado",
    "lento", "reiniciando", "molhou", "agua", "água", "caiu na agua"];
  
  function isUnsupportedService(msg: string): boolean {
    const t = msg.toLowerCase();
    return unsupportedKeywords.some(kw => t.includes(kw));
  }
  
  // Fill slots (never overwrite existing with null)
  if (detectedService && !state.service_type) state.service_type = detectedService;
  if (detectedDevice && !state.device_type) state.device_type = detectedDevice;
  if (detectedModel && !state.model) {
    state.model = detectedModel;
  }
  
  // If nothing detected deterministically, try GPT
  if (!detectedService && !detectedModel && !detectedDevice && !isJustGreeting(message)) {
    const intent = await extractIntent(message);
    if (intent.service && !state.service_type) {
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
      replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊\n\nA iHelpU é especializada em Apple, infelizmente não conseguimos ajudar com esse aparelho. 😔`);
    } else {
      replies.push(`A iHelpU é especializada em Apple, infelizmente não conseguimos ajudar com esse aparelho. 😔`);
    }
    state.greeted = true;
    state.stage = "non_apple_rejected";
    return { replies, action: "handoff", state, handoff_reason: "Aparelho não-Apple" };
  }
  
  // ---- HANDLE HANDOFF: non-iPhone devices OR iPhone with unsupported service ----
  const isNonIphoneApple = state.device_type && ["ipad", "macbook", "apple_watch", "airpods"].includes(state.device_type);
  const isIphoneUnsupported = state.device_type === "iphone" && !state.service_type && isUnsupportedService(message);
  
  if (isNonIphoneApple || isIphoneUnsupported) {
    const deviceLabels: Record<string, string> = { ipad: "iPad", macbook: "MacBook", apple_watch: "Apple Watch", airpods: "AirPods", iphone: "iPhone" };
    const deviceLabel = deviceLabels[state.device_type!] || state.device_type!;
    
    if (!state.greeted) {
      state.greeted = true;
      
      if (store.open) {
        if (state.model || detectedService || isIphoneUnsupported) {
          replies.push(`${greeting}! Eu sou o ${identity.intro}. Vou encaminhar seu atendimento para um colega especialista. 😊`);
        } else {
          replies.push(`${greeting}! Eu sou o ${identity.intro}. Atendemos ${deviceLabel} sim! Para adiantar, me conta qual é o modelo e o que aconteceu com ele? Assim conseguimos agilizar o seu atendimento. 😊`);
        }
      } else {
        state.closed_notice_sent = true;
        const hasDetails = state.model || detectedService || isIphoneUnsupported;
        let msg = `${greeting}! Eu sou o ${identity.intro}. ${isNonIphoneApple ? `Atendemos ${deviceLabel} sim! ` : ""}😊\n\nEstamos fechados neste momento. Nosso horário de atendimento é ${store.schedule}. Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊`;
        if (!hasDetails) {
          msg += `\n\nPara agilizarmos seu atendimento, me fala qual o problema do seu aparelho e o modelo.`;
        }
        replies.push(msg);
      }
    } else {
      if (store.open) {
        replies.push(`Vou encaminhar seu atendimento para um colega especialista. 😊`);
      } else {
        if (!state.closed_notice_sent) {
          replies.push(`Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊`);
          state.closed_notice_sent = true;
        } else {
          replies.push(`Anotado! Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊`);
        }
      }
    }
    
    state.stage = "handoff";
    state.handoff_reason = isIphoneUnsupported
      ? `Serviço iPhone não cotado automaticamente — encaminhar para especialista`
      : `Atendimento ${deviceLabel} — encaminhar para especialista`;
    return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
  }
  
  // ---- IPHONE FLOW (state machine) ----
  
  // STAGE: Greeting (first contact)
  if (!state.greeted) {
    state.greeted = true;
    
    // Closed notice (only once)
    const closedNotice = (!store.open && !state.closed_notice_sent)
      ? `\n\nEstamos fechados neste momento. Nosso horário de atendimento é ${store.schedule}. Mas pode me contar o que precisa que já vou adiantando!`
      : "";
    if (!store.open) state.closed_notice_sent = true;
    
    if (isJustGreeting(message)) {
      replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊${closedNotice}${closedNotice ? "" : "\n\nComo posso te ajudar?"}`);
      state.stage = "awaiting_problem";
      return { replies, action: "reply", state };
    }
    
    // Greeting + problem in first message
    if (state.service_type && state.model) {
      replies.push(`${greeting}! Eu sou o ${identity.intro}. Certo, você está no lugar certo! 😊${closedNotice ? closedNotice + " Já vou te passando as informações!" : ""}`);
      state.stage = "ready_quote";
    } else if (state.service_type && !state.model) {
      replies.push(`${greeting}! Eu sou o ${identity.intro}. Certo, você está no lugar certo! 😊${closedNotice}\n\nQual é o modelo do seu iPhone?`);
      state.stage = "awaiting_model";
      return { replies, action: "reply", state };
    } else {
      replies.push(`${greeting}! Eu sou o ${identity.intro}. 😊${closedNotice}\n\nMe conta o que aconteceu com o seu aparelho para eu te ajudar!`);
      state.stage = "awaiting_problem";
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Awaiting problem description
  if (state.stage === "awaiting_problem") {
    // Check if user described an unsupported service (camera, Face ID, etc.)
    if (!state.service_type && isUnsupportedService(message)) {
      if (store.open) {
        replies.push(`Entendi! Vou encaminhar seu atendimento para um colega especialista. 😊`);
      } else {
        const hasModel = !!state.model;
        let msg = `Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊`;
        if (!hasModel) {
          msg += `\n\nPara agilizarmos seu atendimento, me fala qual o modelo do seu aparelho.`;
        }
        replies.push(msg);
      }
      state.stage = "handoff";
      state.handoff_reason = "Serviço iPhone não cotado automaticamente — encaminhar para especialista";
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    if (state.service_type && state.model) {
      state.stage = "ready_quote";
      // Fall through to ready_quote
    } else if (state.service_type && !state.model) {
      replies.push(`Entendi! Qual é o modelo do seu iPhone? 😊`);
      state.stage = "awaiting_model";
      return { replies, action: "reply", state };
    } else if (!state.service_type && state.model) {
      replies.push(`Qual serviço você precisa para o ${capitalize(state.model)}? Temos troca de tela, bateria e traseira de vidro. 😊`);
      return { replies, action: "reply", state };
    } else {
      replies.push(`Me conta o que aconteceu com o seu aparelho para eu te ajudar melhor! 😊`);
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Awaiting model
  if (state.stage === "awaiting_model") {
    if (state.model) {
      state.stage = "ready_quote";
      // Fall through to ready_quote
    } else {
      replies.push(`Não consegui identificar o modelo. Pode me informar o modelo exato do seu iPhone? Por exemplo: iPhone 13, iPhone 14 Pro, etc.`);
      return { replies, action: "reply", state };
    }
  }
  
  // STAGE: Ready to send quote
  if (state.stage === "ready_quote" && state.service_type && state.model) {
    const items = getQuote(state.service_type, state.model);
    
    if (!items || items.length === 0) {
      if (store.open) {
        replies.push(`Infelizmente não encontrei o preço para esse modelo/serviço no momento. Vou te encaminhar para um colega que pode te ajudar! 😊`);
      } else {
        replies.push(`Infelizmente não encontrei o preço para esse modelo/serviço no momento. Assim que abrirmos, vou te encaminhar para um colega que pode te ajudar! 😊`);
      }
      state.stage = "handoff";
      state.handoff_reason = `Preço não encontrado: ${state.service_type} ${state.model}`;
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    // Reply 1: Pre-service info (delay_before: 0 — immediate)
    if (!state.pre_service_sent) {
      const preServiceText = getPreServiceMessage(state.service_type);
      if (preServiceText) {
        replies.push({ text: preServiceText, delay_before: 0 });
      }
      state.pre_service_sent = true;
    }
    
    // Reply 2: Prices (delay_before: 2 — wait 2s after pre-service)
    const priceMessages = formatQuoteMessages(state.service_type, state.model, items);
    const priceText = priceMessages.join("\n\n");
    replies.push({ text: priceText, delay_before: 2 });
    
    // Reply 3: Closing question (delay_before: 3 — wait 3s after prices)
    let closingText: string;
    if (state.service_type === "bateria iphone") {
      closingText = `Você sabe me dizer a saúde da sua bateria? Pode verificar em Ajustes → Bateria → Saúde da Bateria. Se estiver abaixo de 80%, recomendamos a troca! 😊\n\nFicou alguma dúvida? Gostaria de agendar o atendimento?`;
    } else if (state.service_type === "traseira de vidro") {
      closingText = `Importante: a traseira fragilizada pode acarretar riscos ao aparelho, então recomendamos consertar o quanto antes.\n\nFicou alguma dúvida? Gostaria de agendar um horário para o reparo? 😊`;
    } else {
      closingText = `Ficou alguma dúvida? Gostaria de agendar o atendimento? 😊`;
    }
    replies.push({ text: closingText, delay_before: 3 });
    
    state.quote_sent = true;
    state.stage = "post_quote";
    return { replies, action: "reply", state };
  }
  
  // STAGE: Post-quote (after prices sent)
  if (state.stage === "post_quote") {
    const t = message.toLowerCase();
    
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
    
    if (/\b(caro|muito|não|nao|duvida|dúvida|pensar|depois|outro)\b/.test(t)) {
      replies.push(`Entendo! Vou te encaminhar para um colega que pode te ajudar melhor com isso. 😊`);
      state.stage = "handoff";
      state.handoff_reason = "Cliente com objeção ou dúvida pós-orçamento";
      return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
    }
    
    replies.push(`Posso te ajudar com mais alguma coisa? Se quiser agendar, é só me dizer! 😊`);
    return { replies, action: "reply", state };
  }
  
  // STAGE: Handoff already done - don't reply
  if (state.stage === "handoff" || state.stage === "non_apple_rejected") {
    return { replies: [], action: "skip", state };
  }
  
  // Fallback
  replies.push(`Como posso te ajudar? 😊`);
  return { replies, action: "reply", state };
}

// ==================== SAVE INBOUND MESSAGE ====================
async function saveInboundMessage(conversationId: string, contactId: string, message: string, externalMessageId?: string, messageTimestamp?: string) {
  if (!supabase || !conversationId) return;
  try {
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      contact_id: contactId,
      direction: "inbound",
      sender_type: "customer",
      message_type: "text",
      content_text: message,
      external_message_id: externalMessageId || null,
      received_at: messageTimestamp ? new Date(Number(messageTimestamp) * 1000).toISOString() : new Date().toISOString(),
    });
  } catch (e) {
    console.error("Failed to save inbound:", e);
  }
}

// ==================== MAIN HANDLER ====================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Load pricing data from DB on first request (or if not loaded yet)
    if (!pricingLoaded) {
      await loadPricingData();
      pricingLoaded = true;
    }
    const body = await req.json();
    const message: string = body.message || "";
    const contactId: string = body.contact_id || "";
    const channelId: string = body.whatsapp_channel_id || "";
    const customerFirstName: string = body.contact_first_name || "";
    const customerName: string = body.contact_display_name || customerFirstName || "amigo";
    const externalMessageId: string = body.external_message_id || "";
    const messageTimestamp: string = body.message_timestamp || "";
    
    // Legacy support
    const legacyConversationId: string = body.context?.conversation_id || body.conversation_id || "";

    console.log("=== BRAIN INPUT ===", JSON.stringify({
      message,
      contact_id: contactId,
      channel_id: channelId,
      customer: customerName,
    }));

    // FAILSAFE: reject requests without session identifiers
    if (!contactId || !channelId) {
      console.error("=== BRAIN REJECT === Missing contact_id or channel_id — cannot create session");
      return new Response(JSON.stringify({
        replies: [],
        action: "skip",
        state: {},
        conversation_id: "",
        error: "Missing contact_id or whatsapp_channel_id"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!message.trim()) {
      return new Response(JSON.stringify({ replies: [], action: "skip", state: {} }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ---- SESSION MANAGEMENT ----
    let conversationId = "";
    let state: BotState = defaultState();
    
    if (supabase && contactId && channelId) {
      const session = await findOrCreateConversation(contactId, channelId);
      conversationId = session.conversationId;
      state = session.state;
    } else if (supabase && legacyConversationId) {
      conversationId = legacyConversationId;
      const { data: conv } = await supabase
        .from("conversations")
        .select("bot_state")
        .eq("id", conversationId)
        .single();
      if (conv?.bot_state && typeof conv.bot_state === "object" && (conv.bot_state as any).stage) {
        state = { ...defaultState(), ...(conv.bot_state as any) } as BotState;
      }
    }

    // ---- SAVE INBOUND MESSAGE ----
    await saveInboundMessage(conversationId, contactId, message, externalMessageId, messageTimestamp);

    // ---- DEBOUNCE ----
    if (supabase && conversationId) {
      await new Promise(r => setTimeout(r, BUFFER_WINDOW_MS));
      
      const { data: recentMsgs } = await supabase
        .from("messages")
        .select("content_text, direction, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (recentMsgs && recentMsgs.length > 0) {
        const lastOutIdx = recentMsgs.findIndex((m: any) => m.direction === "outbound");
        const pendingInbound = lastOutIdx === -1
          ? recentMsgs.filter((m: any) => m.direction === "inbound")
          : recentMsgs.slice(0, lastOutIdx).filter((m: any) => m.direction === "inbound");
        
        const latestInbound = pendingInbound[0];
        if (latestInbound && latestInbound.content_text !== message) {
          console.log("=== BRAIN SKIP (stale) ===", { my_msg: message, latest: latestInbound.content_text });
          return new Response(JSON.stringify({ replies: [], action: "skip", state: {}, conversation_id: conversationId }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        var effectiveMessage = message;
        if (pendingInbound.length > 1) {
          const aggregated = pendingInbound.reverse().map((m: any) => m.content_text).filter(Boolean).join("\n");
          console.log("=== BRAIN AGGREGATED ===", { count: pendingInbound.length, aggregated });
          effectiveMessage = aggregated;
        }
      } else {
        var effectiveMessage = message;
      }
    } else {
      var effectiveMessage = message;
    }

    // Reload state after debounce
    if (supabase && conversationId) {
      const { data: freshConv } = await supabase
        .from("conversations")
        .select("bot_state")
        .eq("id", conversationId)
        .single();
      if (freshConv?.bot_state && typeof freshConv.bot_state === "object" && (freshConv.bot_state as any).stage) {
        state = { ...defaultState(), ...(freshConv.bot_state as any) } as BotState;
      }
    }

    console.log("=== BRAIN STATE LOADED ===", JSON.stringify(state));

    // ---- PROCESS ----
    const result = await processStateMachine(effectiveMessage, state, customerFirstName || "amigo", []);

    // ---- SAVE STATE ----
    if (supabase && conversationId) {
      await supabase
        .from("conversations")
        .update({
          bot_state: result.state,
          last_quote_data: result.state.quote_sent ? result.state : null,
          last_interaction_at: new Date().toISOString(),
          handoff: result.action === "handoff",
        })
        .eq("id", conversationId);
    }

    console.log("=== BRAIN OUTPUT ===", JSON.stringify({
      action: result.action,
      replies_count: result.replies.length,
      state: result.state,
      conversation_id: conversationId,
    }));

    // Normalize replies: always output { text, delay_before }
    const normalizedReplies = result.replies.map((r, i) => {
      if (typeof r === "string") {
        return { text: r, delay_before: i === 0 ? 0 : 1 };
      }
      return r;
    });

    return new Response(
      JSON.stringify({
        replies: normalizedReplies,
        action: result.action,
        state: result.state,
        handoff_reason: result.handoff_reason || null,
        conversation_id: conversationId,
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
