import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vxpjrvlxocsmoispaemd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cGpydmx4b2NzbW9pc3BhZW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNjQxNzMsImV4cCI6MjA5MDg0MDE3M30.WDqta9wE0Wdw-0UCk2Z4pTG2Cy83vy_veD8yAuumo60";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
