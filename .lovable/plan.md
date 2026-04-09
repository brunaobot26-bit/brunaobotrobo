

## Plano: Separar replies com risco zero de inversão

### Opção recomendada (risco ZERO)

Manter **Reply 1 (pre-service) + Reply 2 (preços) como 2 mensagens separadas**, mas o Brain adiciona um campo `delay_before` em cada reply para o n8n respeitar:

```json
{
  "replies": [
    { "text": "Antes de te passar as condições...", "delay_before": 0 },
    { "text": "Valores para troca de tela...", "delay_before": 2 },
    { "text": "Ficou alguma dúvida?...", "delay_before": 3 }
  ]
}
```

**Como funciona no n8n:**
O loop `Split In Batches (batch size 1)` já processa um reply por vez. Adicionamos um nó **Wait** ANTES do envio (não depois), que lê `delay_before` do item atual. Se for 0, envia imediato. Se for 2 ou 3, espera antes de enviar.

Isso garante:
- Reply 1 envia imediatamente
- Reply 2 só envia 2s DEPOIS do Reply 1 já ter sido entregue
- Reply 3 só envia 3s DEPOIS do Reply 2

**Risco de inversão = zero**, porque cada mensagem só é enviada após a anterior já ter sido processada pela Evolution API + tempo de folga.

### Alterações

**1. Brain (`supabase/functions/brain/index.ts`)**
- No stage `ready_quote`, retornar 3 replies separados em vez de 2
- Adicionar campo `delay_before` em cada reply (0, 2, 3 respectivamente)

**2. n8n (vou te dar instruções exatas)**
- No nó "Preparar Outbound", incluir o campo `delay_before` no output
- Mover o nó Wait para ANTES do "Enviar Evolution" e configurar para ler `{{ $json.delay_before }}` segundos
- Fluxo: Split In Batches → Wait (delay_before) → Enviar Evolution → Salvar Outbound → próximo batch

### Entregáveis
1. Deploy do Brain com 3 replies + delay_before
2. Instruções passo a passo para ajustar o Wait no n8n

