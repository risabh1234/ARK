-- Applied to the dedicated "ark" Supabase project (project ref
-- qosdbcvdqtlcinetxdbh, ap-south-1) via the Supabase MCP tools,
-- 2026-08-23. Mirrored here per the existing convention of keeping
-- migrations in version control — this file is the record, not the
-- source of truth for what's live; re-run by hand if standing up
-- another environment.
--
-- Unlike 0001_init.sql (subscriber/order/commission_request — no RLS,
-- queried via the app's existing Drizzle connection), everything below
-- is RLS-protected and MUST be queried through Supabase's own
-- connection path (@supabase/supabase-js / @supabase/ssr), never
-- Drizzle — see TECHNICAL_DOCUMENTATION.md's stack table.

-- ĀRK — profiles, articles, comments, admin audit log.
-- Role lives on profiles from the start (spec §25.3), not bolted on later.

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  role text not null default 'user' check (role in ('user','moderator','admin','owner')),
  status text not null default 'active' check (status in ('active','suspended','banned')),
  deleted_at timestamptz,
  created_at timestamptz default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) not null,
  slug text unique not null,
  title text not null,
  cover_image_url text,
  body_richtext jsonb not null,
  body_html text,
  tag text check (tag in ('Sanskrit','Method','Field Notes')),
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references articles(id) on delete cascade not null,
  author_id uuid references profiles(id) not null,
  parent_comment_id uuid references comments(id) on delete cascade,
  body text not null,
  created_at timestamptz default now(),
  edited_at timestamptz
);

create index articles_status_published_idx on articles (status, published_at desc);
create index articles_author_idx on articles (author_id);
create index comments_article_idx on comments (article_id);
create index comments_author_idx on comments (author_id);
create index comments_parent_idx on comments (parent_comment_id);

create table admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) not null,
  action text not null,
  target_type text not null check (target_type in ('user','article','comment','setting')),
  target_id uuid,
  detail jsonb,
  created_at timestamptz default now()
);

create index admin_audit_log_actor_idx on admin_audit_log (actor_id);

-- Row-level security

alter table profiles enable row level security;

create policy "Profiles are publicly readable"
  on profiles for select using (true);

create policy "Users manage their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- role/status can't be self-changed through this policy — see the
    -- owner-only role policy below, which is the only path that can
    -- touch those two columns.
    and role = (select role from profiles p where p.id = auth.uid())
    and status = (select status from profiles p where p.id = auth.uid())
  );

create policy "Only owners can change role or status"
  on profiles for update
  using ((select role from profiles where id = auth.uid()) = 'owner')
  with check (true);

create policy "Users can create their own profile row"
  on profiles for insert
  with check (auth.uid() = id);

alter table articles enable row level security;

create policy "Published articles are public"
  on articles for select using (status = 'published');

create policy "Authors can see their own drafts"
  on articles for select using (auth.uid() = author_id);

create policy "Moderators and above can see everything"
  on articles for select
  using ((select role from profiles where id = auth.uid()) in ('moderator','admin','owner'));

create policy "Authors manage their own articles"
  on articles for all
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Moderators and above manage any article"
  on articles for all
  using ((select role from profiles where id = auth.uid()) in ('moderator','admin','owner'))
  with check ((select role from profiles where id = auth.uid()) in ('moderator','admin','owner'));

alter table comments enable row level security;

create policy "Comments are public to read"
  on comments for select using (true);

create policy "Signed-in users can comment"
  on comments for insert with check (auth.uid() = author_id);

create policy "Authors edit or delete their own comments"
  on comments for update using (auth.uid() = author_id);

create policy "Authors delete their own comments"
  on comments for delete using (auth.uid() = author_id);

create policy "Moderators and above manage any comment"
  on comments for all
  using ((select role from profiles where id = auth.uid()) in ('moderator','admin','owner'))
  with check ((select role from profiles where id = auth.uid()) in ('moderator','admin','owner'));

alter table admin_audit_log enable row level security;

create policy "Owners can read the audit log"
  on admin_audit_log for select
  using ((select role from profiles where id = auth.uid()) = 'owner');

-- No insert/update/delete policy for any client role — the audit log is
-- written only via the service-role key from server actions, and is
-- never editable or deletable by anyone, including Owners, through the
-- app layer.
