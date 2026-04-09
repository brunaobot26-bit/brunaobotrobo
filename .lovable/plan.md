

## Zerar histórico do número 51981404179

Migration SQL para fechar todas as conversas abertas e resetar o bot_state:

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

Próxima mensagem vai iniciar conversa nova do zero.

