import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ==================== LOOKUP DATA ====================
const lookupData = JSON.parse(Deno.readTextFileSync(new URL("./lookup.json", import.meta.url).pathname));

// ==================== TEXT NORMALIZATION ====================
function normalizeText(text: string): string {
  let t = (text || "").toLowerCase().trim();
  const accentMap: Record<string, string> = {
    ã: "a", á: "a", â: "a", é: "e", ê: "e", í: "i",
    ó: "o", ô: "o", ú: "u", ç: "c",
  };
  for (const [from, to] of Object.entries(accentMap)) {
    t = t.replaceAll(from, to);
  }
  const replacements: Record<string, string> = {
    ifone: "iphone", ipone: "iphone", iphoni: "iphone",
    displai: "tela", diplay: "tela", display: "tela",
    baterria: "bateria", beteria: "bateria",
    trazeira: "traseira", traseia: "traseira",
    promaxx: "pro max", promax: "pro max", "pro maxx": "pro max",
  };
  for (const [old, rep] of Object.entries(replacements)) {
    t = t.replaceAll(old, rep);
  }
  const numberWords: Record<string, string> = {
    treze: "13", quatorze: "14", quinze: "15",
    dezesseis: "16", onze: "11", doze: "12",
  };
  for (const [word, num] of Object.entries(numberWords)) {
    t = t.replace(new RegExp(`\\b${word}\\b`, "g"), num);
  }
  return t;
}

// ==================== GROUP DETECTION ====================
const GROUP_PATTERNS: Record<string, RegExp[]> = {
  "tela iphone": [/\btela\b/, /\bdisplay\b/, /\bfrontal\b/],
  "bateria iphone": [/\bbateria\b/],
  "traseira de vidro": [/traseira/, /vidro traseiro/, /back glass/],
};

function detectGroup(text: string): string | null {
  const normalized = normalizeText(text);
  const hits: string[] = [];
  for (const [group, patterns] of Object.entries(GROUP_PATTERNS)) {
    if (patterns.some((p) => p.test(normalized))) hits.push(group);
  }
  return hits.length === 1 ? hits[0] : null;
}

// ==================== MODEL DETECTION ====================
function detectModel(text: string, aliases: Record<string, string[]>): string | null {
  const normalized = normalizeText(text);
  const canonicalMap: Record<string, string> = {};
  for (const k of Object.keys(aliases)) {
    canonicalMap[normalizeText(k)] = k;
  }
  const candidates: [string, number][] = [];
  for (const [canonical, values] of Object.entries(aliases)) {
    const allTerms = [canonical, ...values];
    for (const candidate of allTerms) {
      const normCandidate = normalizeText(candidate);
      const shortCandidate = normCandidate.replace("iphone ", "");
      if (normalized.includes(normCandidate) || new RegExp(`\\b${shortCandidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(normalized)) {
        const canonicalValue = canonicalMap[normalizeText(canonical)] || canonical;
        candidates.push([canonicalValue, normCandidate.length]);
        break;
      }
    }
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => b[1] - a[1]);
  const best = candidates[0][0];
  const sameBest = candidates.filter(([, size]) => size === candidates[0][1]).map(([c]) => c);
  if (new Set(sameBest).size === 1) return best;
  return null;
}

// ==================== QUOTE ENGINE ====================
function computeInstallments(finalPrice: number): number {
  return Math.round((finalPrice * 1.07) / 6 * 100) / 100;
}

interface QuoteResult {
  status: string;
  reason?: string;
  group?: string;
  model?: string;
  service_name?: string;
  variant?: string | null;
  final_price?: number;
  service_price?: number;
  labor_price?: number;
  installment_value_6x?: number;
  message?: string;
  variants?: Array<{ variant: string | null; service_name: string; final_price: number }>;
  action?: string;
}

function quote(message: string): QuoteResult {
  const data = lookupData as any;
  const normalizedMessage = normalizeText(message);
  const group = detectGroup(message);
  const model = detectModel(message, data.models);

  if (!group && !model) {
    return { status: "needs_clarification", reason: "missing_group_and_model", message: "Preciso saber qual serviço tu quer (tela, bateria ou traseira) e qual é o modelo do iPhone." };
  }
  if (!group) {
    return { status: "needs_clarification", reason: "missing_group", message: "Preciso confirmar o serviço: é tela, bateria ou traseira de vidro?" };
  }
  if (!model) {
    return { status: "needs_clarification", reason: "missing_model", message: "Preciso confirmar o modelo do iPhone pra te passar o valor certo." };
  }

  const key = `${group}::${model}`;
  let items = data.items_by_group_model[key] || [];

  // Fallback iPhone 12 → iPhone 12 Pro
  if (!items.length && normalizeText(model) === "iphone 12") {
    const fallbackKey = `${group}::iphone 12 pro`;
    const fallbackItems = data.items_by_group_model[fallbackKey] || [];
    if (fallbackItems.length) items = fallbackItems;
  }
  if (!items.length && group === "tela iphone" && normalizedMessage.includes("iphone 12")) {
    const fallbackItems = data.items_by_group_model["tela iphone::iphone 12 pro"] || [];
    if (fallbackItems.length) items = fallbackItems;
  }

  if (!items.length) {
    return { status: "not_found", reason: "group_model_not_found", message: "Não encontrei esse serviço para esse modelo no ERP da iHelpU." };
  }

  if (items.length === 1) {
    const item = items[0];
    const installmentValue = computeInstallments(item.final_price);
    return {
      status: "ok", group, model,
      service_name: item.service_name, variant: item.variant,
      final_price: item.final_price, service_price: item.service_price,
      labor_price: item.labor_price, installment_value_6x: installmentValue,
    };
  }

  const variants = items.map((item: any) => ({
    variant: item.variant, service_name: item.service_name, final_price: item.final_price,
  }));
  return { status: "needs_clarification", reason: "multiple_variants", group, model, variants };
}

// ==================== RUNTIME ====================
function greetingByHour(nowHour: number): string {
  if (nowHour >= 5 && nowHour <= 12) return "Bom dia";
  if (nowHour > 12 && nowHour <= 19) return "Boa tarde";
  return "Boa noite";
}

function isStoreOpen(nowHour: number): boolean {
  return nowHour >= 9 && nowHour < 18;
}

function formatModel(model: string): string {
  const parts = (model || "").split(" ");
  if (!parts.length) return model;
  return parts.map((part, i) => {
    if (i === 0 && part === "iphone") return "iPhone";
    if (["xr", "xs"].includes(part)) return part.toUpperCase();
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(" ");
}

function serviceAnchor(group: string): string {
  if (group === "tela iphone") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia vitalícia na tela — a maior do mercado e exclusividade iHelpU ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  if (group === "bateria iphone") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — a maior do mercado ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  if (group === "traseira de vidro") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — a maior do mercado ✅\n\n• Reparo no mesmo dia! Ficar muito tempo sem iPhone não dá, né?\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  return "";
}

function recommendVariant(message: string): string | null {
  const text = message.toLowerCase();
  const economySignals = ["mais barato", "mais em conta", "economizar", "barato", "custo beneficio", "custo-beneficio"];
  const qualitySignals = ["melhor", "melhor qualidade", "premium", "mais original", "mais top", "qualidade"];
  if (economySignals.some((x) => text.includes(x))) return "essential";
  if (qualitySignals.some((x) => text.includes(x))) return "infinity";
  return null;
}

function getNowHour(): number {
  const now = new Date();
  const utcHour = now.getUTCHours();
  let brHour = utcHour - 3;
  if (brHour < 0) brHour += 24;
  return brHour;
}

function buildReply(message: string, opening = false, nowHour?: number) {
  const normalized = message.toLowerCase().trim();
  if (nowHour === undefined) nowHour = getNowHour();

  const greeting = greetingByHour(nowHour);
  const introOpen = `${greeting}! Tudo bem? Aqui é o Emerson da iHelpU.\n\n`;
  const introClosed = `${greeting}! Tudo bem? Aqui é o Emerson da iHelpU.\n\nAgora estamos fora do horário de atendimento da loja, mas já consigo te adiantar as informações por aqui. Assim que a loja abrir, a equipe continua contigo se precisar.\n\n`;

  const openingPrefix = () => {
    if (!opening) return "";
    return isStoreOpen(nowHour!) ? introOpen : introClosed;
  };

  const simpleGreetings = new Set(["oi", "ola", "olá", "e ai", "e aí", "fala", "opa", "bom dia", "boa tarde", "boa noite"]);
  if (simpleGreetings.has(normalized)) {
    const reply = nowHour >= 9 && nowHour < 18
      ? "E aí, tudo bem? 😊 Sou o Emerson da iHelpU. Como posso te ajudar hoje?"
      : "Oi! Sou o iHelper, assistente virtual da iHelpU 🤖 Como posso te ajudar?";
    return { status: "ok", reply, replies: [reply], action: "reply", data: { reason: "greeting" } };
  }

  let serviceHits = 0;
  if (normalized.includes("tela")) serviceHits++;
  if (normalized.includes("bateria")) serviceHits++;
  if (normalized.includes("traseira") || normalized.includes("vidro traseiro")) serviceHits++;
  if (serviceHits >= 2) {
    const reply = "Para esse tipo de atendimento com mais de um serviço, vou te encaminhar para um dos nossos técnicos que vai te dar a melhor condição 😉";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "multiple_services" } };
  }

  if (["samsung", "motorola", "xiaomi"].some((x) => normalized.includes(x))) {
    const reply = "Hoje nós somos especialistas Apple, então infelizmente não atendemos outras marcas por aqui 🙂";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "other_brand" } };
  }

  if (["ipad", "macbook", "mac", "apple watch"].some((x) => normalized.includes(x))) {
    const reply = isStoreOpen(nowHour)
      ? "Como esse é um caso mais específico, eu prefiro deixar teu atendimento encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me adiantar o modelo do aparelho e explicar um pouco melhor o problema, que isso ajuda bastante quando a equipe pegar teu atendimento."
      : "Como esse é um caso mais específico, eu prefiro deixar teu atendimento encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me adiantar o modelo do aparelho e explicar um pouco melhor o problema por aqui. Assim que a loja abrir, a equipe retorna teu contato.";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "out_of_scope" } };
  }

  const result = quote(message);

  if (result.status === "ok") {
    const serviceLabel = (result.group || "").replace(" iphone", "");
    const openingText = openingPrefix();
    const anchor = serviceAnchor(result.group!);
    const blocks: string[] = [];
    if (openingText.trim()) blocks.push(openingText.trim());
    if (anchor) blocks.push(anchor);
    blocks.push(`Pra ${formatModel(result.model!)}, o valor da ${serviceLabel} fica em R$ ${result.final_price!.toFixed(2)} à vista.`);
    blocks.push(`Ou em até 6x de R$ ${result.installment_value_6x!.toFixed(2)}.`);
    blocks.push("Podemos seguir com agendamento do serviço?");
    return { status: "ok", reply: blocks.join("\n\n").trim(), replies: blocks, action: "reply", data: result };
  }

  if (result.status === "needs_clarification") {
    const reason = result.reason;
    let reply: string;
    let replies: string[] | undefined;

    if (reason === "missing_group") {
      reply = `${openingPrefix()}Consigo te ajudar certinho, mas preciso confirmar uma coisa primeiro: é tela, bateria ou traseira de vidro?`.trim();
    } else if (reason === "missing_model") {
      reply = `${openingPrefix()}Perfeito. Me confirma só o modelo do teu iPhone pra eu te passar o valor certo.`.trim();
    } else if (reason === "multiple_variants" && result.variants && result.variants.length >= 2) {
      const preferred = recommendVariant(message);
      const v1 = result.variants[0];
      const v2 = result.variants[1];
      const blocks: string[] = [];
      if (openingPrefix()) blocks.push(openingPrefix().trim());
      const anchor = serviceAnchor("tela iphone");
      if (anchor) blocks.push(anchor);
      blocks.push(`Pra ${formatModel(result.model || v1.service_name || "")}, temos duas opções de tela:`);
      blocks.push(`• Essential → opção mais econômica\nR$ ${v1.final_price.toFixed(2)} à vista\nou em até 6x de R$ ${((v1.final_price * 1.07) / 6).toFixed(2)}`);
      blocks.push(`• Infinity → opção de melhor qualidade\nR$ ${v2.final_price.toFixed(2)} à vista\nou em até 6x de R$ ${((v2.final_price * 1.07) / 6).toFixed(2)}`);
      blocks.push("Se tu quiser, eu posso te explicar rapidinho a diferença entre a Essential e a Infinity.");
      if (preferred === "essential") blocks.push("Se tua prioridade for economizar, a Essential costuma fazer mais sentido 🙂");
      else if (preferred === "infinity") blocks.push("Se tua prioridade for qualidade, eu te indicaria a Infinity 🙂");
      blocks.push("Se quiser, eu já posso seguir contigo por aqui.");
      reply = blocks.join("\n\n").trim();
      replies = blocks;
    } else {
      reply = `${openingPrefix()}${result.message || "Me confirma melhor o que tu precisa pra eu te ajudar certo."}`.trim();
    }
    return { status: "needs_clarification", reply, replies: replies || [reply], action: "reply", data: result };
  }

  if (result.status === "not_found") {
    const reply = isStoreOpen(nowHour)
      ? `${openingPrefix()}Não encontrei esse serviço pra esse modelo no catálogo da iHelpU. Vou deixar isso encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me explicar um pouco melhor o que aconteceu com o aparelho, que isso ajuda quando a equipe assumir o atendimento.`.trim()
      : `${openingPrefix()}Não encontrei esse serviço pra esse modelo no catálogo da iHelpU. Vou deixar teu atendimento encaminhado 🙂\n\nSe tu quiser, já pode me adiantar um pouco melhor o problema e o modelo do aparelho, que assim que a loja abrir a equipe retorna teu contato.`.trim();
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: result };
  }

  return {
    status: "handoff",
    reply: "Esse caso eu prefiro encaminhar pra loja te orientar certinho, pra não te passar algo errado.",
    replies: ["Esse caso eu prefiro encaminhar pra loja te orientar certinho, pra não te passar algo errado."],
    action: "handoff",
    data: result,
  };
}

// ==================== SCHEDULING ====================
function parseHour(text: string): string | null {
  const t = (text || "").toLowerCase();
  const m = t.match(/\b(\d{1,2})(?::|h)?(\d{2})?\b/);
  if (!m) return null;
  const hh = parseInt(m[1]);
  const mm = parseInt(m[2] || "0");
  if (hh > 23 || mm > 59) return null;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function isTimeAllowed(group: string, timeHhmm: string, openHour = 9, closeHour = 18): [boolean, string | null] {
  const [hh, mm] = timeHhmm.split(":").map(Number);
  const minutes = hh * 60 + mm;
  const openM = openHour * 60;
  const closeM = closeHour * 60;

  if (group === "tela iphone" || group === "bateria iphone") {
    const latest = closeM - 40;
    if (minutes < openM || minutes > latest) {
      const lh = String(Math.floor(latest / 60)).padStart(2, "0");
      const lm = String(latest % 60).padStart(2, "0");
      return [false, `Pra ${group.replace(" iphone", "")}, o último horário disponível é ${lh}:${lm}.`];
    }
    return [true, null];
  }

  if (group === "traseira de vidro") {
    if (minutes <= 12 * 60) return [true, "Perfeito — deixando até 12:00, a previsão é ficar pronto no mesmo dia."];
    return [true, "Perfeito — como a entrega será depois de 12:00, a previsão é ficar pronto no dia seguinte."];
  }

  return [true, null];
}

function buildScheduleReply(name: string, cpf: string | null, preferredTimeText: string, quoteData: any) {
  const timeHhmm = parseHour(preferredTimeText);
  if (!timeHhmm) {
    return { status: "needs_clarification", reply: "Perfeito 😊 Me confirma só o horário no formato que fica melhor pra ti, por exemplo 10h, 14h30 ou 17:00.", replies: ["Perfeito 😊 Me confirma só o horário no formato que fica melhor pra ti, por exemplo 10h, 14h30 ou 17:00."] };
  }

  const [allowed, note] = isTimeAllowed(quoteData.group, timeHhmm);
  if (!allowed) {
    const reply = `Perfeito 😊 ${note} Se tu quiser, me diz um horário dentro dessa janela que eu deixo encaminhado.`;
    return { status: "needs_clarification", reply, replies: [reply] };
  }

  const storeName = "iHelpU Unidade do canal";
  const storeAddress = "[endereço da loja do canal]";
  const model = formatModel(quoteData.model || "");
  const lines = [
    "Perfeito 😊", "",
    "Então teu atendimento fica encaminhado assim:", "",
    `• Nome: ${name}`,
  ];
  if (cpf) lines.push(`• CPF: ${cpf}`);
  lines.push(
    `• Serviço: ${(quoteData.group || "").replace(" iphone", "")} do ${model}`,
    `• Valor confirmado: R$ ${Number(quoteData.final_price).toFixed(2)} à vista`,
    `• Horário solicitado: ${timeHhmm}`,
    `• Loja: ${storeName}`,
    `• Endereço: ${storeAddress}`,
  );
  let confirmation = lines.join("\n");
  if (note) confirmation = `${note}\n\n${confirmation}`;
  return { status: "ok", reply: confirmation, replies: [confirmation] };
}

// ==================== HTTP HANDLER ====================
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.split("/").pop() || "";

  try {
    if (req.method === "GET" && (path === "health" || path === "brain")) {
      const nowHour = getNowHour();
      return new Response(JSON.stringify({
        ok: true, version: "iHelpURobotBrain/0.2-edge",
        timestamp: new Date().toISOString(), hour_br: nowHour,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST") {
      const data = await req.json();

      if (path === "think" || path === "brain") {
        const message = data.message || "";
        if (!message) {
          return new Response(JSON.stringify({ ok: false, error: "missing_message" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const result = buildReply(message);
        return new Response(JSON.stringify({
          ok: true,
          replies: result.replies || [result.reply],
          data: result.data || {},
          action: result.action || "reply",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "schedule") {
        const { name, cpf, time, quote_data } = data;
        if (!name || !time || !quote_data) {
          return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const result = buildScheduleReply(name, cpf || null, time, quote_data);
        return new Response(JSON.stringify({
          ok: true, replies: result.replies || [result.reply],
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const message = data.message || "";
      if (message) {
        const result = buildReply(message);
        return new Response(JSON.stringify({
          ok: true,
          replies: result.replies || [result.reply],
          data: result.data || {},
          action: result.action || "reply",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (exc) {
    return new Response(JSON.stringify({ ok: false, error: "internal_error", detail: String(exc) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
