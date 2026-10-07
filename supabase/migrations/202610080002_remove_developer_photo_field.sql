-- Remove the retired developer-only photo value without touching team photos.
update public.cms_records
set data = data - 'photo', updated_at = now()
where collection = 'developers'
  and data ? 'photo';
