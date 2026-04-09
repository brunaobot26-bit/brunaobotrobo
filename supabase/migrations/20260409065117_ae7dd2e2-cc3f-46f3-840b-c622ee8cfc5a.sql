SELECT cron.schedule(
  'sync-erp-pricing-daily',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url:='https://vxpjrvlxocsmoispaemd.supabase.co/functions/v1/sync-erp-pricing',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cGpydmx4b2NzbW9pc3BhZW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNjQxNzMsImV4cCI6MjA5MDg0MDE3M30.WDqta9wE0Wdw-0UCk2Z4pTG2Cy83vy_veD8yAuumo60"}'::jsonb,
    body:='{"scheduled": true}'::jsonb
  ) AS request_id;
  $$
);