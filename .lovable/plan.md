

## Fix: Parcelamento com 7% + remover valor total parcelado

### Mudanças (4 linhas no `supabase/functions/brain/index.ts`)

Nas linhas 312, 316, 324 e 330, aplicar o acréscimo de 7% no cálculo da parcela. A apresentação já mostra apenas "6x de R$ XX,XX" — não precisa mudar o formato, só a fórmula.

**De:**
```typescript
const parcela = (item.final_price / 6).toFixed(2).replace(".", ",");
```

**Para:**
```typescript
const parcela = (item.final_price * 1.07 / 6).toFixed(2).replace(".", ",");
```

Aplicar nas 4 ocorrências (linhas 312, 316, 324, 330).

**Exemplo:** Tela Infinity R$ 899,90 → parcela: `899.90 * 1.07 / 6 = R$ 160,48` (hoje mostra R$ 149,98).

O texto de apresentação já está correto — mostra apenas "6x de R$ XX,XX", sem valor total parcelado.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — 4 linhas de cálculo de parcela
- Deploy da edge function `brain`

### Risco
Zero — apenas corrige a fórmula. Valor à vista não muda.

