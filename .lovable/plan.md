

## Ajustar handoff para serviços não suportados — iPhone e dispositivos não-iPhone

### Problema atual

Quando alguém menciona um serviço de iPhone que **não é** Tela, Bateria ou Traseira de Vidro (ex: câmera, placa, desbloqueio, Face ID, alto-falante), o `detectService` retorna `null` e o bot fica preso no loop "me conta o que aconteceu". Nunca faz handoff.

O mesmo acontece com iPad, MacBook, AirPods e Apple Watch — a resposta de loja fechada não diferencia nem pede detalhes.

### Solução

Unificar o comportamento para **todos os casos de handoff** (dispositivos não-iPhone + iPhone com serviço não suportado):

**Loja fechada:**
> "Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊
> Para agilizarmos seu atendimento, me fala qual o problema do seu aparelho e o modelo."
(Omite a segunda frase se já tem modelo + problema)

**Loja aberta:**
> "Vou encaminhar seu atendimento para um colega especialista. 😊"

### Implementação — `supabase/functions/brain/index.ts`

**1. Detectar serviço não suportado no iPhone**

Após a extração de intent (linha ~450), adicionar lógica: se `device_type === "iphone"` e o usuário descreveu um problema que NÃO matchou com os 3 serviços conhecidos (tela/bateria/traseira), e já temos informação suficiente de que é um serviço diferente (ex: via `extractIntent` ou palavras-chave como "câmera", "face id", "alto-falante", "placa", "botão", "carregador", "microfone"), marcar como handoff.

Adicionar lista de keywords para serviços não suportados:
```typescript
const unsupportedKeywords = ["câmera", "camera", "face id", "faceid", "alto-falante", 
  "alto falante", "microfone", "placa", "botão", "botao", "carregador", "conector", 
  "speaker", "dock", "sensor", "desbloqueio", "desbloquear", "software", "atualização"];
```

**2. Bloco de handoff unificado** (linhas 483-506)

Expandir para cobrir tanto dispositivos não-iPhone quanto iPhone com serviço não suportado:

```text
Se (device = ipad/macbook/watch/airpods) OU (device = iphone E serviço não suportado):
  Se loja fechada:
    - Cumprimentar + "Assim que a loja abrir, um técnico certificado Apple vai te chamar. 😊"
    - Se falta modelo ou problema: "Para agilizarmos, me fala o modelo e o problema."
  Se loja aberta:
    - Encaminhar para especialista
  → stage = "handoff"
```

**3. Ajuste no fluxo iPhone `awaiting_problem`**

Se o usuário descreve um problema que não matcha nenhum dos 3 serviços, verificar se contém keyword de serviço não suportado. Se sim, redirecionar para o bloco de handoff em vez de ficar no loop.

### Arquivos alterados
- `supabase/functions/brain/index.ts` — keywords de serviços não suportados + lógica de handoff unificada
- Deploy da edge function `brain`

### Risco
Baixo — o fluxo dos 3 serviços suportados (tela, bateria, traseira) permanece idêntico. A mudança só captura casos que hoje ficam sem resposta útil.

