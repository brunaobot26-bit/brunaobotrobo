
Objetivo: parar o looping e estabilizar o atendimento sem “reconstruir tudo”. A ideia é manter o catálogo/preços atuais e trocar apenas o controlador da conversa por um fluxo híbrido: regras determinísticas para decidir o que fazer, GPT só para interpretar ambiguidades e deixar o texto natural.

1. Diagnóstico do problema atual
- O Brain está tentando fazer 3 coisas ao mesmo tempo: interpretar, decidir estado da conversa e montar a resposta final.
- Pelos logs, o Brain frequentemente trabalha com `history_length: 0` e `pending_count: 1`, então ele não está confiando em contexto suficiente para saber que já se apresentou ou que o cliente já falou “tela”.
- Hoje há duas camadas competindo pelo controle:
  - n8n dispara múltiplas execuções por mensagens seguidas
  - GPT decide o próximo passo com regras muito extensas e conflitantes
- Resultado: repetição de apresentação, perda do serviço pedido, ordem errada entre pré-atendimento e preço.

2. Direção da correção
Trocar o “cérebro centralizado em prompt” por este desenho:

```text
Inbound WhatsApp
→ debounce/agrupamento (5–8s)
→ extrator de intenção/slots
→ máquina de estados determinística
→ quote engine objetiva
→ composição das mensagens
→ envio espaçado (3s entre bolhas)
→ handoff quando necessário
```

3. O que será implementado
A. Camada de debounce real
- Consolidar 2–3 mensagens seguidas do cliente em uma única entrada lógica.
- O processamento só segue com a última versão consolidada daquela conversa.
- Execuções antigas da mesma conversa devem ser descartadas.
- Isso precisa virar regra de orquestração, não só um `sleep` dentro do GPT flow.

B. Estado explícito da conversa
Guardar slots objetivos por conversa:
- identidade usada: Emerson ou iHelper
- saudação já feita?
- device_type: iphone / ipad / macbook / airpods / apple_watch / other_brand
- service_type: tela / bateria / traseira / outro
- model
- stage: greeting / awaiting_problem / awaiting_model / ready_quote / post_quote / handoff
- último orçamento / último handoff

Com isso, quando o cliente mandar “iPhone 13 pro”, o sistema completa o que faltava e continua do ponto correto, sem esquecer que antes ele falou “trocar a tela”.

C. Máquina de estados determinística
Regras fixas para os fluxos principais:
- Tela iPhone
  - se faltou modelo: pedir modelo
  - quando tiver serviço + modelo: mandar padrão de pré-atendimento
  - depois preço Infinity
  - depois opção Essential
  - depois pergunta final de continuidade/agendamento
- Bateria iPhone
  - padrão de pré-atendimento
  - preço
  - pergunta da saúde da bateria
  - se objeção técnica: handoff
- Traseira de vidro iPhone
  - padrão de pré-atendimento
  - preço
  - prazo/risco
  - pergunta de agendamento
- iPad / MacBook / AirPods / Apple Watch
  - resposta simples, educada, pedindo modelo/problema se faltar
  - encaminha para especialista
- Samsung/Motorola/etc.
  - informar que a iHelpU é especializada em Apple
  - sem “boa sorte”, sem handoff

D. GPT com função limitada
GPT não decide mais o fluxo principal.
Ele ficará só para:
- entender mensagem ambígua
- normalizar linguagem do cliente
- deixar a resposta natural, sem cara de robô
- sugerir handoff em casos fora do escopo

Mas:
- preço, horário, etapa da conversa e necessidade de pedir modelo serão decididos por regra
- saudação repetida será bloqueada por código
- se já existe `service_type` salvo, uma nova mensagem com o modelo não pode zerar esse contexto

E. Mensagens espaçadas fora do GPT
Em vez de depender de `---` como principal mecanismo:
- o Brain retorna uma lista estruturada de mensagens
- o workflow envia cada bolha com pausa de ~3s
- assim o padrão “pré-atendimento → preço → pergunta final” sai sempre na ordem certa

F. Horário e identidade
- Horário comercial: Emerson
- Fora do horário: iHelper
- Se loja fechada:
  - informar que está fechada
  - mostrar horário da unidade
  - manter o atendimento e já adiantar coleta/orçamento quando couber
- Se existir `store_unit_id`, usar `store_units`; se faltar, usar fallback atual temporariamente

4. Ajustes de implementação prioritários
1. Refatorar o Brain para separar:
- extração
- decisão de estado
- montagem das mensagens

2. Parar de depender de prompt para lembrar contexto já conhecido.
3. Garantir idempotência por conversa para evitar respostas duplicadas.
4. Trocar a saída textual livre por saída estruturada, por exemplo:
- `action`
- `state`
- `slots`
- `replies[]`
- `handoff_reason`

5. No workflow, enviar `replies[]` com atraso controlado e só marcar handoff no ramo correto.

5. Validação antes de te pedir teste
Eu validaria primeiro estes cenários internamente, do início ao fim, sem te pedir nova rodada antes disso:

- Tela:
  - “Boa noite” → “quero trocar a tela” → “iPhone 13 Pro”
  - esperado: sem repetir iHelper, sem esquecer tela, com pré-atendimento antes do preço

- Bateria:
  - “meu iPhone 13 está descarregando rápido”
  - esperado: preço + pergunta da saúde da bateria

- Traseira:
  - “quebrei o vidro de trás do iPhone 14”
  - esperado: condições + preço + prazo + pergunta de agendamento

- iPad:
  - “quero trocar a tela do meu iPad”
  - esperado: resposta simples + coleta de modelo/problema se faltar + handoff

- Samsung:
  - “troca tela de Samsung?”
  - esperado: informar especialização Apple, sem handoff, sem floreio

- Rajada de mensagens:
  - “minha tela quebrou”
  - “quero trocar”
  - “iPhone 13”
  - esperado: uma resposta coerente, única, sem duplicidade

- Fora do horário:
  - esperado: identidade iHelper + aviso de loja fechada + horário correto

6. Resultado esperado
Depois dessa refatoração, o comportamento deixa de ser “GPT tentando lembrar tudo” e passa a ser:
- conversa natural
- contexto preservado
- ordem de atendimento fixa
- preço objetivo
- handoff controlado
- zero repetição de apresentação

7. Detalhes técnicos
- Problema principal observado no código atual:
  - o fluxo usa prompt grande demais para controle de estado
  - o histórico real nem sempre chega consistente
  - há forte chance de concorrência entre execuções da mesma conversa
- Mudança recomendada:
  - manter `quote()` e detecção de catálogo
  - substituir a lógica de decisão em `processWithGPT` por um orquestrador determinístico
  - deixar GPT como apoio, não como maestro
- Impacto:
  - refactor moderado no `brain`
  - ajuste no workflow de envio
  - possivelmente um pequeno estado persistido por conversa para robustez

8. Escopo exato da próxima implementação
- estabilizar tela, bateria, traseira, iPad e Samsung
- corrigir repetição de identidade
- preservar contexto entre mensagens curtas
- agrupar mensagens em sequência
- validar ponta a ponta antes de te pedir teste manual
