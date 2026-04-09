

## Dois ajustes no Brain

### Ajuste 1: Reconhecer "X" como iPhone X em contexto natural

**Problema:** Quando o usuário diz "tela do meu x quebrada", o `detectModel` roda com `shortMatch=false` e ignora o alias "x" (<=2 chars). O bot pede o modelo novamente.

**Solução:** Na função `detectModel`, quando `shortMatch=false`, permitir aliases curtos se vierem precedidos de contexto claro de modelo — padrões como `meu x`, `iphone x`, `do x`. Implementar verificação com regex para aliases curtos em contexto:

```typescript
// Para aliases curtos sem shortMatch, verificar se há contexto de modelo
if (alias.length <= 2 && !shortMatch) {
  const contextPattern = new RegExp(`(meu|minha|do meu|da minha|iphone)\\s+${alias}\\b`, "i");
  if (contextPattern.test(t)) return canonical;
  continue;
}
```

Isso reconhece "tela do meu x", "meu xr", "iphone 8" sem falso positivo de um "x" solto.

### Ajuste 2: Texto de garantia da tela

**Problema:** O texto atual mostra "Garantia vitalícia na tela (Infinity) / 1 ano (Essential)".

**Correção:** Linha 267, alterar para:
```
• Garantia vitalícia na tela - A maior do mercado e exclusividade iHelpU ✅
```

Remove a menção "(Infinity) / 1 ano (Essential)".

### Arquivos alterados
- `supabase/functions/brain/index.ts` — regex de contexto no `detectModel` + texto de garantia
- Deploy da edge function `brain`

### Risco
Baixo — a regex exige palavras de contexto antes do alias curto, eliminando falsos positivos.

