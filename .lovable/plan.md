

## Resposta sobre ERP + Fix do lookup combo

### A padronização no banco afeta o ERP?

**Sim, seria sobrescrita.** O sync ERP (`sync-erp-pricing`) gera o campo `model` automaticamente a partir do nome do produto no Lightspeed (linha 37-62). Se eu padronizar `iphone 12/12 pro` → `iphone 12 / 12 pro` no banco, na próxima sync (6h da manhã) o ERP vai recriar a linha com o nome original. Ou seja, mexer no banco não resolve — o fix tem que ser no código do Brain.

### Solução: fallback no `getQuote` (sem tocar no banco)

Alterar a função `getQuote` no `supabase/functions/brain/index.ts` para:

1. **Tentar match exato** (como hoje) — resolve 95% dos modelos
2. **Se falhar, normalizar e procurar** — remove espaços ao redor de `/` e busca em todas as keys normalizadas

```typescript
function getQuote(serviceType, model) {
  const key = `${serviceType}::${model}`;
  // 1. Match exato
  if (lookupData.items_by_group_model[key]) return ...;
  
  // 2. Fallback: procurar modelo dentro de keys combo
  const norm = (s) => s.replace(/\s*\/\s*/g, '/');
  for (const [k, v] of Object.entries(lookupData.items_by_group_model)) {
    if (k.startsWith(serviceType + "::") && norm(k).includes(norm(model))) {
      return v;
    }
  }
  return null;
}
```

Isso resolve:
- Cliente diz "iPhone 12 Pro" → bot detecta `iphone 12 pro` → match exato falha → fallback encontra `iphone 12 / 12 pro` e `iphone 12/12 pro` → retorna Infinity (R$ 899,90) **e** Essential (R$ 499,90)
- Cliente diz "iPhone 12" → match exato falha para tela (não existe `tela iphone::iphone 12` solo) → fallback encontra os combos → retorna ambas variantes

### Arquivos alterados
- `supabase/functions/brain/index.ts` — expandir `getQuote` com fallback normalizado
- Deploy da edge function `brain`
- Reset conversa de teste

### Risco
Zero para modelos com row própria (match exato continua prioritário). Modelos combo passam a funcionar sem mexer no banco nem no sync ERP.

