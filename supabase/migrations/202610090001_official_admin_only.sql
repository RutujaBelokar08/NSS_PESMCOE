create table if not exists public.nss_admin_control (
  singleton boolean primary key default true check (singleton),
  official_admin_verified_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.nss_admin_control (singleton) values (true)
on conflict (singleton) do nothing;

alter table public.nss_admin_control enable row level security;
revoke all on public.nss_admin_control from public, anon, authenticated;
grant select, insert, update, delete on public.nss_admin_control to service_role;

create or replace function public.is_nss_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admin_profiles p
    where p.user_id = (select auth.uid()) and p.active
      and (
        lower(coalesce((select auth.jwt())->>'email', '')) = 'nss_pesmcoe@moderncoe.edu.in'
        or not exists (
          select 1 from public.nss_admin_control c
          where c.singleton and c.official_admin_verified_at is not null
        )
      )
  );
$$;

create or replace function public.guard_admin_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
declare account_email text;
begin
  select lower(u.email) into account_email from auth.users u where u.id = new.user_id;
  if account_email = 'nss_pesmcoe@moderncoe.edu.in' then
    new.username := 'nss_pesmcoe@moderncoe.edu.in';
    return new;
  end if;
  if tg_op = 'UPDATE' and old.active and not new.active then return new; end if;
  raise exception 'Only the official NSS account may be an administrator.';
end;
$$;

drop trigger if exists admin_profiles_official_account_only on public.admin_profiles;
create trigger admin_profiles_official_account_only
before insert or update on public.admin_profiles
for each row execute function public.guard_admin_profile();

create or replace function public.finalize_official_admin_transfer()
returns void language plpgsql security definer set search_path = '' as $$
declare official_user_id uuid;
begin
  select u.id into official_user_id
  from auth.users u join public.admin_profiles p on p.user_id = u.id and p.active
  where lower(u.email) = 'nss_pesmcoe@moderncoe.edu.in' limit 1;
  if official_user_id is null then
    raise exception 'The official NSS account must sign in before transfer can be finalized.';
  end if;
  update public.nss_admin_control
    set official_admin_verified_at = coalesce(official_admin_verified_at, now()), updated_at = now()
    where singleton;
  update public.admin_profiles set active = false where user_id <> official_user_id and active;
end;
$$;

revoke all on function public.finalize_official_admin_transfer() from public, anon, authenticated;
grant execute on function public.finalize_official_admin_transfer() to service_role;
