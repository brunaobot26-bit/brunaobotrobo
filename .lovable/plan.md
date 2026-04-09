

## Plano: Simplificar workflow n8n

### Problema atual
O n8n está fazendo coisas que o Brain já faz internamente:
- Buscar/criar conversa → Brain faz via `findOrCreateConversation`
- Salvar mensagem inbound → Brain faz via `saveInboundMessage`  
- Buscar histórico → Brain faz debounce interno com consulta ao banco

Isso causa **mensagens inbound duplicadas** e o `conversation_id` que o n8n passa nem é usado pelo Brain (que busca pelo `contact_id` + `channel_id`).

Além disso, o "Preparar Outbound" usa `upstream.conversation_id` que vem do n8n (às vezes null), em vez do `brain.conversation_id` que é o correto.

### O que vai mudar no workflow

**Nós removidos (6 nós):**
- VERDE | HTTP - Buscar Conversa Aberta
- VERDE | Code - Normalizar Conversa
- VERDE | IF - Conversa Existe?
- VERDE | Code - Preparar Criação Conversa
- VERDE | HTTP - Criar Conversa
- VERDE | HTTP - Salvar Mensagem Inbound
- ROXO | HTTP - Buscar Histórico Recente
- ROXO | Code - Normalizar Histórico

**Nós mantidos (sem alteração):**
- AZUL | Webhook
- AZUL | Code - Normalizar Inbound
- VERDE | HTTP - Buscar Canal
- VERDE | Code - Normalizar Canal
- VERDE | HTTP - Upsert Contato
- VERDE | Code - Normalizar Contato
- VERMELHO | HTTP - Chamar Brain
- ROSA | HTTP - Enviar Evolution
- ROSA | IF - Handoff após Salvar?
- ROSA | HTTP - Marcar Handoff

**Nós alterados (3 nós):**

1. **VERMELHO | Code - Montar Payload Brain** — lê direto de "Normalizar Contato" (sem depender de "Contexto Atual" que foi removido). Passa `contact_wa_id` e `evolution_instance_name` junto.

2. **ROSA | Code - Preparar Outbound** — usa `brain.conversation_id` (retornado pelo Brain) em vez de `upstream.conversation_id`. Também passa `contact_wa_id` do upstream.

3. **ROSA | HTTP - Salvar Outbound** — usa `conversation_id` do item atual (que veio do brain).

**Novo fluxo simplificado:**
```text
Webhook → Normalizar Inbound → Buscar Canal → Normalizar Canal 
  → Upsert Contato → Normalizar Contato → Montar Payload Brain 
  → Chamar Brain → Preparar Outbound → IF handoff? 
  → Enviar Evolution → Salvar Outbound → IF Handoff após Salvar? 
  → Marcar Handoff
```

### Detalhes técnicos

**Montar Payload Brain (novo código):**
```javascript
const ct = $node['VERDE | Code - Normalizar Contato'].json;
const inb = $node['AZUL | Code - Normalizar Inbound'].json;
return [{ json: {
  contact_id: ct.contact_id,
  channel_id: ct.channel_id,
  evolution_instance_name: ct.evolution_instance_name,
  contact_wa_id: ct.contact_wa_id,
  payload: {
    message: ct.message_text,
    contact_id: ct.contact_id,
    whatsapp_channel_id: ct.channel_id,
    contact_first_name: ct.contact_first_name || null,
    contact_display_name: ct.contact_display_name || null,
    external_message_id: ct.message_id || null,
    message_timestamp: ct.message_timestamp || null
  }
}}];
```

**Preparar Outbound (novo código):**
```javascript
const brain = $json;
const upstream = $node['VERMELHO | Code - Montar Payload Brain'].json;
const replies = Array.isArray(brain.replies)
  ? brain.replies.filter(text => typeof text === 'string' && text.trim())
  : (brain.reply ? [brain.reply] : []);
const action = brain.action || 'reply';
if (replies.length === 0 && action === 'skip') {
  return [];
}
return replies.map(text => ({
  json: {
    conversation_id: brain.conversation_id || null,
    contact_id: upstream.contact_id,
    evolution_instance_name: upstream.evolution_instance_name,
    contact_wa_id: upstream.contact_wa_id,
    action,
    text
  }
}));
```

### Impacto
- Elimina mensagens inbound duplicadas no banco
- Garante que o `conversation_id` usado no outbound é o correto (vindo do Brain)
- Simplifica o workflow de ~22 nós para ~14 nós
- Nenhuma alteração no Brain (já está pronto)

### Validação
Após o deploy, vou testar via curl e verificar que o fluxo completo funciona ponta a ponta.

