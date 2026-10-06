-- Every CMS record belongs to an academic session. Keep historical rows in
-- place, but expose only published, active rows from the single current,
-- active session to public visitors.
alter table public.cms_records
  alter column session_id set not null;

drop policy if exists records_public_read on public.cms_records;
create policy records_public_read on public.cms_records
  for select to anon, authenticated
  using (
    published
    and active
    and exists (
      select 1
      from public.academic_sessions s
      where s.id = cms_records.session_id
        and s.is_current
        and s.active
    )
  );
