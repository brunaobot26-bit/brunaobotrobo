

## Criar tabela `service_pricing`, popular com ERP e sincronizar a cada 24h

### Visão geral

1. Criar tabela `service_pricing` no banco (inclui mão de obra como linha separada)
2. Popular com os dados já extraídos do ERP (Tela, Bateria, Traseira de Vidro, Mão de Obra)
3. Criar edge function `sync-erp-pricing` que puxa da API Lightspeed e atualiza a tabela a cada 24h (via pg_cron)
4. Alterar o Brain para ler `service_pricing` em vez do JSON hardcoded de ~36K chars
5. Zero impacto no workflow n8n — o contrato do Brain (`/think` → `replies[]`, `action`, `handoff`) não muda

### Passo 1 — Migration: tabela `service_pricing`

```sql
CREATE TABLE service_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_group text NOT NULL,        -- "bateria iphone", "tela iphone", "traseira de vidro", "mao de obra"
  model text,                         -- "iphone 8" (null para mão de obra)
  model_display text,                 -- "iPhone 8" (null para mão de obra)
  variant text,                       -- "Infinity", "Essential", null
  erp_product_id text,
  service_name text NOT NULL,
  service_sku text,
  service_price numeric NOT NULL,     -- preço da peça (ou valor da mão de obra)
  labor_price numeric NOT NULL DEFAULT 99.90,
  final_price numeric NOT NULL,       -- service_price + labor_price
  active boolean NOT NULL DEFAULT true,
  synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_group, model, variant)
);
```

A **mão de obra** entra como uma linha com `service_group = 'mao de obra'`, `model = null`, para que o preço dela também venha do ERP e seja atualizado no sync.

### Passo 2 — Inserir dados do CSV do ERP

Insert dos ~120 produtos (Bateria, Tela, Traseira de Vidro) + 1 linha de Mão de Obra via insert tool. O `final_price` = `service_price + labor_price` (labor_price vem da linha de mão de obra do ERP: R$ 99,90).

### Passo 3 — Edge function `sync-erp-pricing`

Nova edge function que:
1. Chama `GET /api/2.0/products?page_size=500` com paginação
2. Filtra por tag_ids (Tela, Bateria, Traseira de Vidro, Mão de Obra)
3. Extrai modelo do nome do produto
4. Primeiro busca o preço da mão de obra (tag Mão de Obra)
5. Faz UPSERT na tabela `service_pricing` (on conflict `service_group, model, variant`)
6. Marca produtos que não vieram mais do ERP como `active = false`

O token da API Lightspeed será armazenado como secret do Supabase (`LIGHTSPEED_API_TOKEN`).

### Passo 4 — Agendar sync a cada 24h

Via `pg_cron` + `pg_net`, chamar a edge function `sync-erp-pricing` diariamente às 6h (antes da loja abrir).

### Passo 5 — Alterar o Brain

Substituir a linha 25 inteira (o JSON de ~36K) por uma query:

```typescript
// Buscar mão de obra do banco
const { data: laborRow } = await supabase
  .from('service_pricing')
  .select('service_price')
  .eq('service_group', 'mao de obra')
  .eq('active', true)
  .single();
const laborPrice = laborRow?.service_price ?? 99.9;

// Buscar todos os serviços
const { data: pricingRows } = await supabase
  .from('service_pricing')
  .select('*')
  .eq('active', true)
  .neq('service_group', 'mao de obra');

// Montar items_by_group_model dinamicamente
const items_by_group_model: Record<string, any[]> = {};
for (const row of pricingRows || []) {
  const key = `${row.service_group}::${row.model}`;
  if (!items_by_group_model[key]) items_by_group_model[key] = [];
  items_by_group_model[key].push({ ...row });
}
```

Os `groups` (sinônimos de serviço) e `models` (sinônimos de modelo) continuam hardcoded — são mapeamentos semânticos do bot, não dados do ERP.

### O que NÃO muda (resposta à pergunta 3)

- **Workflow n8n**: zero alteração. O Brain continua recebendo POST `/think` e retornando `{ replies[], action, state }`.
- **Colunas existentes**: nenhuma coluna de nenhuma tabela existente é alterada.
- **Formato das mensagens**: `formatQuoteMessages` continua lendo os mesmos campos (`final_price`, `variant`, etc.) — só muda de onde vêm.
- **bot_state**: estrutura idêntica.

### Resumo dos passos

1. Migration: criar tabela `service_pricing`
2. Adicionar secret `LIGHTSPEED_API_TOKEN`
3. Insert: popular tabela com dados do ERP (CSV já extraído)
4. Criar edge function `sync-erp-pricing`
5. Configurar pg_cron para rodar 1x/dia
6. Alterar Brain: trocar JSON hardcoded por SELECT
7. Deploy das duas edge functions
8. Testar com o número 51981404179

