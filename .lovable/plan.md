

## Ajuste: "Anotado" → "Entendi" + pedir modelo antes do handoff

### Problema atual
Na linha 735 do `brain/index.ts`, quando o cliente já foi saudado e a loja está fechada, o bot responde:
> "Anotado! Assim que a loja abrir, um técnico certificado Apple vai te chamar."

E faz handoff imediato, mesmo sem saber o modelo do dispositivo.

### Mudança

No bloco `else` (linha 734-736), trocar a mensagem e condicionar o handoff:

**Se o cliente JÁ informou modelo e problema** → handoff direto:
> "Entendi! Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊"

**Se FALTA modelo ou problema** → responder pedindo, SEM handoff ainda:
> "Entendi! Mas para agilizar seu atendimento, me diz qual o modelo do seu Apple Watch? Assim que a loja abrir, já encaminhamos direto para o técnico. 😊"

Nesse caso, o bot permanece no stage atual (não vai para `handoff`) e só faz handoff na próxima mensagem quando o cliente responder com o modelo.

A mesma lógica se aplica para loja aberta (linha 728-729) — pedir modelo antes de encaminhar.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — bloco de handoff non-iPhone (linhas 727-737), ajustar mensagem e lógica condicional
- Deploy da edge function `brain`

### Risco
Baixo — afeta apenas dispositivos non-iPhone. O handoff continua funcionando normalmente quando o cliente já deu as informações.

