export type EventItem = {
  id: string
  title: string
  date: string
  time: string
  venue: string
  description: string
  registrationUrl: string
  status?: 'upcoming' | 'completed' | 'cancelled'
  image?: string
}

export const events: EventItem[] = [
  {
    id: 'event-1',
    title: 'NSS Orientation Session',
    date: 'TBA',
    time: 'To be announced',
    venue: 'PES MCOE campus / official noticeboard',
    description: 'An introductory session for interested students to learn about NSS responsibilities, opportunities and service activities.',
    registrationUrl: ''
  },
  {
    id: 'event-2',
    title: 'Blood Donation Camp',
    date: 'TBA',
    time: 'To be announced',
    venue: 'Campus outreach area',
    description: 'A campus blood donation drive for public health support and volunteer participation.',
    registrationUrl: ''
  },
  {
    id: 'event-3',
    title: 'Tree Plantation Drive',
    date: 'TBA',
    time: 'To be announced',
    venue: 'College / nearby community site',
    description: 'A volunteer-led environmental initiative dedicated to sustainability, stewardship and community action.',
    registrationUrl: ''
  }
]
