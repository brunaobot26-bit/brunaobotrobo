

## Duas correções no Brain

### Problema 1: Bateria iPhone 8 sem preço no lookupData

O `lookupData.items_by_group_model` na linha 25 do `brain/index.ts` tem baterias apenas do iPhone 11 em diante. Falta a entrada `"bateria iphone::iphone 8"`.

**Correção:** Adicionar a entrada no objeto `items_by_group_model` com os dados corretos do ERP (preço peça + mão de obra). Também verificar se falta iPhone 7, 6s, etc. — todos os modelos antigos que estão na lista `models` mas não têm preço de bateria.

Preciso que você me confirme: qual é o preço da bateria do iPhone 8 (peça + mão de obra)? Ou posso pegar do ERP. Se for o mesmo padrão dos outros: peça R$ X + mão de obra R$ 99,90.

Vou consultar o ERP para ver se tem o dado.

### Problema 2: Mensagem de handoff quando preço não encontrado + loja fechada

**Arquivo:** `supabase/functions/brain/index.ts`, linha 452

**Atual:**
```
Infelizmente não encontrei o preço para esse modelo/serviço no momento. Vou te encaminhar para um colega que pode te ajudar! 😊
```

**Novo:** Verificar `store.open` antes de montar a frase:
- Se loja **aberta**: manter como está — "Vou te encaminhar para um colega que pode te ajudar!"
- Se loja **fechada**: "Assim que abrirmos, vou te encaminhar para um colega que pode te ajudar!"

### Implementação

1. Consultar ERP para pegar preço de bateria iPhone 8 (e outros modelos antigos se existirem)
2. Adicionar entrada `"bateria iphone::iphone 8"` no lookupData
3. Alterar linha 452 para verificar `store.open` e ajustar a frase
4. Deploy da edge function

### Risco
Baixo — são alterações pontuais no lookup estático e numa string condicional.

