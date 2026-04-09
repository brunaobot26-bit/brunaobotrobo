

## Apagar tabelas antigas que não são mais usadas

### Contexto
Com a `service_pricing` funcionando, existem 6 tabelas que foram criadas anteriormente para um modelo de catálogo mais complexo e **não são usadas por nenhum código** (nem Brain, nem sync, nem frontend):

1. `catalog_item_components`
2. `catalog_item_device_models`
3. `catalog_item_external_refs`
4. `catalog_items`
5. `device_models`
6. `pricing_rules`

Também existe uma view `resolved_pricing` referenciada nos foreign keys.

### Verificação
- Busquei por referências a essas tabelas em `supabase/functions/` — zero resultados.
- Busquei em `src/` — só aparecem no `types.ts` auto-gerado (que se atualiza sozinho após o DROP).
- O Brain lê apenas `service_pricing`, `conversations`, `contacts`, `store_units`, `whatsapp_channels` e `messages`.

### Implementação
Uma única migration SQL:

```sql
DROP VIEW IF EXISTS resolved_pricing CASCADE;
DROP TABLE IF EXISTS catalog_item_components CASCADE;
DROP TABLE IF EXISTS catalog_item_device_models CASCADE;
DROP TABLE IF EXISTS catalog_item_external_refs CASCADE;
DROP TABLE IF EXISTS catalog_items CASCADE;
DROP TABLE IF EXISTS device_models CASCADE;
DROP TABLE IF EXISTS pricing_rules CASCADE;
```

### Risco
Nenhum. Essas tabelas não são lidas nem escritas por nenhuma parte do sistema atual. O `types.ts` será regenerado automaticamente sem elas.

