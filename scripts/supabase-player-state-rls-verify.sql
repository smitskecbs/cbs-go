-- Read-only: verify player_state ownership RLS before enabling country/flag writes.
-- Paste results back; do not skip this check.

-- 1) Columns
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'player_state'
  AND column_name IN ('user_id', 'country_code', 'show_country_flag')
ORDER BY column_name;

-- 2) Unique constraint required for upsert onConflict: 'user_id'
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'player_state'
  AND indexdef ILIKE '%user_id%';

-- 3) RLS enabled?
SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled, c.relforcerowsecurity AS rls_forced
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'player_state';

-- 4) Policies (INSERT / UPDATE / ALL must restrict to auth.uid() = user_id)
SELECT policyname, cmd, roles, qual::text AS using_expr, with_check::text AS with_check_expr
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'player_state'
ORDER BY cmd, policyname;
