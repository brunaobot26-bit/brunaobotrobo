

## Ajuste no post_quote: detectar dúvida diagnóstica e fazer handoff

### Problema

No `post_quote` (linha 773-798), existem 3 caminhos:
1. Cliente quer agendar → handoff para agendamento ✅
2. Cliente tem objeção (caro, não, pensar) → handoff para objeção ✅  
3. **Qualquer outra coisa** → "Posso te ajudar com mais alguma coisa?" ← **aqui está o problema**

Quando o cliente diz "A bateria está com 95%. Será que é ela?", não bate em nenhum dos dois patterns, e cai no fallback genérico que ignora a pergunta.

### Solução

Adicionar um 3º pattern **antes** do fallback genérico: detectar dúvida diagnóstica / incerteza. Se o cliente faz uma pergunta sobre o problema (contém `?` ou keywords de diagnóstico), fazer handoff para um técnico.

**Keywords de diagnóstico/incerteza:**
`["será", "sera", "certeza", "diagnóstico", "diagnostico", "problema", "defeito", "será que", "pode ser", "como saber", "saúde", "saude", "%"]`

**Mensagem de handoff:**
"Com a saúde em 95%, o problema pode ter outra causa. Vou te encaminhar para um técnico certificado Apple que vai te orientar com mais precisão. 😊"

Mas como não queremos uma mensagem tão específica (pode não ser sempre sobre saúde de bateria), usar uma mais genérica:

"Entendo a dúvida! Não tenho como afirmar com certeza, vou encaminhar teu atendimento para um técnico certificado Apple que vai poder te auxiliar melhor. 😊"

### Mudança concreta

**`supabase/functions/brain/index.ts` — bloco `post_quote` (linhas 788-797):**

Inserir entre o check de objeção e o fallback genérico:

```typescript
// Dúvida diagnóstica / incerteza sobre o serviço
if (/(\?|será|sera|certeza|diagnóstico|diagnostico|pode ser|como saber|problema|defeito|causa|saúde|saude|\d+\s*%)/.test(t)) {
  replies.push("Entendo a dúvida! Não tenho como afirmar com certeza, vou encaminhar teu atendimento para um técnico certificado Apple que vai poder te auxiliar melhor. 😊");
  state.stage = "handoff";
  state.handoff_reason = "Dúvida diagnóstica pós-orçamento";
  state.handoff_ack_sent = true;
  return { replies, action: "handoff", state, handoff_reason: state.handoff_reason };
}
```

### O que NÃO muda
- Fluxo de agendamento — intacto
- Fluxo de objeção — intacto
- Nenhuma tabela, nenhuma coluna, nenhuma migration
- Apenas 7 linhas adicionadas num bloco já existente

### Risco
Mínimo — a regex é restrita ao stage `post_quote` (orçamento já enviado). Não afeta nenhum outro ponto do fluxo.

