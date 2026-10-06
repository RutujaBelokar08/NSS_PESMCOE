-- Join page content is a public, site-wide setting rather than session content.
drop policy if exists settings_public_read on public.site_settings;
create policy settings_public_read on public.site_settings
  for select to anon, authenticated
  using (key in ('about', 'contact', 'branding', 'join'));

-- Seed the existing public Join NSS copy so the page keeps its current content
-- after switching from static text to CMS values. Preserve any prior edits.
insert into public.site_settings (key, value)
values (
  'join',
  jsonb_build_object(
    'title', 'Become a volunteer for meaningful community action',
    'description', 'NSS offers a platform for students to contribute to society while developing leadership, empathy and responsibility.',
    'eligibility', 'Interested students are encouraged to participate and engage with NSS activities, subject to the guidelines shared by the college unit and programme officers.',
    'benefits', jsonb_build_array(
      'Participate in community projects and outreach programs.',
      'Develop leadership, teamwork and compassion.',
      'Be involved in awareness, environmental and social initiatives.'
    ),
    'steps', jsonb_build_array(
      'Contact the NSS unit or programme officer for current opportunities.',
      'Attend orientation and campus announcements for volunteering updates.',
      'Register interest and participate in upcoming NSS activities.'
    ),
    'activities', jsonb_build_array(
      'Blood donation drives',
      'Tree plantation',
      'Health and hygiene awareness',
      'Cleaning campaigns',
      'Village development',
      'Cultural programs',
      'Self-defence and safety awareness'
    ),
    'registrationUrl', '',
    'instructions', '',
    'contactInformation', '',
    'ctaText', 'Contact the NSS Unit',
    'ctaUrl', '/contact'
  )
)
on conflict (key) do nothing;
