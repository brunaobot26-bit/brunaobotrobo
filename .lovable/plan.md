

## Auditoria de Estresse do Brain — 50+ Testes Automatizados

### O que vou fazer

Criar um script que chama a edge function `brain` diretamente com 50+ cenários diferentes, simulando conversas completas (múltiplas mensagens por cenário). Cada teste usa um `contact_id` único para garantir sessão limpa.

### Categorias de teste

**A. Pós-orçamento (após "Ficou alguma dúvida?")**
1. "Sim" → deve agendar (handoff)
2. "Sim, quero agendar" → agendar
3. "Sim, mas quebrou a traseira também" → handoff múltiplos serviços
4. "Sim, e a bateria também" → handoff múltiplos
5. "Não, obrigado" → handoff objeção
6. "Tá caro" → handoff objeção
7. "Vou pensar" → handoff objeção
8. "Depois eu vejo" → handoff objeção
9. "Qual a garantia?" → handoff dúvida (tem ?)
10. "A tela é original?" → handoff dúvida
11. "Aceita Pix?" → handoff dúvida
12. "Tem desconto?" → handoff negociação
13. "Parcela em mais vezes?" → handoff negociação
14. "Minha bateria tá em 82%, preciso trocar?" → handoff diagnóstica (% detectado)
15. "Será que é a tela mesmo?" → handoff diagnóstica
16. "Como saber se é a bateria?" → handoff diagnóstica
17. "Bora!" → agendar
18. "Vamos lá" → agendar
19. "Quero marcar" → agendar
20. "Pode ser amanhã?" → agendar

**B. Fluxo completo (greeting → orçamento)**
21. "Oi" → saudação
22. "Oi, tudo bem?" → saudação
23. "Quero trocar a tela do iPhone 13" → direto ao orçamento
24. "Bateria iPhone 15 Pro" → direto ao orçamento
25. "Traseira iPhone 14" → direto ao orçamento
26. "Tela iPhone 12 Pro" → teste combo model
27. "Tela iPhone 12" → teste combo model
28. "Meu iPhone caiu e quebrou" → awaiting_model (sabe serviço, não modelo)
29. "iPhone 13 Pro Max" → sem serviço, pede qual serviço
30. "Meu celular tá com problema" → genérico, pede detalhes

**C. Dispositivos não-iPhone**
31. "Meu iPad tá com a tela quebrada" → handoff iPad
32. "MacBook não liga" → handoff MacBook
33. "Apple Watch com tela trincada" → handoff
34. "AirPods não carregam" → handoff
35. "Meu Samsung quebrou" → rejeição não-Apple

**D. Serviços não cotados**
36. "Câmera do iPhone não funciona" → handoff
37. "Face ID parou" → handoff
38. "iPhone caiu na água" → handoff
39. "iPhone não liga" → handoff
40. "Alto-falante com problema" → handoff

**E. Handoff keywords**
41. "Quero comprar um iPhone" → handoff compra/venda
42. "Quero falar com alguém" → handoff humano
43. "Péssimo atendimento" → handoff reclamação
44. "Quero um desconto" → handoff negociação
45. "Tem AppleCare?" → handoff técnico/legal

**F. Localização**
46. "Onde fica a loja?" → retorna endereço
47. "Qual o endereço?" → retorna endereço
48. "Como chego aí?" → retorna endereço

**G. Mídia**
49. Áudio (message_type=audio) → handoff silencioso/mensagem
50. Imagem (message_type=image) → handoff silencioso/mensagem

**H. Edge cases**
51. Mensagem vazia → skip
52. "Oi" + depois "Oi" de novo → não duplica saudação
53. Greeting durante handoff → smart reset
54. Modelo ambíguo: "meu 13" → deve detectar iPhone 13
55. "Tela do meu 7" → deve detectar iPhone 7

### Execução

Script em TypeScript/Deno via `curl_edge_functions`, rodando cada cenário com `contact_id` UUID único. Para cenários multi-turno (ex: pós-orçamento), envio as mensagens sequencialmente. O script produz um relatório com PASS/FAIL para cada caso.

### Resultado

Relatório em tabela markdown com: cenário, mensagens enviadas, resposta do bot, resultado esperado, PASS/FAIL.

### Arquivos alterados
Nenhum — apenas leitura e testes via curl.

