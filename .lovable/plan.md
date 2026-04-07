

# Plano: Gerar deploy_brain_v2_parte2.sh

Script complementar que cobre o que faltou no primeiro deploy.

## Conteúdo do script

### 1. `robot_brain_api.py` corrigido
- Endpoint `/think` passa a devolver `replies: [...]` (array) em vez de `reply: "..."` (string única)
- Mantém compatibilidade: se o runtime retornar string antiga, wrapa em array automaticamente
- Baseado no código original que o Brunão já colou aqui

### 2. `robot_brain_contract.md` atualizado
- Documento de referência com as 3 fases comerciais (Apresentação, Regras/Valores, Condução)
- Regras por serviço (tela, bateria, traseira)
- Âncoras comerciais e garantias
- Baseado no conteúdo do brain_v2/ que já foi enviado

### 3. Pasta `brain_v2/` completa
Todos os 7 arquivos que o Brunão já compartilhou:
- `README.md`
- `SYSTEM_PROMPT.md`
- `SERVICE_RULES.md`
- `STYLE_EXAMPLES.md`
- `ANTI_PATTERNS.md`
- `HANDOFF_RULES.md`
- `OPEN_QUESTIONS.md`

## Formato

Mesmo padrão do primeiro script:
- Backup automático dos originais
- Escrita via heredoc ou base64
- Instruções no final sobre ordem de execução

## Uso

```bash
# Primeiro roda o original
bash deploy_brain_v2.sh

# Depois roda o complemento
bash deploy_brain_v2_parte2.sh

# Reinicia o brain
pkill -f robot_brain_api.py
cd /root/.openclaw/workspace/projects/ihelpu-robo && nohup python3 robot_brain_api.py &
```

## Entrega

Arquivo único: `/mnt/documents/deploy_brain_v2_parte2.sh`

