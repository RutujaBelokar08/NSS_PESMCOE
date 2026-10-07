const activityImages = {
  bloodDonation: '/images/activities/blood-donation.jpg',
  treePlantation: '/images/activities/tree-plantation.jpg',
  policeMitra: '/images/activities/police-mitra.jpg',
  awareness: '/images/activities/awareness.jpg',
  cleanliness: '/images/activities/cleanliness.jpg',
  fortConservation: '/images/activities/fort-conservation.jpg',
  communityMeal: '/images/activities/community-meal.jpg',
  yogaDay: '/images/activities/yoga-day.jpg',
  selfDefence: '/images/activities/self-defence.jpg',
  roadSafety: '/images/activities/road-safety.jpg',
  villageCommunity: '/images/activities/village-community.jpg',
  recognition: '/images/activities/recognition.jpg',
  schoolOutreach: '/images/activities/school-outreach.jpg',
  culturalEvening: '/images/activities/cultural-evening.jpg',
  nssDay: '/images/activities/nss-day.jpg',
  communityCleanUp: '/images/activities/community-clean-up.jpg'
} as const

export const siteImages = {
  hero: '/images/hero/nss-hero.jpg',
  nssLogo: '/images/logo/nss-logo.png',
  pesmcoeLogo: '/images/logo/pesmcoe-logo.png',
  bloodDonation: activityImages.bloodDonation,
  treePlantation: activityImages.treePlantation,
  winterCamp: '/images/camp/winter-camp-01.jpg',
  camp: {
    winterCamp: '/images/camp/winter-camp-01.jpg',
    communityMeeting: '/images/camp/winter-camp-02.jpg',
    forestation: '/images/camp/winter-camp-03.jpg'
  },
  policeMitra: activityImages.policeMitra,
  awareness: activityImages.awareness,
  sinhgad: activityImages.fortConservation,
  selfDefence: activityImages.selfDefence,
  activities: activityImages,
  gallery: {
    camp: '/images/camp/winter-camp-01.jpg',
    bloodDonation: activityImages.bloodDonation,
    treePlantation: activityImages.treePlantation,
    awareness: activityImages.awareness,
    cleanliness: activityImages.cleanliness,
    policeMitra: activityImages.policeMitra,
    selfDefence: activityImages.selfDefence,
    cultural: activityImages.culturalEvening,
    village: activityImages.villageCommunity,
    achievement: activityImages.recognition,
    fortConservation: activityImages.fortConservation,
    schoolOutreach: activityImages.schoolOutreach,
    communityCleanUp: activityImages.communityCleanUp,
    nssDay: activityImages.nssDay
  }
} as const
