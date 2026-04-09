

## Diagnóstico Confirmado

### Problema 1: Sessão anterior não foi limpa
Os logs mostram claramente:
- Às 03:45:10 → primeira mensagem "boa noite" com IDs válidos → sessão CRIADA, saudação ENVIADA com horário de funcionamento
- Às 03:48:16 → segundo teste "Boa noite!" + "Tudo bem?" → sessão REUTILIZADA (conversation `0f342a42...`) → `greeted: true`, `closed_notice_sent: true` já estavam marcados
- Resultado: o Brain pulou a saudação porque já tinha saudado no teste anterior (3 minutos antes)

**Não perdeu contexto — reutilizou a sessão do teste anterior.**

### Problema 2: Ordem das mensagens invertida no WhatsApp
O Brain retornou 3 replies na ordem correta:
1. Pre-service (garantia, reparo express...)
2. Preços (Infinity/Essential)
3. Pergunta de fechamento

Mas no WhatsApp chegou: Preços → Pergunta → Pre-service.

**Causa**: O n8n "Preparar Outbound" cria 3 items separados e o n8n envia todos simultaneamente (sem delay entre eles). A Evolution API processa em paralelo e entrega fora de ordem.

---

## Plano de Correção (2 partes)

### Parte 1: Brain (eu faço e deploy)

**A. Consolidar replies em menos mensagens**
Em vez de retornar 3 replies separados que o n8n pode embaralhar, o Brain vai combinar:
- Pre-service + Preços = 1 mensagem
- Pergunta de fechamento = 1 mensagem

Isso garante ordem independente do n8n.

**B. Fechar sessões antigas automaticamente**
Antes de buscar conversa aberta, o Brain vai verificar se a última interação foi há mais de 30 minutos. Se sim, fecha a conversa antiga e cria uma nova. Isso evita que testes anteriores contaminem novos.

**C. Manter o failsafe de IDs vazios** (já está funcionando, como vimos no log das 03:45:04)

### Parte 2: n8n (JSON completo para importar)

Vou gerar o JSON completo do workflow com estas melhorias:

1. **Adicionar nó "Wait 2s" entre Enviar Evolution e Salvar Outbound** — garante que as mensagens cheguem na ordem certa (uma de cada vez)
2. **Usar "Split In Batches" (batch size 1) antes de Enviar** — força processamento sequencial dos replies
3. **Manter todo o resto igual** — Webhook, Normalizar Inbound, Buscar Canal, Normalizar Canal, Upsert Contato, Normalizar Contato, Montar Payload, Chamar Brain

Fluxo final:
```text
Webhook → Normalizar Inbound → Buscar Canal → Normalizar Canal 
→ Upsert Contato → Normalizar Contato → Montar Payload Brain 
→ Chamar Brain → Preparar Outbound → Split In Batches (1) 
→ IF Action skip? → Enviar Evolution → Wait 2s → Salvar Outbound 
→ IF Handoff? → Marcar Handoff
```

### Detalhes técnicos

**Brain — Consolidação de replies (ready_quote stage):**
- Pre-service + preços numa só mensagem
- Pergunta de fechamento separada
- Total: 2 mensagens em vez de 3

**Brain — Auto-expire de sessão:**
- Se `last_interaction_at` > 30 min atrás, fechar conversa antiga e criar nova
- Garante que cada teste (e cada cliente real) comece limpo

**n8n — Sequential send:**
- Split In Batches com batch size 1
- Wait de 2 segundos entre cada envio
- Garante ordem de entrega no WhatsApp

### Entregáveis
1. Deploy do Brain corrigido (eu faço)
2. JSON completo do workflow n8n para tu importar (eu gero e entrego aqui)

