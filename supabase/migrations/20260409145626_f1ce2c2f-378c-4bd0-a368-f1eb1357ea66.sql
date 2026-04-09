SELECT cron.schedule(
  'reactivate-bot-72h',
  '0 * * * *',
  $$
  UPDATE conversations
  SET handoff = false,
      human_active = false,
      bot_enabled = true,
      bot_state = '{}'::jsonb,
      status = 'closed'
  WHERE handoff = true
    AND last_interaction_at < now() - interval '72 hours'
  $$
);