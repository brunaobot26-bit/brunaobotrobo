

## Zerar histórico do número 51981404179

### O que será feito
Uma migration SQL que:
1. Fecha todas as conversas abertas do contato com `phone_digits = '5551981404179'`
2. Reseta o `bot_state` para `{}` nessas conversas (limpa greeted, closed_notice, etc.)

### SQL
```sql
UPDATE conversations 
SET status = 'closed', 
    bot_state = '{}', 
    updated_at = now() 
WHERE contact_id IN (
  SELECT id FROM contacts WHERE phone_digits = '5551981404179'
) 
AND status != 'closed';
```

### Resultado
Próxima mensagem no WhatsApp vai criar conversa nova, saudação nova, tudo do zero.

