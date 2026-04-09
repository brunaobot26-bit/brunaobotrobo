

## Ajuste: priorizar corretamente agendamento vs dúvida diagnóstica no post_quote

### Problema com o plano anterior

Mover dúvida diagnóstica para **antes** do agendamento quebraria casos como:
- "Sim, vocês tem horário para 14:00hrs de Segunda?" — contém `?` → iria para diagnóstico em vez de agendamento

Manter diagnóstico **depois** do agendamento (como está hoje) quebra:
- "Sim, é a bateria mesmo o problema?" — contém `sim` → vai para agendamento em vez de diagnóstico

### Solução: checagem combinada

A ordem fica: **agendamento → objeção → diagnóstico → fallback**, mas a regex de agendamento ganha uma condição extra: só dispara se a mensagem **não contiver keywords diagnósticas** (exceto `?` sozinho quando acompanhado de keywords de agendamento).

Lógica concreta:

```typescript
if (state.stage === "post_quote") {
  const t = message.toLowerCase();

  const hasScheduleIntent = /\b(agendar|agenda|marcar|horário|horario|quero|vamos|bora)\b/.test(t);
  const hasDiagnosticDoubt = /(\bserá\b|\bsera\b|\bcerteza\b|\bdiagnóstico\b|\bdiagnostico\b|\bpode ser\b|\bcomo saber\b|\bproblema\b|\bdefeito\b|\bcausa\b|\bsaúde\b|\bsaude\b|\d+\s*%)/.test(t);

  // "sim" sozinho ou com intent de agendamento → agendamento
  // "sim" + dúvida diagnóstica (sem intent de agendamento) → diagnóstico
  if ((hasScheduleIntent || /\b(sim)\b/.test(t)) && !hasDiagnosticDoubt) {
    // → handoff agendamento (código atual)
  }

  if (/\b(caro|muito|não|nao|pensar|depois|outro)\b/.test(t) && !hasDiagnosticDoubt) {
    // → handoff objeção (código atual)
  }

  if (hasDiagnosticDoubt || /\?/.test(t)) {
    // → handoff diagnóstico
  }

  // fallback
}
```

**Exemplos de comportamento:**

| Mensagem | Schedule? | Diagnostic? | Resultado |
|---|---|---|---|
| "Sim" | sim+true | false | ✅ Agendamento |
| "Sim, tem horário às 14h de segunda?" | horário=true | false | ✅ Agendamento |
| "Sim, é a bateria mesmo o problema?" | sim apenas | problema=true | ✅ Diagnóstico |
| "A bateria está com 95%. Será que é ela?" | false | será+95%=true | ✅ Diagnóstico |
| "Tem certeza que é bateria?" | false | certeza=true | ✅ Diagnóstico |
| "Não, tá caro" | false (objeção) | false | ✅ Objeção |

### Mudança concreta
- **`supabase/functions/brain/index.ts`** — reescrever bloco `post_quote` (linhas 773-807) com lógica combinada
- Deploy da edge function `brain`
- Reset conversa de teste

### Risco
Mínimo — mesmos 4 caminhos, apenas com detecção mais inteligente de qual usar.

