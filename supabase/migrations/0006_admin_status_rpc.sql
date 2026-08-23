-- Applied via Supabase MCP, 2026-08-23. See DEVELOPMENT_LOG.md's Phase 8
-- entry for the full rationale and live test transcript.
--
-- Spec §25.1 gives Admins suspend/ban but not role changes, while the
-- existing RLS policy (0004) locks BOTH role and status to owner-only —
-- safe, but stricter than the spec intends for status. Rather than
-- widen the UPDATE policy's WITH CHECK (risk of re-introducing the same
-- class of OR-combination leak fixed in 0004), this uses a
-- SECURITY DEFINER function with its own explicit authorization check —
-- needs no SUPABASE_SERVICE_ROLE_KEY (not available to this build).
create or replace function admin_set_user_status(target_id uuid, new_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_role text;
  target_role text;
begin
  select role into actor_role from profiles where id = auth.uid();
  if actor_role is null or actor_role not in ('admin','owner') then
    raise exception 'insufficient privilege';
  end if;
  if new_status not in ('active','suspended','banned') then
    raise exception 'invalid status';
  end if;

  select role into target_role from profiles where id = target_id;
  if target_role = 'owner' and actor_role <> 'owner' then
    raise exception 'cannot modify an owner';
  end if;

  update profiles set status = new_status where id = target_id;

  insert into admin_audit_log (actor_id, action, target_type, target_id, detail)
  values (auth.uid(), 'set_status', 'user', target_id, jsonb_build_object('new_status', new_status));
end;
$$;

revoke all on function admin_set_user_status(uuid, text) from public;
grant execute on function admin_set_user_status(uuid, text) to authenticated;

-- Supabase grants EXECUTE to anon/authenticated/service_role directly at
-- create time (separate from the PUBLIC pseudo-role), so the blanket
-- `revoke ... from public` above didn't remove anon's access — caught
-- by get_advisors, fixed here explicitly.
revoke execute on function admin_set_user_status(uuid, text) from anon;

-- Note: get_advisors still (correctly, expectedly) flags this function
-- as callable by `authenticated` — that's intentional; the function's
-- own body is the authorization boundary for who among authenticated
-- users may actually use it. Live-tested: a regular user is rejected, an
-- admin can suspend/ban a regular user, an admin cannot touch an owner,
-- an owner can touch anyone, and every successful call writes an
-- admin_audit_log row.
