export type TeamMember = {
  id?: string
  name: string
  department: string
  position: string
  year?: string
  domain?: string
  photo?: string
  active?: boolean
}

export type ProgrammeOfficer = { id?: string; name: string; designation: string; description: string; photo?: string; active?: boolean }

export const departmentFilters = ['All', 'Computer', 'IT', 'ENTC', 'Mechanical', 'Electrical', 'AIDS', 'AIML', 'ECE'] as const

export const programmeOfficers: ProgrammeOfficer[] = [
  {
    name: 'Dr. Prof. Prakash Kene Sir',
    designation: 'Programme Officer / NSS leadership',
    description: 'Dedicated to planning and executing NSS initiatives.'
  },
  {
    name: 'Prof. Mrs. Ashwini A. Kokate Ma\'am',
    designation: 'Programme Officer / NSS leadership',
    description: 'Guides students in meaningful engagement with real-world social issues.'
  }
]

export const coreTeamMembers: TeamMember[] = [
  { name: 'Name to be updated', department: 'Computer', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'IT', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'ENTC', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'Mechanical', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'Electrical', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'AIDS', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'AIML', position: 'Core Team Member' },
  { name: 'Name to be updated', department: 'ECE', position: 'Core Team Member' }
]
