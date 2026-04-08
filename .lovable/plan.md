

## Problema encontrado

Na conexão atual, **Salvar Outbound sempre conecta a Marcar Handoff**, independente do ramo do IF. Isso significa que o PATCH de handoff roda em **toda mensagem**, não só quando `action === handoff`.

```text
Fluxo ATUAL (bugado):
IF → (true/false) → Enviar Evolution → Salvar Outbound → Marcar Handoff ← SEMPRE RODA

Fluxo CORRETO:
IF → (reply)   → Enviar Evolution → Salvar Outbound → FIM
IF → (handoff) → Enviar Evolution → Salvar Outbound → Marcar Handoff
```

## Solução

Como ambos os ramos do IF convergem no mesmo node `Enviar Evolution`, a informação de branch se perde. A correção mais limpa:

1. **Remover** a conexão direta `Salvar Outbound → Marcar Handoff`
2. **Adicionar um segundo IF** após Salvar Outbound que checa `$json.action === "handoff"`
3. Só o ramo TRUE desse segundo IF conecta a `Marcar Handoff`

Alternativamente (mais simples): **reestruturar o IF original** para ter dois caminhos separados:
- Ramo `reply`: Enviar Evolution → Salvar Outbound (fim)
- Ramo `handoff`: Enviar Evolution cópia → Salvar Outbound cópia → Marcar Handoff

**Recomendação**: opção 1 (segundo IF) — menos nodes, menos risco de dessincronizar.

## Implementação

Vou usar o MCP do n8n para:
1. Validar o código do workflow corrigido
2. Aplicar a atualização diretamente

## Verificação dos outros nodes

Além da correção do fluxo, vou confirmar:
- `HTTP - Chamar Brain` usa `/think` com body só `message` ✓ (já aplicado)
- `Code - Preparar Outbound` trata `replies[]` e `action` ✓ (já aplicado)
- `HTTP - Marcar Handoff` faz PATCH correto no Supabase

