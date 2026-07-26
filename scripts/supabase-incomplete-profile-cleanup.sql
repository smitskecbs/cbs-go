-- =============================================================================
-- CBS-GO Supabase cleanup: incomplete / anonymous profiles
-- =============================================================================
--
-- SCOPE (frontend already blocks new incomplete sync):
--   game_profiles, players, player_state, wallet_vault, friends_uid,
--   cbsgo_trades, wallet_balances (optional)
--
-- NEVER TOUCH (by design):
--   auth.users
--   treasures
--   reward_claims (especially paid rows)
--
-- HOW TO RUN (Supabase SQL Editor or psql):
--   1) Run SECTION 1–5 only → review preview + impact + risk
--   2) Export backup (Supabase dashboard backup / pg_dump)
--   3) Run SECTION 6 (BEGIN … ROLLBACK) → verify counts inside transaction
--   4) Only if satisfied: uncomment COMMIT in SECTION 7 and run manually
--
-- NOTE: Temp tables in this session are recreated each run.
-- =============================================================================


-- =============================================================================
-- SECTION 1 — FK / schema inspectie
-- =============================================================================
-- Run this first. Confirms which tables exist and which FKs may block DELETE.

SELECT
  tc.table_schema,
  tc.table_name,
  kcu.column_name,
  ccu.table_schema AS foreign_table_schema,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
 AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN (
    'game_profiles',
    'players',
    'player_state',
    'wallet_vault',
    'friends_uid',
    'cbsgo_trades',
    'wallet_balances'
  )
ORDER BY tc.table_name, kcu.column_name;

-- Tables present in public schema (quick existence check)
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'game_profiles',
    'players',
    'player_state',
    'wallet_vault',
    'friends_uid',
    'cbsgo_trades',
    'wallet_balances',
    'treasures',
    'reward_claims'
  )
ORDER BY table_name;


-- =============================================================================
-- SECTION 2 — Temp tables (incomplete + duplicates)
-- =============================================================================
-- Re-run this block whenever you start a new SQL session before sections 3–6.

DROP TABLE IF EXISTS incomplete_users;
DROP TABLE IF EXISTS incomplete_wallets;
DROP TABLE IF EXISTS duplicate_nicknames;
DROP TABLE IF EXISTS duplicate_wallets;

-- ---------------------------------------------------------------------------
-- 2a) incomplete_users — from game_profiles + auth users without valid profile
-- ---------------------------------------------------------------------------
CREATE TEMP TABLE incomplete_users AS
WITH placeholder_nicks AS (
  SELECT unnest(ARRAY[
    'anon','anonymous','guest','player','unknown','unnamed','default','user',
    'nobody','no name','noname','needs_name','needs name','needsname',
    'test','testing','nameless','new player','newplayer'
  ]) AS nick
),
gp_incomplete AS (
  SELECT
    gp.user_id,
    gp.wallet_pk,
    gp.nickname,
    gp.avatar,
    gp.xp,
    gp.tickets,
    gp.cbs_play,
    'game_profiles_incomplete'::text AS reason
  FROM public.game_profiles gp
  WHERE gp.user_id IS NULL
     OR gp.wallet_pk IS NULL OR btrim(gp.wallet_pk) = ''
     OR gp.nickname IS NULL OR btrim(gp.nickname) = ''
     OR lower(btrim(gp.nickname)) IN (SELECT nick FROM placeholder_nicks)
     OR gp.nickname ILIKE 'anon%'
     OR gp.nickname ILIKE 'anonymous%'
     OR gp.nickname ILIKE 'guest%'
     OR gp.nickname ILIKE 'player%'
     OR gp.nickname ILIKE 'needs%'
     OR gp.avatar IS NULL OR btrim(gp.avatar) = ''
),
auth_without_complete AS (
  SELECT
    u.id AS user_id,
    gp.wallet_pk,
    gp.nickname,
    gp.avatar,
    gp.xp,
    gp.tickets,
    gp.cbs_play,
    CASE
      WHEN gp.user_id IS NULL THEN 'no_game_profiles_row'
      ELSE 'game_profiles_incomplete'
    END AS reason
  FROM auth.users u
  LEFT JOIN public.game_profiles gp ON gp.user_id = u.id
  WHERE gp.user_id IS NULL
     OR gp.user_id IN (SELECT user_id FROM gp_incomplete WHERE user_id IS NOT NULL)
)
SELECT * FROM gp_incomplete
UNION
SELECT * FROM auth_without_complete;

CREATE INDEX ON incomplete_users (user_id);
CREATE INDEX ON incomplete_users (wallet_pk);

-- ---------------------------------------------------------------------------
-- 2b) incomplete_wallets — distinct wallet_pk from incomplete users
-- ---------------------------------------------------------------------------
CREATE TEMP TABLE incomplete_wallets AS
SELECT DISTINCT btrim(wallet_pk) AS wallet_pk
FROM incomplete_users
WHERE wallet_pk IS NOT NULL AND btrim(wallet_pk) <> '';

CREATE INDEX ON incomplete_wallets (wallet_pk);

-- ---------------------------------------------------------------------------
-- 2c) duplicate_nicknames — case-insensitive collisions in game_profiles
-- ---------------------------------------------------------------------------
CREATE TEMP TABLE duplicate_nicknames AS
SELECT
  lower(btrim(gp.nickname)) AS nickname_normalized,
  count(*) AS profile_count,
  array_agg(gp.user_id ORDER BY gp.updated_at NULLS LAST, gp.user_id) AS user_ids,
  array_agg(btrim(gp.nickname) ORDER BY gp.updated_at NULLS LAST) AS nicknames_raw
FROM public.game_profiles gp
WHERE gp.nickname IS NOT NULL AND btrim(gp.nickname) <> ''
GROUP BY lower(btrim(gp.nickname))
HAVING count(*) > 1;

-- ---------------------------------------------------------------------------
-- 2d) duplicate_wallets — same wallet_pk on multiple user_id rows
-- ---------------------------------------------------------------------------
CREATE TEMP TABLE duplicate_wallets AS
SELECT
  btrim(gp.wallet_pk) AS wallet_pk,
  count(*) AS profile_count,
  array_agg(gp.user_id ORDER BY gp.updated_at NULLS LAST, gp.user_id) AS user_ids,
  array_agg(btrim(gp.nickname) ORDER BY gp.updated_at NULLS LAST) AS nicknames_raw
FROM public.game_profiles gp
WHERE gp.wallet_pk IS NOT NULL AND btrim(gp.wallet_pk) <> ''
GROUP BY btrim(gp.wallet_pk)
HAVING count(*) > 1;


-- =============================================================================
-- SECTION 3 — Preview SELECTs
-- =============================================================================

-- 3a) Incomplete game_profiles rows
SELECT * FROM incomplete_users ORDER BY xp DESC NULLS LAST, user_id;

-- 3a2) Admin preview: incomplete users with auth.users.email (read-only join)
SELECT
  iu.user_id,
  u.email AS auth_email,
  iu.wallet_pk,
  iu.nickname,
  iu.avatar,
  iu.xp,
  iu.tickets,
  iu.cbs_play,
  iu.reason
FROM incomplete_users iu
LEFT JOIN auth.users u ON u.id = iu.user_id
ORDER BY iu.xp DESC NULLS LAST, iu.user_id;

-- 3b) Incomplete players (by user_id or wallet or missing nick/avatar)
SELECT p.*
FROM public.players p
WHERE p.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR (p.wallet_pk IS NOT NULL AND btrim(p.wallet_pk) IN (SELECT wallet_pk FROM incomplete_wallets))
   OR p.nickname IS NULL OR btrim(p.nickname) = ''
   OR p.avatar IS NULL OR btrim(p.avatar) = ''
   OR lower(btrim(p.nickname)) IN (
     'anon','anonymous','guest','player','unknown','unnamed','default','user',
     'nobody','no name','noname','needs_name','needs name','needsname',
     'test','testing','nameless','new player','newplayer'
   )
ORDER BY p.id NULLS LAST
LIMIT 500;

-- 3c) player_state without complete game_profiles profile
SELECT ps.*
FROM public.player_state ps
WHERE ps.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
ORDER BY ps.last_seen DESC NULLS LAST
LIMIT 500;

-- 3d) wallet_vault linked to incomplete users
SELECT wv.*
FROM public.wallet_vault wv
WHERE wv.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
ORDER BY wv.user_id
LIMIT 500;

-- 3e) friends_uid linked to incomplete users
SELECT f.*
FROM public.friends_uid f
WHERE f.a_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR f.b_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
ORDER BY f.created_at DESC NULLS LAST
LIMIT 500;

-- 3f) cbsgo_trades linked to incomplete wallets
SELECT t.*
FROM public.cbsgo_trades t
WHERE t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
   OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
ORDER BY t.created_at DESC NULLS LAST
LIMIT 500;

-- 3g) Unclaimed trades (review before delete)
SELECT t.*
FROM public.cbsgo_trades t
WHERE t.claimed = false
  AND (
    t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
    OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
  )
ORDER BY t.created_at DESC NULLS LAST;

-- 3h) Duplicate nicknames (case-insensitive)
SELECT * FROM duplicate_nicknames ORDER BY profile_count DESC, nickname_normalized;

-- 3i) Duplicate wallet_pk across user_id
SELECT * FROM duplicate_wallets ORDER BY profile_count DESC, wallet_pk;


-- =============================================================================
-- SECTION 4 — Impact counts per tabel
-- =============================================================================

SELECT 'incomplete_users (distinct user_id)' AS label, count(DISTINCT user_id) AS cnt
FROM incomplete_users WHERE user_id IS NOT NULL
UNION ALL
SELECT 'incomplete_wallets', count(*) FROM incomplete_wallets
UNION ALL
SELECT 'game_profiles (incomplete rows)', count(*)
FROM public.game_profiles gp
WHERE gp.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
UNION ALL
SELECT 'players (hit)', count(*)
FROM public.players p
WHERE p.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR (p.wallet_pk IS NOT NULL AND btrim(p.wallet_pk) IN (SELECT wallet_pk FROM incomplete_wallets))
UNION ALL
SELECT 'player_state (hit)', count(*)
FROM public.player_state ps
WHERE ps.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
UNION ALL
SELECT 'wallet_vault (hit)', count(*)
FROM public.wallet_vault wv
WHERE wv.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
UNION ALL
SELECT 'friends_uid (hit)', count(*)
FROM public.friends_uid f
WHERE f.a_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR f.b_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
UNION ALL
SELECT 'cbsgo_trades (hit)', count(*)
FROM public.cbsgo_trades t
WHERE t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
   OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
UNION ALL
SELECT 'cbsgo_trades unclaimed (REVIEW)', count(*)
FROM public.cbsgo_trades t
WHERE t.claimed = false
  AND (
    t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
    OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
  )
UNION ALL
SELECT 'duplicate_nickname groups', count(*) FROM duplicate_nicknames
UNION ALL
SELECT 'duplicate_wallet groups', count(*) FROM duplicate_wallets;

-- wallet_balances (optional table)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'wallet_balances'
  ) THEN
    RAISE NOTICE 'wallet_balances (hit): %',
      (SELECT count(*) FROM public.wallet_balances wb
       WHERE wb.wallet_pk IN (SELECT wallet_pk FROM incomplete_wallets));
  ELSE
    RAISE NOTICE 'wallet_balances: table does not exist — skip';
  END IF;
END $$;


-- =============================================================================
-- SECTION 5 — Risk review (manual decision helpers)
-- =============================================================================

-- 5a) Incomplete users with non-zero XP / tickets / CBS (data loss risk)
SELECT
  user_id,
  nickname,
  wallet_pk,
  xp,
  tickets,
  cbs_play,
  reason
FROM incomplete_users
WHERE coalesce(xp, 0) > 0
   OR coalesce(tickets, 0) > 0
   OR coalesce(cbs_play, 0) > 0
ORDER BY xp DESC NULLS LAST, tickets DESC NULLS LAST;

-- 5b) Unclaimed cbsgo_trades detail (do NOT delete blindly if tickets/CBS matter)
SELECT
  t.id,
  t.from_wallet,
  t.to_wallet,
  t.tickets,
  t.cbs,
  t.card_id,
  t.card_qty,
  t.claimed,
  t.created_at,
  t.sender_nickname
FROM public.cbsgo_trades t
WHERE t.claimed = false
  AND (
    t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
    OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
  )
ORDER BY t.created_at DESC;

-- 5c) Duplicate nicknames — which users collide?
SELECT
  dn.nickname_normalized,
  dn.profile_count,
  dn.user_ids,
  dn.nicknames_raw,
  gp.user_id,
  gp.nickname,
  gp.avatar IS NOT NULL AND btrim(gp.avatar) <> '' AS has_avatar,
  gp.xp,
  gp.wallet_pk
FROM duplicate_nicknames dn
JOIN public.game_profiles gp
  ON lower(btrim(gp.nickname)) = dn.nickname_normalized
ORDER BY dn.nickname_normalized, gp.xp DESC NULLS LAST;

-- 5d) Duplicate wallet_pk — which user_ids share a wallet?
SELECT
  dw.wallet_pk,
  dw.profile_count,
  dw.user_ids,
  dw.nicknames_raw,
  gp.user_id,
  gp.nickname,
  gp.avatar IS NOT NULL AND btrim(gp.avatar) <> '' AS has_avatar,
  gp.xp
FROM duplicate_wallets dw
JOIN public.game_profiles gp ON btrim(gp.wallet_pk) = dw.wallet_pk
ORDER BY dw.wallet_pk, gp.xp DESC NULLS LAST;

-- 5e) reward_claims touching incomplete wallets (READ ONLY — never delete paid)
SELECT
  rc.id,
  rc.status,
  rc.claimant_wallet,
  rc.paid_at,
  rc.created_at,
  rc.fail_reason
FROM public.reward_claims rc
WHERE rc.claimant_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
ORDER BY rc.created_at DESC
LIMIT 200;


-- =============================================================================
-- SECTION 6 — Transaction test (DEFAULT: ROLLBACK)
-- =============================================================================
-- Prerequisites: run SECTION 2 in the SAME session first (temp tables).
-- Review SECTION 4–5 before running.
--
-- auth.users     → NOT deleted
-- treasures      → NOT deleted
-- reward_claims  → NOT deleted

BEGIN;

-- --- 6a) friends_uid (child / relations first) ---
DELETE FROM public.friends_uid f
WHERE f.a_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR f.b_user IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

-- --- 6b) cbsgo_trades for incomplete wallets ---
-- REVIEW: unclaimed trades are deleted here too. Check SECTION 5b first.
DELETE FROM public.cbsgo_trades t
WHERE t.from_wallet IN (SELECT wallet_pk FROM incomplete_wallets)
   OR t.to_wallet IN (SELECT wallet_pk FROM incomplete_wallets);

-- --- 6c) wallet_balances (optional) ---
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'wallet_balances'
  ) THEN
    DELETE FROM public.wallet_balances wb
    WHERE wb.wallet_pk IN (SELECT wallet_pk FROM incomplete_wallets);
    RAISE NOTICE 'wallet_balances: rows deleted in this transaction';
  END IF;
END $$;

-- --- 6d) players ---
DELETE FROM public.players p
WHERE p.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL)
   OR (p.wallet_pk IS NOT NULL AND btrim(p.wallet_pk) IN (SELECT wallet_pk FROM incomplete_wallets));

-- --- 6e) player_state ---
DELETE FROM public.player_state ps
WHERE ps.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

-- --- 6f) game_profiles ---
DELETE FROM public.game_profiles gp
WHERE gp.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

-- --- 6g) wallet_vault (last user-bound layer) ---
DELETE FROM public.wallet_vault wv
WHERE wv.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

-- --- 6h) Post-delete verification (inside transaction) ---
SELECT 'remaining incomplete game_profiles' AS check_label, count(*) AS cnt
FROM public.game_profiles gp
WHERE gp.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

SELECT 'remaining player_state (incomplete users)' AS check_label, count(*) AS cnt
FROM public.player_state ps
WHERE ps.user_id IN (SELECT user_id FROM incomplete_users WHERE user_id IS NOT NULL);

-- DEFAULT: undo everything — safe dry run
ROLLBACK;

-- =============================================================================
-- SECTION 7 — COMMIT (manual only — DO NOT run by default)
-- =============================================================================
-- After a successful ROLLBACK test and backup export, you may run SECTION 6
-- again and replace ROLLBACK with:
--
-- COMMIT;
--
-- Never COMMIT without reviewing:
--   - SECTION 4 impact counts
--   - SECTION 5b unclaimed trades
--   - SECTION 5a users with XP/tickets
--   - SECTION 5c/5d duplicate nickname/wallet conflicts
-- =============================================================================
