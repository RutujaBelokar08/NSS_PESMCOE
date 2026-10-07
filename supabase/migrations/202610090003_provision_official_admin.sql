insert into public.admin_profiles (user_id, username, active)
select u.id, lower(u.email), true
from auth.users u
where lower(u.email) = 'nss_pesmcoe@moderncoe.edu.in'
  and u.email_confirmed_at is not null
on conflict (user_id) do update
set username = excluded.username,
    active = true;
