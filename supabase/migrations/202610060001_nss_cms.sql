create extension if not exists pgcrypto;

create table if not exists public.academic_sessions (
  id uuid primary key default gen_random_uuid(),
  label text not null unique check (label ~ '^[0-9]{4}-[0-9]{2}$'),
  is_current boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists academic_sessions_one_current
  on public.academic_sessions (is_current) where is_current;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_nss_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admin_profiles p
    where p.user_id = (select auth.uid()) and p.active
  );
$$;
revoke all on function public.is_nss_admin() from public;
grant execute on function public.is_nss_admin() to anon, authenticated;

create table if not exists public.cms_records (
  id text primary key default gen_random_uuid()::text,
  collection text not null check (collection in ('team','officers','domains','activities','notices','events','achievements','albums','gallery','stats')),
  session_id uuid references public.academic_sessions(id) on delete set null,
  data jsonb not null default '{}'::jsonb,
  position integer not null default 0,
  published boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cms_records_public_lookup on public.cms_records(collection, session_id, position);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_current_academic_session(p_session_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if not public.is_nss_admin() then raise exception 'Administrator access required'; end if;
  perform 1 from public.academic_sessions where id = p_session_id and active for update;
  if not found then raise exception 'Academic session not found or inactive'; end if;
  update public.academic_sessions set is_current = false where is_current;
  update public.academic_sessions set is_current = true where id = p_session_id;
end;
$$;

alter table public.academic_sessions enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.cms_records enable row level security;
alter table public.site_settings enable row level security;

grant select on public.academic_sessions, public.cms_records, public.site_settings to anon, authenticated;
grant insert, update, delete on public.academic_sessions, public.cms_records, public.site_settings to authenticated;
grant select on public.admin_profiles to authenticated;
grant execute on function public.set_current_academic_session(uuid) to authenticated;
revoke all on function public.set_current_academic_session(uuid) from public, anon;

create policy sessions_public_read on public.academic_sessions for select to anon, authenticated using (active or public.is_nss_admin());
create policy sessions_admin_write on public.academic_sessions for all to authenticated using (public.is_nss_admin()) with check (public.is_nss_admin());
create policy profiles_read_self_or_admin on public.admin_profiles for select to authenticated using (user_id = (select auth.uid()) or public.is_nss_admin());
create policy records_public_read on public.cms_records for select to anon, authenticated
  using (published and active and (session_id is null or exists (select 1 from public.academic_sessions s where s.id = session_id and s.is_current)));
create policy records_admin_read on public.cms_records for select to authenticated using (public.is_nss_admin());
create policy records_admin_insert on public.cms_records for insert to authenticated with check (public.is_nss_admin());
create policy records_admin_update on public.cms_records for update to authenticated using (public.is_nss_admin()) with check (public.is_nss_admin());
create policy records_admin_delete on public.cms_records for delete to authenticated using (public.is_nss_admin());
create policy settings_public_read on public.site_settings for select to anon, authenticated using (key in ('about','contact','branding'));
create policy settings_admin_write on public.site_settings for all to authenticated using (public.is_nss_admin()) with check (public.is_nss_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('nss-cms', 'nss-cms', true, 15728640, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy nss_assets_public_read on storage.objects for select to anon, authenticated using (bucket_id = 'nss-cms');
create policy nss_assets_admin_insert on storage.objects for insert to authenticated with check (bucket_id = 'nss-cms' and public.is_nss_admin());
create policy nss_assets_admin_update on storage.objects for update to authenticated using (bucket_id = 'nss-cms' and public.is_nss_admin()) with check (bucket_id = 'nss-cms' and public.is_nss_admin());
create policy nss_assets_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'nss-cms' and public.is_nss_admin());
