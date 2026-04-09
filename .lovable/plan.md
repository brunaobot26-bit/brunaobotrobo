

## Dois ajustes no post_quote

### Problema 1: "Sim, quebrou a traseira também" → agendamento em vez de handoff

No `post_quote`, o bloco de agendamento captura `\bsim\b` e não detecta dúvida diagnóstica (`hasDiagnosticDoubt`). Mas o cliente está mencionando **outro serviço** — isso deveria ser handoff por múltiplos serviços.

**Solução:** No início do bloco `post_quote` (antes dos 4 caminhos), rodar `detectMultipleServices` combinando a mensagem atual com o `service_type` já detectado no state. Se resultar em 2+ serviços, fazer handoff de múltiplos.

```typescript
// No início do post_quote, antes do path 1:
const currentMsg = message.toLowerCase();
const additionalServices = detectMultipleServices(currentMsg);
const alreadyHasService = state.service_type || "";
// Check if new message mentions a DIFFERENT service than what was quoted
const allServices = new Set<string>();
if (/tela/.test(alreadyHasService)) allServices.add("tela");
if (/bateria/.test(alreadyHasService)) allServices.add("bateria");
if (/traseira/.test(alreadyHasService)) allServices.add("traseira");
additionalServices.forEach(s => allServices.add(s));

if (allServices.size >= 2) {
  // handoff múltiplos serviços (mesma mensagem do bloco existente)
  ...
}
```

### Problema 2: "Vou te encaminhar para o Emerson" quando JÁ é o Emerson

Quando a loja está aberta, o bot É o Emerson. Dizer "vou encaminhar para o Emerson" não faz sentido.

**Solução:** Mudar a mensagem de agendamento para:
- **Loja aberta (Emerson):** `"Ótimo! Vamos seguir com seu agendamento então. 😊"`
- **Loja fechada (iHelper):** manter `"...Vou encaminhar para o Emerson finalizar o agendamento assim que abrirmos. 😊"`

Aplicar a mesma correção em todas as mensagens de handoff para agendamento que mencionam "encaminhar para o Emerson" quando já é o Emerson atendendo.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — detecção de novo serviço no post_quote + correção de mensagem de agendamento
- Deploy da edge function `brain`
- Reset conversa de teste

### Risco
Baixo — adiciona uma checagem antes dos paths existentes. Fluxo de serviço único permanece intacto.

