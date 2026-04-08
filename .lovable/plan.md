

# Plano: Gerar scripts V2 corrigidos com feedback do OpenClaw

## Problemas identificados e correções

### 1. Conflito de garantia (CRÍTICO)
**Onde**: `deploy_brain_v2_parte2.sh` — linhas 175, 182, 328, 348, 403, 404
**Problema**: Bateria e traseira dizem "90 dias"
**Correção**: Trocar para "1 ano" em todos os pontos:
- `robot_brain_contract.md` → Bateria: 1 ano, Traseira: 1 ano
- `brain_v2/SERVICE_RULES.md` → mesma correção
- `brain_v2/ANTI_PATTERNS.md` → "NUNCA dizer que bateria tem garantia vitalícia (é 1 ano)" / idem traseira

### 2. Instrução do n8n inconsistente
**Problema**: Em um lugar diz "Code node", em outro diz "Split In Batches"
**Correção**: Padronizar para **Code node** (mais explícito e previsível, como o OpenClaw recomendou). Atualizar as instruções finais do script 2.

### 3. Script 1 — sem alterações
O script 1 (`deploy_brain_v2.sh`) não tem referências a garantia nos strings do runtime — o conflito era apenas na documentação do script 2. Ele permanece inalterado.

## Entrega

Vou gerar **2 arquivos corrigidos** em `/mnt/documents/`:

- `deploy_brain_v2.sh` → mantém igual (sem mudanças necessárias)
- `deploy_brain_v2_parte2_v2.sh` → versão corrigida com:
  - Garantias bateria/traseira = 1 ano
  - Instrução n8n padronizada (Code node)

E um **bonus**: `deploy_brain_v2_unificado.sh` que junta os dois em um arquivo único para rodar de uma vez só.

## Checklist de validação (para o OpenClaw rodar antes do deploy)

```bash
python3 -m py_compile robot_brain_api.py
python3 -m py_compile robot_brain_runtime.py
python3 -m py_compile robot_quote_engine.py
python3 -m py_compile robot_scheduling.py
curl -s http://localhost:8011/health
curl -s -X POST http://localhost:8011/think -H 'Content-Type: application/json' -d '{"message":"boa tarde"}'
```

