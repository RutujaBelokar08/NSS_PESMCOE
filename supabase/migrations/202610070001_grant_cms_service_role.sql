-- The SQLite importer and trusted server-side provisioning use the Supabase
-- secret key, which maps to service_role. Give that backend role the table
-- privileges required by the Data API; service_role already bypasses RLS.
-- Public anon/authenticated grants and policies are unchanged.
grant all privileges on table
  public.academic_sessions,
  public.admin_profiles,
  public.cms_records,
  public.site_settings
to service_role;

grant all privileges on table storage.objects to service_role;
