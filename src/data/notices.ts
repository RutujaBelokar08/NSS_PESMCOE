export type NoticeItem = {
  id: string
  title: string
  date: string
  summary: string
  important?: boolean
  attachmentUrl?: string
  link?: string
  published?: boolean
}

export const notices: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'Volunteer Registration',
    date: 'Official notice',
    summary: 'Interested students are encouraged to contact the NSS unit for upcoming service opportunities and student participation details.'
  },
  {
    id: 'notice-2',
    title: 'Winter Camp Planning',
    date: 'Official notice',
    summary: 'The NSS unit prepares for the annual winter camp with village development, community engagement and student volunteering activities.'
  },
  {
    id: 'notice-3',
    title: 'Awareness Drive Coordination',
    date: 'Official notice',
    summary: 'Health, hygiene and social awareness activities are planned in coordination with campus and community outreach initiatives.'
  }
]
