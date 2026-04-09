

## Consultar API Lightspeed e extrair preços de serviço

### Situação
A ferramenta de fetch não suporta headers customizados (Authorization). Preciso executar um script Python/curl para chamar a API com o bearer token.

### O que vou fazer

1. **Script Python** que:
   - Chama `GET /api/2.0/products?page_size=500&after=0` com o header `Authorization: Bearer lsxs_pt_...`
   - Pagina automaticamente (se 500 resultados, busca próxima página)
   - Filtra por `active=true`, `variant_parent_id=null`, e `tag_ids` contendo as tags de serviço
   - Organiza por categoria: Tela iPhone, Bateria iPhone, Vidro iPhone, Traseira de Vidro, Mão de Obra
   - Exibe nome + preço de cada produto

2. **Output**: Tabela organizada por categoria com todos os produtos e preços, salva em `/mnt/documents/erp_service_products.csv`

3. **Próximo passo**: Com os dados em mãos, criar a view/tabela no Supabase e atualizar o Brain para ler dinamicamente

### Risco
Nenhum — é uma consulta read-only na API do ERP.

