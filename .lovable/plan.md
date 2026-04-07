

# Plano: Gerar pacote único com todos os arquivos corrigidos

## O que vou fazer

Gerar **1 único arquivo** em `/mnt/documents/` contendo todos os 4 arquivos corrigidos do brain, prontos para o Brunão extrair no OpenClaw.

## Formato

Um script shell (`deploy_brain_v2.sh`) que, ao ser executado no servidor, cria/sobrescreve automaticamente os 4 arquivos no path correto:

```
bash deploy_brain_v2.sh
```

Ele vai gravar diretamente em `/root/.openclaw/workspace/projects/ihelpu-robo/`:
- `robot_lookup.json` (com chaves iPhone 12 adicionadas)
- `robot_quote_engine.py` (sem fallbacks hardcoded, preço BR)
- `robot_brain_runtime.py` (3 fases completas, replies[], apresentação Emerson)
- `robot_scheduling.py` (preço BR)

## Conteúdo de cada arquivo

Conforme o plano já aprovado — todas as correções diagnosticadas:
- Lookup com mapeamento iPhone 12
- Quote engine sem fallbacks, preço `R$ 499,90`
- Runtime com 3 fases (Apresentação → Regras/Valores → Condução por serviço)
- `build_reply()` retornando `replies: list[str]`
- Scheduling com preço BR

## Entrega

Um único arquivo: `/mnt/documents/deploy_brain_v2.sh`

O Brunão só precisa fazer:
```bash
scp deploy_brain_v2.sh root@srv1503629:~/
ssh root@srv1503629 "bash ~/deploy_brain_v2.sh"
```

Ou colar no servidor e rodar `bash deploy_brain_v2.sh`.

## Bonus

No final do script, incluo instruções comentadas sobre o ajuste necessário no node n8n (ROSA | HTTP) para iterar sobre `replies[]`.

