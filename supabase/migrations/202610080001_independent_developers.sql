-- Developer profiles are global website credits, independent of academic sessions.
alter table public.cms_records
  drop constraint if exists cms_records_collection_check;

alter table public.cms_records
  add constraint cms_records_collection_check
  check (collection in ('team','developers','officers','domains','activities','notices','events','achievements','albums','gallery','stats'));

alter table public.cms_records
  alter column session_id drop not null;

drop policy if exists records_public_read on public.cms_records;
create policy records_public_read on public.cms_records
  for select to anon, authenticated
  using (
    published
    and active
    and (
      (collection = 'developers' and session_id is null)
      or exists (
        select 1
        from public.academic_sessions s
        where s.id = cms_records.session_id
          and s.is_current
          and s.active
      )
    )
  );

create unique index if not exists cms_records_one_primary_developer
  on public.cms_records ((data->>'primary'))
  where collection = 'developers' and data->>'primary' = 'true';

insert into public.cms_records (collection, session_id, data, position, published, active)
select
  'developers',
  null,
  '{"name":"Rutuja Belokar","role":"Website Developer & Digital Management","department":"B.Tech Information Technology","institution":"P.E.S. Modern College of Engineering, Pune","description":"Designed and developed the NSS PESMCOE website, including its content management system, digital content organization, and website maintenance.","linkedin":"https://www.linkedin.com/in/rutuja-belokar","github":"https://github.com/RutujaBelokar08","active":true,"primary":true}'::jsonb,
  0,
  true,
  true
where not exists (
  select 1 from public.cms_records
  where collection = 'developers' and data->>'primary' = 'true'
);

create or replace function public.protect_primary_developer()
returns trigger language plpgsql set search_path = '' as $$
begin
  if tg_op = 'DELETE' then
    if old.collection = 'developers' and old.data->>'primary' = 'true' then
      raise exception 'The primary developer record is protected and cannot be deleted';
    end if;
    return old;
  end if;

  if tg_op = 'UPDATE' then
    if old.collection = 'developers' and old.data->>'primary' = 'true' then
      if new.collection <> 'developers'
        or new.data->>'name' is distinct from 'Rutuja Belokar'
        or new.data->>'primary' is distinct from 'true'
        or new.session_id is not null
        or not new.active
        or not new.published then
        raise exception 'The primary developer identity and active status are protected';
      end if;
    elsif new.collection = 'developers' and new.data->>'name' = 'Rutuja Belokar' then
      raise exception 'The primary developer identity cannot be replaced';
    end if;
  elsif new.collection = 'developers' and new.data->>'name' = 'Rutuja Belokar' then
    raise exception 'The primary developer identity cannot be replaced';
  end if;

  return new;
end;
$$;

drop trigger if exists cms_records_protect_primary_developer on public.cms_records;
create trigger cms_records_protect_primary_developer
before insert or update or delete on public.cms_records
for each row execute function public.protect_primary_developer();
