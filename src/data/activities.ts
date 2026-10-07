import { siteImages } from './images'

export type ActivityItem = {
  id: string
  name: string
  description: string
  location: string
  category: string
  date: string
  image: string
  photos?: string[]
  published?: boolean
}

export const activityCategories = [
  'Blood Donation',
  'Tree Plantation',
  'Police Mitra',
  'Awareness Drives',
  'Cleanliness Drives',
  'Fort Conservation',
  'Community Service',
  'Yoga Day',
  'Self Defence',
  'Road Safety',
  'NSS Day',
  'Health Awareness',
  'Cultural Programs',
  'Village Development'
]

export const activities: ActivityItem[] = [
  {
    id: 'blood-donation-camp',
    name: 'Blood Donation Camp',
    description: 'Held at PES MCOE in association with KEM Hospital, Pune.',
    location: 'PES MCOE, Pune',
    category: 'Blood Donation',
    date: '2024',
    image: siteImages.bloodDonation
  },
  {
    id: 'police-mitra',
    name: 'Police Mitra',
    description: 'Volunteer support and community engagement during public festival activities in Pune.',
    location: 'Manacha Chautha, Tulshibaug Ganpati',
    category: 'Police Mitra',
    date: '2024',
    image: siteImages.policeMitra
  },
  {
    id: 'tree-plantation',
    name: 'Tree Plantation',
    description: 'Tree plantation activity in a village outside Pune to support environmental awareness.',
    location: 'Village outside Pune',
    category: 'Tree Plantation',
    date: '2024',
    image: siteImages.treePlantation
  },
  {
    id: 'awareness-drives',
    name: 'Awareness Drives',
    description: 'Street play performances and awareness campaigns on social issues at Kalakar-katta and JM Road.',
    location: 'Kalakar-katta, JM Road',
    category: 'Awareness Drives',
    date: '2023',
    image: siteImages.awareness
  },
  {
    id: 'fort-conservation',
    name: 'Fort Conservation Drive',
    description: 'Fort conservation and cleanliness drive focused on preserving heritage and public spaces.',
    location: 'Sinhgad Fort',
    category: 'Fort Conservation',
    date: '2023',
    image: siteImages.sinhgad
  },
  {
    id: 'community-meal-service',
    name: 'Community Meal Service',
    description: 'Volunteers prepare food as part of a community service activity.',
    location: 'Pune',
    category: 'Community Service',
    date: '2025',
    image: siteImages.activities.communityMeal
  },
  {
    id: 'cleanliness-drive',
    name: 'Chaturshrungi Mandir Cleanliness Drive',
    description: 'Cleanliness drive conducted after the Navratri festival to maintain sacred spaces and public hygiene.',
    location: 'Chaturshrungi Mandir',
    category: 'Cleanliness Drives',
    date: '2024',
    image: siteImages.activities.cleanliness
  },
  {
    id: 'yoga-day',
    name: 'Yoga Day',
    description: 'Yoga Day celebration for Varkaris to promote wellness, discipline and mindfulness.',
    location: 'Community gathering',
    category: 'Yoga Day',
    date: '2024',
    image: siteImages.activities.yogaDay
  },
  {
    id: 'village-learning-outreach',
    name: 'Village Learning Outreach',
    description: 'Student volunteers work with children through classroom learning and creative activities.',
    location: 'Community outreach',
    category: 'Village Development',
    date: '2025',
    image: siteImages.activities.schoolOutreach
  },
  {
    id: 'self-defence',
    name: 'Self Defence Training',
    description: 'Self-defence training camp held at PES MCOE for safety, confidence and awareness.',
    location: 'PES MCOE',
    category: 'Self Defence',
    date: '2024',
    image: siteImages.selfDefence
  },
  {
    id: 'road-safety-rally',
    name: 'Road Safety Rally',
    description: 'Road safety awareness rally conducted near Bal Gandharva to promote responsible public behavior.',
    location: 'Near Bal Gandharva',
    category: 'Road Safety',
    date: '2024',
    image: siteImages.activities.roadSafety
  },
  {
    id: 'nss-day',
    name: 'NSS Day Activity',
    description: 'Activity conducted at PES MCOE on 24 September to celebrate NSS values and service.',
    location: 'PES MCOE',
    category: 'NSS Day',
    date: '24 September',
    image: siteImages.activities.nssDay
  }
]

export const featuredActivities = activities.slice(0, 4)
