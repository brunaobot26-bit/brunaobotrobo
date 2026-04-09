

## Tratar mídia (áudio/foto/vídeo) como handoff

### O que mudar

No `supabase/functions/brain/index.ts`, o n8n envia o campo `message_type` no body (ex: `"text"`, `"audio"`, `"image"`, `"video"`, `"sticker"`, `"document"`). Hoje o brain não lê esse campo.

### Implementação

**1. Ler `message_type` do body** (linha ~889):
```typescript
const messageType: string = body.message_type || "text";
```

**2. Guardar `message_type` no `saveInboundMessage`** — já salva como `"text"` hardcoded, passar o valor real.

**3. Checar mídia ANTES do check de mensagem vazia** (linha ~922), logo após o failsafe de `contactId/channelId`:

```typescript
if (messageType !== "text") {
  // Save inbound message with correct type
  await saveInboundMessage(conversationId, contactId, message || `[${messageType}]`, externalMessageId, messageTimestamp, messageType);
  
  if (store.open) {
    // Handoff silencioso — sem mensagem
    return { replies: [], action: "handoff", state, handoff_reason: `Mídia: ${messageType}` };
  } else {
    // iHelper — mensagem gentil
    return {
      replies: ["Desculpa, não consigo ouvir áudios e ver imagens/vídeos ainda. Por gentileza, adiantar por escrito aqui o que tu precisas, senão amanhã assim que abrirmos nosso técnico certificado Apple te retorna. 😊"],
      action: "handoff",
      state,
      handoff_reason: `Mídia: ${messageType}`
    };
  }
}
```

**Nota:** A checagem de mídia precisa acontecer DEPOIS da sessão ser criada (para ter `store` e `conversationId`), mas ANTES do debounce e do `think()`. Vou posicionar entre a linha 949 (save inbound) e 951 (debounce), pois nesse ponto já temos `store`, `state` e `conversationId`.

**4. Atualizar `saveInboundMessage`** para aceitar `messageType` como parâmetro opcional (default `"text"`).

### Arquivos alterados
- `supabase/functions/brain/index.ts` — ler `message_type`, checar mídia, handoff silencioso/mensagem
- Deploy da edge function `brain`

### Risco
Baixo — é uma guarda no início do fluxo. Mensagens de texto continuam passando normalmente.

