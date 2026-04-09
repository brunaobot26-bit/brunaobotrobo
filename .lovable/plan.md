

## Plano: Executar testes end-to-end do Brain via curl

Vou chamar a edge function `brain` diretamente com mensagens simuladas para validar todos os cenários que construímos. Para cada teste, usarei um `contact_id` fictício diferente para garantir sessão limpa.

### Cenários a testar

**Grupo 1 — Detecção de modelo**
1. "cair" NÃO deve detectar iPhone Air (fix word boundary)
2. "tela do meu x quebrada" → deve detectar iPhone X (contexto + alias curto)
3. "iPhone 14 pro max" → detecção normal

**Grupo 2 — Fluxo iPhone com serviço suportado**
4. "trocar a tela do meu iPhone 13" → greeting + pre-service + preço (1 chamada)
5. "quero trocar bateria" → pede modelo → enviar "15 pro" → preço

**Grupo 3 — Dispositivos não-iPhone**
6. "trocar bateria do meu MacBook Pro 2020" → handoff direto
7. "tela do meu iPad quebrou" → handoff direto

**Grupo 4 — Serviço não suportado iPhone**
8. "meu iPhone não liga" → handoff (unsupported keyword)
9. "problema na câmera do meu iPhone 15" → handoff

**Grupo 5 — Handoff keywords**
10. "quero comprar um iPhone" → handoff compra/venda
11. "quero falar com uma pessoa" → handoff humano
12. "quero um desconto" → handoff negociação

**Grupo 6 — Post-quote (agendamento vs diagnóstico)**
13. Após orçamento bateria: "Sim" → agendamento
14. Após orçamento bateria: "Sim, é a bateria mesmo o problema?" → diagnóstico
15. Após orçamento bateria: "Sim, tem horário às 14h?" → agendamento

**Grupo 7 — Múltiplos serviços**
16. "preciso trocar tela e bateria" → handoff múltiplos

**Grupo 8 — Correção de device**
17. "trocar bateria" → bot assume iPhone → "é um MacBook" → handoff MacBook

**Grupo 9 — Handoff ack**
18. Após handoff, enviar outra mensagem → deve receber ack 1x, depois silêncio

**Grupo 10 — Garantia vitalícia (texto correto)**
19. Verificar que o pre-service de tela diz "Garantia vitalícia na tela - A maior do mercado e exclusividade iHelpU ✅" (sem menção Infinity/Essential)

### Execução

Cada teste será uma chamada `curl_edge_functions` com contact_id único (UUID gerado). Vou analisar os `replies` e `action` retornados para validar.

### Arquivos alterados
Nenhum — são apenas testes de leitura.

### Risco
Zero — chamadas read-only à edge function com dados fictícios.

