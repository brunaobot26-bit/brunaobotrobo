
CREATE TABLE public.service_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_group text NOT NULL,
  model text,
  model_display text,
  variant text,
  erp_product_id text,
  service_name text NOT NULL,
  service_sku text,
  service_price numeric NOT NULL,
  labor_price numeric NOT NULL DEFAULT 99.90,
  final_price numeric NOT NULL,
  active boolean NOT NULL DEFAULT true,
  synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_group, model, variant)
);

ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to service_pricing"
ON public.service_pricing
FOR SELECT
USING (true);

CREATE INDEX idx_service_pricing_group_model ON public.service_pricing (service_group, model);
CREATE INDEX idx_service_pricing_active ON public.service_pricing (active);
