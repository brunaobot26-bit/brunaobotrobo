
Objetivo: corrigir a causa real do “robô burro/repetido”. O problema principal não está mais nas regras de atendimento em si; está no fato de o Brain estar recebendo mensagens sem identificação de sessão, então ele responde cada entrada como se fosse um primeiro contato.

## Diagnóstico confirmado

Achei a causa raiz nos logs e no workflow atual:

1. O Brain recebeu estas duas entradas separadas:
   - `boa noite1`
   - `tudo bem?`

2. Nessas duas chamadas, os logs mostram:
   - `contact_id: ""`
   - `channel_id: ""`
   - `conversation_id: ""`

3. Quando isso acontece, no `brain/index.ts`:
   - `findOrCreateConversation(...)` não roda
   - `saveInboundMessage(...)` não salva
   - o debounce de 6s não agrega mensagens
   - o estado não é reutilizado
   - a saudação reinicia do zero

Resultado: ele responde 2 vezes, se reapresenta 2 vezes e “esquece” o contexto.

Em resumo: o Brain está correto em partes, mas o fluxo real está chegando “cego”.

## Onde o problema está

### Workflow n8n afetado
`WA - Fase 1 MVP iHelpU (clean rebuild)`  
ID: `dsRhwCNmK5L83miU`

### Pontos mais suspeitos no fluxo
- `VERDE | HTTP - Buscar Canal`
- `VERDE | Code - Normalizar Canal`
- `VERDE | HTTP - Upsert Contato`
- `VERDE | Code - Normalizar Contato`
- `VERMELHO | Code - Montar Payload Brain`
- `VERMELHO | HTTP - Chamar Brain`

Hoje, o Brain está sendo chamado sem os dois campos obrigatórios de sessão:
- `contact_id`
- `whatsapp_channel_id`

## Plano de correção

### 1. Travar o contrato antes de chamar o Brain
Adicionar validação no fluxo para que o Brain só seja chamado se estes campos existirem:
- `message`
- `contact_id`
- `whatsapp_channel_id`

Se `contact_id` ou `channel_id` vierem vazios:
- não chamar o Brain
- parar a execução com erro explícito no n8n
- registrar claramente qual nó falhou em popular o dado

Isso evita resposta errada “bonita”, que parece regra ruim mas na verdade é sessão quebrada.

### 2. Corrigir a cadeia de resolução de canal e contato
Ajustar os nós verdes para garantir que sempre saiam com:
- `channel_id` válido a partir da instância Evolution
- `contact_id` válido a partir do upsert no Supabase

O foco aqui é deixar o item que sai de `VERDE | Code - Normalizar Contato` sempre com:
```text
contact_id
channel_id
contact_phone_number
contact_wa_id
message_text
message_timestamp
```

### 3. Endurecer o payload enviado ao Brain
No `Montar Payload Brain`, garantir que o payload final contenha sempre:
```text
message
contact_id
whatsapp_channel_id
contact_first_name
contact_display_name
external_message_id
message_timestamp
```

Sem isso, o Brain não consegue:
- abrir/reusar conversa
- agregar rajadas
- lembrar estágio do atendimento

### 4. Colocar um failsafe dentro do Brain
Mesmo com n8n corrigido, vou blindar o Brain para não repetir esse problema.

Se chegar requisição sem `contact_id` ou `whatsapp_channel_id`, o Brain não deve responder normalmente.  
Ele deve retornar algo neutro (`skip`/erro controlado), em vez de saudar como se fosse um primeiro contato.

Assim evitamos que uma falha de integração vire atendimento ruim.

### 5. Adicionar anti-duplicação real no Brain
Hoje existe debounce por mensagens salvas, mas ele depende da conversa existir.

Vou reforçar com deduplicação por evento, usando:
- `external_message_id` quando existir
- fallback por combinação de texto + timestamp + contato

Também vou passar a usar o campo de estado já existente (`last_processed_at`) para impedir resposta duplicada ao mesmo evento.

Isso protege contra:
- duas mensagens em sequência
- reentrega do webhook
- execução duplicada do n8n
- repetição da saudação

### 6. Ajustar a experiência de saudação
Depois da sessão estabilizada, a saudação passa a obedecer corretamente:
- identifica como iHelper só 1 vez
- informa loja fechada só 1 vez
- segunda mensagem do cliente complementa a primeira, não reinicia tudo

Exemplo esperado para:
```text
boa noite1
tudo bem?
```
Saída correta:
- 1 única resposta consolidada
- sem reapresentação duplicada
- sem repetir horário duas vezes

## Validação que vou considerar obrigatória

Vou validar estes cenários após a correção:

1. Saudação quebrada em 2 mensagens
```text
boa noite
tudo bem?
```
Esperado: 1 resposta consolidada

2. Problema quebrado em 2 mensagens
```text
quebrei a tela
do meu iphone 13
```
Esperado: entender como mensagem única e pedir/seguir fluxo correto

3. Saudação + problema
```text
boa noite, quebrei a tela do meu iphone 13
```
Esperado: apresentação única + pré-atendimento + valores na ordem certa

4. iPad
Esperado: resposta curta + handoff

5. Samsung/Motorola
Esperado: “somos especializados em Apple” + handoff, sem floreio

6. Verificação técnica
- mesmo `conversation_id` entre mensagens do mesmo contato
- `bot_state` persistindo
- nenhum `BRAIN INPUT` com `contact_id`/`channel_id` vazios
- nenhuma saudação duplicada para a mesma interação

## Detalhes técnicos

### Evidência forte encontrada
Nos logs recentes do Brain:
```text
BRAIN INPUT => message:"boa noite1", contact_id:"", channel_id:""
BRAIN INPUT => message:"tudo bem?", contact_id:"", channel_id:""
BRAIN OUTPUT => conversation_id:""
```

Isso explica exatamente por que:
- o debounce não agregou
- a conversa não teve memória
- a saudação repetiu

### Arquivo principal afetado
- `supabase/functions/brain/index.ts`

### Integração principal afetada
- workflow n8n `dsRhwCNmK5L83miU`

## Escopo da próxima implementação
- corrigir passagem de `contact_id` e `channel_id` no n8n
- impedir chamada inválida ao Brain
- blindar o Brain contra requests sem sessão
- adicionar deduplicação por evento
- revalidar ponta a ponta os cenários de saudação, tela, bateria, traseira, iPad e Samsung
