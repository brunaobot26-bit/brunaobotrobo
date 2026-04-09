

## Fix: "air" alias matching "cair" (and similar false positives)

### Causa raiz

No `detectModel` (linha 248), aliases com mais de 2 caracteres usam `t.includes(alias)`. O alias `"air"` tem 3 chars, então passa direto no check de short alias (<=2). A palavra `"cair"` contém a substring `"air"`, causando falso positivo.

Isso pode acontecer com outros aliases curtos de 3 chars no futuro também.

### Solução

Para o alias `"air"`, exigir **word boundary** (`\b`) em vez de `includes()`. A forma mais limpa: tratar aliases de 3 chars ou menos que não contêm números da mesma forma que os de <=2 chars — usando regex com word boundary.

Mudança concreta na linha 248 do `detectModel`:

```typescript
// Antes:
if (t.includes(alias)) return canonical;

// Depois:
if (alias.length <= 3 && !/\d/.test(alias)) {
  // Short text-only aliases (like "air") need word boundary to avoid "cair" → "air"
  const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(`\\b${escaped}\\b`, "i").test(t)) return canonical;
} else {
  if (t.includes(alias)) return canonical;
}
```

Isso garante que `"air"` só casa quando é uma palavra isolada (ex: `"iphone air"`, `"é o air"`) e não dentro de `"cair"`, `"pair"`, etc.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — word boundary para aliases curtos (<=3 chars sem dígitos) no `detectModel`
- Deploy da edge function `brain`
- Reset conversa de teste

### Risco
Mínimo — aliases como `"8"`, `"11"`, `"se"` já têm tratamento especial. Essa mudança só adiciona proteção para aliases textuais curtos como `"air"`.

