

## Plano de Estabilização — Brain + n8n

### Causa raiz confirmada

Consultei o banco e confirmei: o mesmo contato (`Guilherme Dalcin`) tem **15+ conversations diferentes**, todas com `status = 'open'`. Cada mensagem do WhatsApp dispara o n8n, que cria uma nova conversa em vez de reutilizar a existente. O `bot_state` reseta para o padrão a cada mensagem — por isso o robô se apresenta de novo, esquece o serviço, e delira.

A lógica da state machine no Brain está correta. O problema é que ela nunca recebe o estado anterior.

### O que será feito (2 partes)

---

**Parte 1: Brain — gerenciar conversa internamente**

O Brain vai parar de depender do `conversation_id` que o n8n passa. Em vez disso:

- Recebe `contact_id` + `whatsapp_channel_id` do payload
- Faz `SELECT` buscando conversa aberta para esse par
- Se encontra: carrega o `bot_state` existente
- Se não encontra: cria uma nova conversa
- Usa esse `conversation_id` interno para tudo (debounce, state, save)

Isso elimina a causa raiz de uma vez: independente do que o n8n faz, o Brain sempre encontra a conversa certa.

Além disso:
- Samsung/Motorola: `action: "handoff"` (com handoff, conforme solicitado)
- Pré-atendimento bateria e traseira: templates fixos já estão corretos no código
- Naturalização GPT: removida dos blocos de pré-atendimento e preço (textos fixos não devem ser reescritos)

---

**Parte 2: n8n — envio espaçado + simplificação**

O workflow será atualizado para:

1. **Parar de criar conversa** — o n8n passa apenas `contact_id` e `channel_id` no payload do Brain. O Brain cria/encontra a conversa
2. **Enviar replies[] com pausa** — o nó de outbound vai iterar o array `replies[]` e enviar cada mensagem via Evolution API com um `Wait` de 3s entre bolhas
3. **Simplificar o fluxo** — remover os nós "Buscar Conversa Aberta", "IF Conversa Existe", "Criar Conversa" e "Preparar Criação Conversa" pois o Brain faz isso

O payload para o Brain fica:
```text
{
  message: "texto do cliente",
  contact_id: "uuid",
  whatsapp_channel_id: "uuid",
  contact_first_name: "Guilherme",
  contact_display_name: "Guilherme Dalcin",
  contact_wa_id: "5551999...",
  evolution_instance_name: "robo2"
}
```

O Brain retorna:
```text
{
  replies: ["msg1", "msg2", "msg3"],
  action: "reply" | "handoff",
  conversation_id: "uuid",
  handoff_reason: "..." | null
}
```

---

### Detalhes técnicos

**Arquivo:** `supabase/functions/brain/index.ts`
- Novo handler: recebe `contact_id` + `whatsapp_channel_id`, faz lookup/create da conversa
- Remove dependência de `context.conversation_id`
- Remove `naturalize()` para blocos fixos (pré-atendimento, preço)
- Corrige `other_brand` para retornar `action: "handoff"`
- Retorna `conversation_id` no response para o n8n usar no save do outbound

**Workflow n8n:** `dsRhwCNmK5L83miU`
- Simplifica: webhook → normalizar → buscar canal → upsert contato → montar payload → chamar brain → loop replies com Wait 3s → enviar → salvar outbound → check handoff
- Remove 4 nós de gerenciamento de conversa
- Adiciona loop com pausa entre mensagens

### Validação

Antes de pedir teste, vou:
1. Deploy do Brain atualizado
2. Testar via `curl` cenários: saudação, tela, bateria, traseira, iPad, Samsung, rajada de mensagens
3. Verificar que o mesmo `contact_id` sempre retorna o mesmo `conversation_id`
4. Verificar que `bot_state` persiste entre chamadas

