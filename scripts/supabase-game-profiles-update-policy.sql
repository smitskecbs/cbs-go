-- CBS-GO: game_profiles avatar/profile UPDATE policy (run in Supabase SQL Editor if avatar save fails)
--
-- Symptom: "Profile update is blocked by permissions" / saveRemoteProfile RLS error 42501
-- Cause: SELECT/INSERT policies exist but UPDATE policy for auth.uid() = user_id is missing or too strict.
--
-- This does NOT change table schema — only RLS policies.

-- Inspect existing policies:
-- SELECT schemaname, tablename, policyname, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename = 'game_profiles'
-- ORDER BY policyname;

-- Allow authenticated users to update their own profile row (avatar, nickname, etc.)
-- DROP POLICY IF EXISTS "game_profiles_update_own" ON public.game_profiles;
-- CREATE POLICY "game_profiles_update_own"
-- ON public.game_profiles
-- FOR UPDATE
-- TO authenticated
-- USING (auth.uid() = user_id)
-- WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to insert their own profile row (onboarding)
-- DROP POLICY IF EXISTS "game_profiles_insert_own" ON public.game_profiles;
-- CREATE POLICY "game_profiles_insert_own"
-- ON public.game_profiles
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (auth.uid() = user_id);
