-- CBS-GO: player_state country flag preference
-- Run in Supabase SQL Editor (manual). Safe / idempotent.
--
-- country_code is expected to already exist (ISO 3166-1 alpha-2).
-- show_country_flag gates leaderboard flag display (default OFF).

ALTER TABLE public.player_state
  ADD COLUMN IF NOT EXISTS show_country_flag boolean;

-- Default OFF for existing and new rows
UPDATE public.player_state
SET show_country_flag = false
WHERE show_country_flag IS NULL;

ALTER TABLE public.player_state
  ALTER COLUMN show_country_flag SET DEFAULT false;

-- Optional inspect:
-- SELECT column_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'player_state'
--   AND column_name IN ('user_id', 'country_code', 'show_country_flag')
-- ORDER BY column_name;
