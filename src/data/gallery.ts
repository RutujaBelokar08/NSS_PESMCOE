import { siteImages } from './images'

export type GalleryItem = {
  id: string
  title: string
  category: string
  image: string
  caption: string
}

export const galleryCategories = [
  'All',
  'Camps',
  'Blood Donation',
  'Tree Plantation',
  'Awareness',
  'Cleanliness',
  'Police Mitra',
  'Self Defence',
  'Cultural',
  'Village Activities',
  'Achievements',
  'Fort Conservation',
  'School Outreach'
] as const

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Community Volunteer Group',
    category: 'Camps',
    image: siteImages.gallery.camp,
    caption: 'NSS volunteers at a winter camp service project in the hills.'
  },
  {
    id: 'g2',
    title: 'Blood Donation Drive',
    category: 'Blood Donation',
    image: siteImages.gallery.bloodDonation,
    caption: 'A PESMCOE volunteer donating blood with the support of medical staff.'
  },
  {
    id: 'g3',
    title: 'Tree Plantation',
    category: 'Tree Plantation',
    image: siteImages.gallery.treePlantation,
    caption: 'Students plant saplings during an environmental field activity.'
  },
  {
    id: 'g4',
    title: 'Street Awareness Program',
    category: 'Awareness',
    image: siteImages.gallery.awareness,
    caption: 'NSS volunteers gather at Kalakar Katta for a public awareness activity.'
  },
  {
    id: 'g5',
    title: 'Cleanliness Initiative',
    category: 'Cleanliness',
    image: siteImages.gallery.cleanliness,
    caption: 'Volunteers collect waste during a campus cleanliness drive.'
  },
  {
    id: 'g6',
    title: 'Festival Volunteer Support',
    category: 'Police Mitra',
    image: siteImages.gallery.policeMitra,
    caption: 'An NSS volunteer supports crowd movement during a Ganesh festival.'
  },
  {
    id: 'g7',
    title: 'Self Defence Training',
    category: 'Self Defence',
    image: siteImages.gallery.selfDefence,
    caption: 'School students take part in a self-defence and confidence session.'
  },
  {
    id: 'g8',
    title: 'Cultural Evening',
    category: 'Cultural',
    image: siteImages.gallery.cultural,
    caption: 'Volunteers gather for an NSS cultural evening.'
  },
  {
    id: 'g9',
    title: 'Village Development Activity',
    category: 'Village Activities',
    image: siteImages.gallery.village,
    caption: 'NSS volunteers visit a local learning centre during community outreach.'
  },
  {
    id: 'g10',
    title: 'Recognition and Achievement',
    category: 'Achievements',
    image: siteImages.gallery.achievement,
    caption: 'NSS and college representatives receive recognition for a blood donation drive.'
  },
  {
    id: 'g11',
    title: 'Fort Clean-Up',
    category: 'Fort Conservation',
    image: siteImages.gallery.fortConservation,
    caption: 'Volunteers collect litter along a Sinhagad hillside trail.'
  },
  {
    id: 'g12',
    title: 'Winter Camp Community Meeting',
    category: 'Camps',
    image: siteImages.camp.communityMeeting,
    caption: 'Students and local residents meet during the special winter camp.'
  },
  {
    id: 'g13',
    title: 'Learning Through Outreach',
    category: 'School Outreach',
    image: siteImages.gallery.schoolOutreach,
    caption: 'Children share drawings made during a community learning activity.'
  },
  {
    id: 'g14',
    title: 'Community Clean-Up',
    category: 'Cleanliness',
    image: siteImages.activities.communityCleanUp,
    caption: 'Volunteers clear leaves and debris from a shared public space.'
  },
  {
    id: 'g15',
    title: 'NSS PESMCOE Volunteers',
    category: 'Achievements',
    image: siteImages.activities.nssDay,
    caption: 'Students come together at PESMCOE for an NSS gathering.'
  },
  {
    id: 'g16',
    title: 'Winter Camp in the Community',
    category: 'Village Activities',
    image: siteImages.camp.winterCamp,
    caption: 'NSS volunteers and residents meet in the adopted community.'
  }
]
