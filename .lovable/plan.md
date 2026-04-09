

## Responder "onde fica" / endereço da loja

### Situação atual
- A tabela `store_units` já tem endereços de todas as lojas (address_line_1, neighborhood, city, state)
- O `getStoreInfo()` no brain é hardcoded — não consulta o banco
- A loja de teste (`ihelpu-teste`, id `19f0dca3...`) não tem endereço cadastrado
- O brain não detecta perguntas sobre localização/endereço

### Implementação

**1. Atualizar endereço da loja de teste no banco**

```sql
UPDATE store_units 
SET address_line_1 = 'Rua Teste 1234', neighborhood = 'Bairro Teste', city = 'Porto Alegre', state = 'RS'
WHERE slug = 'ihelpu-teste';
```

**2. Carregar dados da loja via `whatsapp_channel_id`**

Hoje o brain recebe `whatsapp_channel_id` do n8n. Vou usar isso para buscar a `store_unit` vinculada (via `whatsapp_channels.store_unit_id` → `store_units`), trazendo nome, endereço, horário. Isso substitui o `getStoreInfo()` hardcoded por dados reais do banco.

**3. Detectar pergunta de localização no `extractIntent`**

Adicionar um intent `location` no GPT que detecta frases como "onde fica", "qual o endereço", "como chego aí", "endereço da loja".

**4. Responder com endereço formatado**

Quando intent = `location`, responder com:

```
📍 Estamos na {address_line_1} - {neighborhood}, {city}/{state}.
```

Se a loja não tiver endereço cadastrado, fazer handoff.

### Arquivos alterados
- `store_units` — atualizar endereço da loja de teste (INSERT tool)
- `supabase/functions/brain/index.ts` — buscar store_unit do banco, detectar intent location, responder endereço
- Deploy da edge function `brain`

### Risco
Baixo — adiciona um novo intent sem afetar os existentes. O fallback para handoff protege contra dados faltantes.

