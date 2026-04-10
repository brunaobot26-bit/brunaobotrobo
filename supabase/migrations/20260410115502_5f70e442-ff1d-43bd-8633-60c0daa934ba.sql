
-- Delete all messages for this contact's conversation
DELETE FROM messages WHERE conversation_id = '00bf0d20-a238-4d05-be9f-189331e346d4';

-- Reset the conversation state
UPDATE conversations SET 
  handoff = false,
  bot_enabled = true,
  human_active = false,
  bot_state = '{"stage":"greeting","greeted":false,"identity":"iHelper","device_type":null,"model":null,"service_type":null,"quote_sent":false,"pre_service_sent":false,"handoff_ack_sent":false,"handoff_reason":null,"closed_notice_sent":false,"last_processed_at":null}'::jsonb,
  status = 'open',
  last_quote_data = null
WHERE id = '00bf0d20-a238-4d05-be9f-189331e346d4';
