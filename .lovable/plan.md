

## Três correções finais antes do teste

### 1. Bug mídia sem legenda — Correção simples

**O que acontece hoje:** Quando o cliente envia áudio/foto sem texto (legenda), `message` vem vazio → linha 923 (`if (!message.trim())`) retorna `skip` antes de chegar ao media check (linha 952). Resultado: o bot ignora completamente a mídia.

**O que tu quer (e eu concordo):** Toda e qualquer mídia → handoff. Sempre.

**Correção:** Na linha 923, mudar para só fazer skip se for mensagem de texto vazia:

```typescript
// Antes:
if (!message.trim()) { return skip; }

// Depois:
if (!message.trim() && messageType === "text") { return skip; }
```

Assim, áudio/foto/vídeo sem legenda continuam no fluxo e caem no media check (linha 952) que já faz o handoff corretamente (silencioso se loja aberta, mensagem gentil se fechada).

### 2. Negociação no post_quote

Adicionar um path entre a linha 829 (dúvida diagnóstica) e 832 (fallback):

```typescript
if (/\b(desconto|negociar|negociação|negociacao|parcelar|condição|condicao)\b/.test(t)) {
  replies.push("Vou te encaminhar para um colega que pode ver uma condição especial pra ti. 😊");
  state.stage = "handoff";
  state.handoff_reason = "Negociação pós-orçamento";
  state.handoff_ack_sent = true;
  return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
}
```

### 3. Modelo GPT no extractIntent

Linha 344: trocar `gpt-4o-mini` → `gpt-4.1-mini` (modelo mais recente da OpenAI, melhor em classificação/extração, mesmo custo do 4o-mini).

### Arquivos alterados
- `supabase/functions/brain/index.ts` — 3 correções (media vazia, negociação post_quote, modelo GPT)
- Deploy da edge function `brain`

### Risco
Baixo — são correções cirúrgicas em pontos isolados.

