-- Applied via Supabase MCP, 2026-08-23. See 0002_auth_articles_admin.sql
-- header note — mirrored for version control, not the source of truth.

insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true),
       ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Public read — article covers"
  on storage.objects for select
  using (bucket_id = 'article-covers');

create policy "Authenticated upload — article covers"
  on storage.objects for insert
  with check (bucket_id = 'article-covers' and auth.role() = 'authenticated');

create policy "Owner manages their own article cover uploads"
  on storage.objects for update
  using (bucket_id = 'article-covers' and auth.uid() = owner)
  with check (bucket_id = 'article-covers' and auth.uid() = owner);

create policy "Owner deletes their own article cover uploads"
  on storage.objects for delete
  using (bucket_id = 'article-covers' and auth.uid() = owner);

create policy "Public read — avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Authenticated upload — avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "Owner manages their own avatar uploads"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid() = owner)
  with check (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Owner deletes their own avatar uploads"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid() = owner);
