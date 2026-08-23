-- Applied via Supabase MCP, 2026-08-23. See DEVELOPMENT_LOG.md's Phase 8
-- entry: SUPABASE_SERVICE_ROLE_KEY is not available to the app in this
-- build (the provisioning tooling deliberately doesn't expose it), so
-- admin actions write the audit log through the actor's own
-- authenticated session rather than a service-role bypass. This policy
-- lets a privileged actor insert an audit row only for themselves as
-- actor_id — no UPDATE/DELETE policy exists on this table for anyone
-- (append-only, unchanged from 0002). Live-tested: a 'user'-role actor
-- is blocked, a moderator can log their own actions, a moderator cannot
-- spoof actor_id to someone else.
create policy "Privileged actors can log their own actions"
  on admin_audit_log for insert
  with check (
    actor_id = auth.uid()
    and (select role from profiles where id = auth.uid()) in ('moderator','admin','owner')
  );
