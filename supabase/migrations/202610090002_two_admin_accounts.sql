create or replace function public.is_nss_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admin_profiles p
    where p.user_id = (select auth.uid())
      and p.active
      and lower(coalesce((select auth.jwt())->>'email', '')) in (
        'nss_pesmcoe@moderncoe.edu.in',
        'rutujabelokar8@gmail.com'
      )
  );
$$;

create or replace function public.guard_admin_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
declare account_email text;
begin
  select lower(u.email) into account_email from auth.users u where u.id = new.user_id;
  if account_email in ('nss_pesmcoe@moderncoe.edu.in', 'rutujabelokar8@gmail.com') then
    new.username := account_email;
    return new;
  end if;
  if tg_op = 'UPDATE' and old.active and not new.active then return new; end if;
  raise exception 'Only the two authorized NSS administrator accounts may be active administrators.';
end;
$$;

drop function if exists public.finalize_official_admin_transfer();
drop table if exists public.nss_admin_control;
