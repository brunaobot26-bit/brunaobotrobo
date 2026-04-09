

## Problema: iPhone X não reconhecido quando usuário responde apenas "X"

### Causa raiz

Na função `detectModel`, o modelo `"iphone x"` tem apenas o alias `["iphone x"]`. Quando o bot pergunta "Qual é o modelo?" e o usuário responde apenas "X", o texto processado é `"x"` — que não contém `"iphone x"`.

Adicionar `"x"` como alias direto causaria falsos positivos (qualquer mensagem com a letra X matcharia).

### Solução

Criar aliases curtos (`"x"`, `"xr"`, `"xs"`, `"xs max"`, `"se"`, etc.) e aplicá-los **somente quando o bot está no estado de aguardando modelo** (`bot_state.step === "awaiting_model"`). Nesse contexto, uma resposta curta como "X" ou "XR" claramente se refere ao modelo.

### Implementação

1. **Adicionar aliases curtos no `models`:**
   ```
   "iphone x": ["iphone x", "x"],
   "iphone xr": ["iphone xr", "xr"],
   "iphone xs": ["iphone xs", "xs"],
   "iphone xs max": ["iphone xsmax", "xs max", "iphone xs max", "xsmax"],
   ```
   E para numéricos: `"11"`, `"12"`, `"13"`, `"14"`, `"15"`, `"16"`, etc.

2. **Modificar `detectModel` para aceitar um parâmetro `shortMatch`:**
   ```typescript
   function detectModel(msg: string, shortMatch = false): string | null {
     const t = msg.toLowerCase().replace(/[^a-z0-9\s\/]/g, "").trim();
     const sortedModels = Object.entries(lookupData.models)
       .sort((a, b) => b[0].length - a[0].length);
     
     for (const [canonical, aliases] of sortedModels) {
       for (const alias of aliases) {
         // Aliases curtos (1-2 chars) só matcham em shortMatch mode
         if (alias.length <= 2 && !shortMatch) continue;
         if (t.includes(alias)) return canonical;
       }
       if (t.includes(canonical)) return canonical;
     }
     return null;
   }
   ```

3. **Chamar com `shortMatch = true` quando `step === "awaiting_model"`:**
   No ponto do código onde o bot processa a resposta do modelo, passar `detectModel(userMsg, true)`.

### Risco
Baixo — aliases curtos só ativam quando o bot está explicitamente pedindo o modelo, eliminando falsos positivos no fluxo normal.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — aliases + lógica de shortMatch

