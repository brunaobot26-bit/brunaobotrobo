

## Implementar regras completas de handoff + religação automática em 72h

### Resumo das mudanças

**1. Novas keywords de handoff** — Adicionar detecção para:
- **Compra/venda iPhone**: `"comprar", "vender", "usado", "seminovo", "troco"` (no sentido de trocar aparelho)
- **Pedido explícito de humano**: `"atendente", "pessoa", "falar com alguém", "gerente", "supervisor"`
- **Reclamação**: `"reclamação", "insatisfeito", "péssimo", "horrível", "nunca mais"`
- **Dúvida técnica/legal complexa**: `"apple care", "applecare", "seguro", "laudo técnico"`
- **Negociação/desconto**: `"desconto", "negociar", "parcelar mais", "condição especial", "preço melhor"`

Cada grupo com sua mensagem empática antes do handoff.

**2. Múltiplos serviços** — Se o cliente menciona 2+ serviços na mesma mensagem (ex: "tela e bateria"), handoff imediato com: "Para múltiplos serviços, vou te encaminhar para um colega que pode montar o melhor pacote pra ti. 😊"

**3. Mensagem durante handoff ativo** (linhas 698-699)

Hoje: `if (stage === "handoff") return { replies: [], action: "skip" }` — silêncio total.

Novo: se `handoff_ack_sent === false`, enviar mensagem e marcar a flag:
- **Loja aberta (Emerson):** "Já estou te encaminhando para um colega, em breve ele vai te chamar. 😊"
- **Loja fechada (iHelper):** "Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊"

Se `handoff_ack_sent === true`, silêncio (skip).

**4. Religação automática em 72h** — pg_cron job que roda 1x/hora:
```sql
UPDATE conversations
SET handoff = false, human_active = false, bot_enabled = true,
    bot_state = '{}', status = 'closed'
WHERE handoff = true
  AND last_interaction_at < now() - interval '72 hours';
```

### Implementação técnica

**`supabase/functions/brain/index.ts`:**

1. Adicionar `handoff_ack_sent: boolean` ao `BotState` e `defaultState()`
2. Criar função `detectMultipleServices(msg)` que retorna array de serviços encontrados
3. Criar mapa de keywords → razão + mensagem de handoff
4. No início de `processStateMachine` (antes do fluxo iPhone), checar nesta ordem:
   - Múltiplos serviços → handoff
   - Compra/venda → handoff
   - Pedido de humano → handoff
   - Reclamação → handoff
   - Negociação → handoff
   - Dúvida técnica → handoff
5. Alterar bloco `stage === "handoff"` (linha 698) para enviar ack 1x
6. Deploy da edge function `brain`

**SQL (via insert tool, não migration):**
- Criar pg_cron job para religação 72h

### O que NÃO muda
- Fluxo de orçamento iPhone (tela/bateria/traseira) — intacto
- Handoff de dispositivos não-iPhone — intacto
- Handoff de serviços não suportados — intacto
- Lógica do n8n — intacta

### Risco
Baixo — são adições ao fluxo existente. Keywords são específicas o suficiente para evitar falsos positivos.

