-- =============================================================================
-- CBS-GO: friends_uid DELETE policy (run in Supabase SQL Editor if friend remove fails)
-- =============================================================================
-- Symptom: "Could not remove friend" / RLS blocked / delete count = 0
-- Cause: INSERT/SELECT/UPDATE policies exist but DELETE policy is missing.
--
-- This does NOT change table schema — only RLS policies.
-- =============================================================================

-- Preview existing policies
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'friends_uid'
ORDER BY policyname;

-- Recommended DELETE policy: either party may remove an accepted friendship
-- (Adjust policy name if you already have one — drop/replace manually.)
CREATE POLICY "friends_uid_delete_own_accepted"
ON public.friends_uid
FOR DELETE
TO authenticated
USING (
  status = 'accepted'
  AND (auth.uid() = a_user OR auth.uid() = b_user)
);

-- Optional: allow either party to cancel a pending request they sent or received
-- CREATE POLICY "friends_uid_delete_pending_own"
-- ON public.friends_uid
-- FOR DELETE
-- TO authenticated
-- USING (
--   status = 'pending'
--   AND (auth.uid() = a_user OR auth.uid() = b_user)
-- );
