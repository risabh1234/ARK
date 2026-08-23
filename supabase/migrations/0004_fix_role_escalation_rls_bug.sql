-- Applied via Supabase MCP, 2026-08-23, immediately after live-testing
-- the RLS policies from 0002 against the real project (simulating
-- request.jwt.claims + SET ROLE authenticated/anon in raw SQL, since
-- this environment's network sandbox blocks direct HTTPS to Supabase's
-- API — see DEVELOPMENT_LOG.md for the full test transcript).
--
-- Bug found: "Only owners can change role or status" used
-- WITH CHECK (true). Postgres OR-combines WITH CHECK clauses across ALL
-- permissive policies for a command, regardless of which policy's USING
-- clause actually matched the row — so that unconditional `true` leaked
-- through "Users manage their own profile"'s otherwise-correct
-- role/status lock and let ANY authenticated user change ANY profile's
-- role or status. Verified: before this fix, a freshly-signed-up test
-- user could successfully UPDATE their own role to 'owner'. After the
-- fix, re-tested clean: self-promotion raises a policy-violation error,
-- cross-user role changes silently affect 0 rows, non-role field edits
-- (bio) still work, and article/comment ownership + draft-visibility +
-- impersonation checks all behave correctly.
drop policy "Only owners can change role or status" on profiles;

create policy "Only owners can change role or status"
  on profiles for update
  using ((select role from profiles where id = auth.uid()) = 'owner')
  with check ((select role from profiles where id = auth.uid()) = 'owner');
