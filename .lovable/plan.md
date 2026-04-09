

## Plano: Corrigir 2 bugs no workflow n8n

### Problema 1: Nó "Buscar Canal" foi deletado por engano
O nó **"VERDE | HTTP - Buscar Canal"** fazia a consulta `GET /rest/v1/whatsapp_channels?evolution_instance_name=eq.{instance}` para obter o `channel_id`. Sem ele, o "Normalizar Canal" recebe o output do "Normalizar Inbound" (que não tem dados de canal), e `channel_id` chega **vazio** ao Brain. Sem `channel_id`, o Brain não consegue criar/encontrar sessão — `conversation_id` fica vazio, estado não persiste.

**Correção**: Recriar o nó HTTP entre "Normalizar Inbound" e "Normalizar Canal":
- GET `https://vxpjrvlxocsmoispaemd.supabase.co/rest/v1/whatsapp_channels?evolution_instance_name=eq.{instance}`
- Headers: apikey, Authorization (service_role), Content-Type

### Problema 2: "Enviar Evolution" espera `contact_phone_number` mas recebe `contact_wa_id`
O nó "Enviar Evolution" envia `number: $json.contact_phone_number`, mas o "Preparar Outbound" só passa `contact_wa_id` (formato `5551...@s.whatsapp.net`). O `contact_phone_number` nunca é passado.

**Correção**: No "Preparar Outbound", adicionar `contact_phone_number` vindo do Normalizar Contato (que já o tem). Alternativamente, mudar o "Enviar Evolution" para usar `contact_wa_id` (que é o que a Evolution API aceita como `number`).

### Implementação
Vou usar o MCP do n8n para:
1. Recriar o workflow completo com o nó "Buscar Canal" restaurado
2. Corrigir o Preparar Outbound para incluir `contact_phone_number`
3. Validar e publicar

### Fluxo correto final
```text
Webhook → Normalizar Inbound → Buscar Canal (HTTP) → Normalizar Canal 
  → Upsert Contato → Normalizar Contato → Montar Payload Brain 
  → Chamar Brain → Preparar Outbound → IF handoff? 
  → Enviar Evolution → Salvar Outbound → IF Handoff após Salvar? 
  → Marcar Handoff
```

