

## Corrigir: MacBook não reconhecido quando serviço "bateria" já foi detectado

### Causa raiz

O fluxo atual faz isso:

1. Cliente diz "trocar a bateria do meu aparelho" → `detectService` encontra "bateria" → `state.service_type = "bateria iphone"`
2. Linha 576: "se tem serviço mas não tem device, assumir iPhone" → `state.device_type = "iphone"`
3. Bot pede modelo do iPhone → `stage = "awaiting_model"`
4. Cliente diz "é um MacBook Pro 2020" → `detectDevice` retorna `"macbook"`, **mas** na linha 552-553: `if (detectedDevice && !state.device_type) state.device_type = detectedDevice` — como `device_type` já é `"iphone"`, **não sobrescreve**
5. Bot continua pedindo modelo do iPhone — nunca faz handoff

### Solução

No bloco `awaiting_model` (linhas 709-718), **antes** de dizer "não consegui identificar o modelo", re-checar se a mensagem atual contém um dispositivo não-iPhone. Se sim, **corrigir** o `device_type` no state e redirecionar para o bloco de handoff de dispositivo não-iPhone.

Também ajustar a lógica de slot-filling (linha 552): permitir que `detectedDevice` **sobrescreva** `device_type` quando o novo device é diferente do assumido e o stage é `awaiting_model` — isso cobre o caso do cliente corrigindo o bot.

### Mudança concreta

**`supabase/functions/brain/index.ts`:**

1. **Slot-filling (linha 552-553)**: Mudar para permitir sobrescrita quando o device detectado é diferente e o stage indica que estamos perguntando modelo:
   ```typescript
   if (detectedDevice) {
     if (!state.device_type || (state.stage === "awaiting_model" && detectedDevice !== state.device_type)) {
       state.device_type = detectedDevice;
       // Limpar service_type se mudou de iPhone para outro device
       if (detectedDevice !== "iphone") state.service_type = null;
     }
   }
   ```

2. **Bloco `awaiting_model` (linha 710-718)**: Adicionar check de device não-iPhone antes do fallback de "não consegui identificar":
   ```typescript
   if (state.stage === "awaiting_model") {
     // Se o device mudou para não-iPhone, redirecionar para handoff
     const isNowNonIphone = state.device_type && ["ipad", "macbook", "apple_watch", "airpods"].includes(state.device_type);
     if (isNowNonIphone) {
       // Cair no bloco de handoff non-iPhone (já existe acima, mas foi avaliado antes da correção)
       // → Enviar mensagem de handoff inline aqui
     }
     ...
   }
   ```

   Na prática, como o slot-filling corrigido roda **antes** do bloco `awaiting_model`, e o check de `isNonIphoneApple` (linha 594-597) roda **antes** do stage machine, a correção do slot-filling sozinha já resolve — o fluxo vai cair no bloco de handoff non-iPhone automaticamente.

3. **Deploy** da edge function `brain`
4. **Reset** conversa de teste

### Arquivos alterados
- `supabase/functions/brain/index.ts` — lógica de slot-filling para permitir correção de device

### Risco
Baixo — a mudança só permite sobrescrever `device_type` quando o bot está pedindo modelo e o cliente corrige o dispositivo. Não afeta o fluxo normal onde o cliente confirma que é iPhone.

