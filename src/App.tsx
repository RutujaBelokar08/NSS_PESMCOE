import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, MapPin, Sparkles } from 'lucide-react'
import { Link, Route, Routes } from 'react-router-dom'
import { AchievementCard } from './components/AchievementCard'
import { Footer } from './components/Footer'
import { GalleryGrid } from './components/GalleryGrid'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'
import { activities } from './data/activities'
import { achievements } from './data/achievements'
import { isSafeCmsHref, isSafeWebUrl, parseSocialEntries } from './data/siteSettings'
import { events } from './data/events'
import { siteImages } from './data/images'
import { notices } from './data/notices'
import { stats } from './data/stats'
import { coreTeamMembers, departmentFilters, programmeOfficers } from './data/team'
import { useCms } from './data/CmsContext'
import { AdminDashboard, AdminLogin, AdminSetup } from './components/Admin'

const aboutPillars = [
  'Community Service',
  'Leadership',
  'Teamwork',
  'Empathy',
  'Social Responsibility',
  'Personal Growth'
]

const winterCampActivities = [
  'Village Infrastructure Development',
  'Education Workshops',
  'Health Awareness',
  'Sustainability Activities',
  'Cleaning Drives',
  'Eye Checkup Drive',
  'Self Defence Classes for School Girls',
  'Drawing Competition',
  'Kirtan',
  'Street Plays',
  'Cultural Program',
  'Women Empowerment Awareness',
  'Environmental Awareness'
]

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="institutional-shell min-h-screen text-slate-800">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

function HomePage() {
  const { site } = useCms()
  const aboutContent = site?.settings?.about || {}
  const featured = activities.slice(0, 4)
  return (
    <>
      <Hero />

      <main className="overflow-x-hidden">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="border border-[rgba(23,28,34,0.08)] bg-[#f9f5f2]">
            <div className="grid gap-0 divide-y divide-[rgba(23,28,34,0.08)] md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-8 sm:px-8">
                  <div className="text-3xl font-black tracking-[-0.06em] text-[#b11d2e] sm:text-5xl">{stat.value}</div>
                  <div className="mt-3 text-base font-semibold text-[#171c22]">{stat.label}</div>
                  <p className="mt-2 text-sm leading-6 text-[#5f5c59]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About NSS"
                title="Service rooted in responsibility."
                description={aboutContent.description || 'NSS at PES Modern College of Engineering brings students into direct contact with real community needs through volunteerism, leadership and civic action.'}
              />

              <div className="space-y-4 editorial-copy">
                <p>
                  The National Service Scheme creates a practical space for students to contribute to society while learning to lead with empathy, discipline and accountability.
                </p>
                <p>
                  Through blood donation camps, environmental initiatives, awareness drives and village engagement, volunteers work toward a more responsive and inclusive campus culture.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {(aboutContent.pillars || aboutPillars).map((pillar: string) => (
                  <span key={pillar} className="border border-[rgba(23,28,34,0.12)] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#171c22]">
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-[rgba(23,28,34,0.08)] bg-[#f8f4f1] p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="photo-slot h-[440px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${siteImages.winterCamp})` }} />
              <div className="grid border-t border-[rgba(23,28,34,0.08)] md:grid-cols-2">
                <div className="border-b border-[rgba(23,28,34,0.08)] p-6 md:border-b-0 md:border-r">
                  <p className="editorial-kicker">Motto</p>
                  <h3 className="text-2xl font-black text-[#171c22]">{aboutContent.motto || 'Not Me, But You'}</h3>
                </div>
                <div className="p-6">
                  <p className="editorial-kicker">NSS Day</p>
                  <h3 className="text-2xl font-black text-[#171c22]">{aboutContent.nssDay || '24 September'}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f3ee] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured activity"
              title="Community service made visible."
              description="From blood donation and environmental care to awareness building and student leadership, NSS creates impact that is immediate, practical and deeply local."
            />

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="border border-[rgba(23,28,34,0.08)] bg-white shadow-[0_22px_45px_rgba(15,23,42,0.04)]">
                <div className="photo-slot h-[360px] w-full bg-cover bg-center" style={{ backgroundImage: featured[0]?.image ? `url(${featured[0].image})` : undefined }} />
                <div className="p-6 sm:p-8">
                  <p className="editorial-kicker">{featured[0]?.category || 'Activities'}</p>
                  <h3 className="text-3xl font-black text-[#171c22]">{featured[0]?.name || 'Activities will be announced'}</h3>
                  <p className="mt-4 max-w-xl editorial-copy">{featured[0]?.description || 'New NSS activities will appear here when published.'}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#5f5c59]">
                    {featured[0]?.location && <span className="inline-flex items-center gap-2"><MapPin size={16} /> {featured[0].location}</span>}
                    {featured[0]?.date && <span className="inline-flex items-center gap-2"><BookOpen size={16} /> {featured[0].date}</span>}
                  </div>
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {featured.slice(1).map((activity) => (
                  <article key={activity.id} className="border border-[rgba(23,28,34,0.08)] bg-white shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
                    <div className="photo-slot h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
                    <div className="p-4">
                      <p className="editorial-kicker">{activity.category}</p>
                      <h3 className="text-xl font-bold text-[#171c22]">{activity.name}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Annual Winter Camp"
                title="A 7-day journey of learning, service and community development."
                description="The annual camp brings students into sustained engagement with village life, public awareness and social initiatives that create lasting local impact."
              />

              <ul className="mt-6 grid gap-3 text-sm font-medium text-[#171c22] sm:grid-cols-2">
                {winterCampActivities.map((item) => (
                  <li key={item} className="border-l-2 border-[#b11d2e] bg-[#f8f4f1] p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[rgba(23,28,34,0.08)] bg-[#f9f5f2] p-3 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
              <div className="photo-slot h-[500px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${siteImages.winterCamp})` }} />
            </div>
          </div>
        </section>

        <section className="bg-[#171c22] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="editorial-kicker text-[#e7a9b3]">Team</p>
              <h2 className="editorial-subheading text-white">Leadership that guides service.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {programmeOfficers.map((person) => (
                <div key={person.name} className="border border-[#2e363d] bg-white/5 p-6">
                  {person.photo ? <img src={person.photo} alt={person.name} className="mb-4 h-14 w-14 object-cover"/> : <div className="mb-4 flex h-14 w-14 items-center justify-center bg-[#b11d2e] text-lg font-black text-white">{person.name.charAt(0)}</div>}
                  <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e3a6b0]">{person.designation}</p>
                  <p className="mt-4 editorial-copy text-[#d5d0cb]">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Achievements" title="Impact that speaks for itself." description="A record of student action across public health, environmental stewardship and community-led development." />

            <div className="space-y-5">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="grid gap-4 border-t border-[rgba(23,28,34,0.08)] py-5 md:grid-cols-[120px_1fr] md:items-start">
                  <div className="text-3xl font-black tracking-[-0.06em] text-[#b11d2e]">{achievement.title.split(' ')[0]}</div>
                  <div className="md:pl-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5f5c59]">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                    <h3 className="mt-2 text-2xl font-black text-[#171c22]">{achievement.title}</h3>
                    <p className="mt-3 max-w-2xl editorial-copy">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Gallery" title="A visual record of campus service." description="Moments from awareness campaigns, field work, village engagement and volunteer-led action across the year." />
          <GalleryGrid />
        </section>

        <section className="bg-[#f4efe8] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="editorial-kicker">Join NSS</p>
                <h2 className="editorial-subheading">Serve. Learn. Lead.</h2>
              </div>
              <Link to="/join" className="inline-flex items-center justify-center border border-[#b11d2e] bg-[#b11d2e] px-5 py-3 text-sm font-semibold text-white">Join NSS</Link>
            </div>

            <div className="mt-8 border border-[rgba(23,28,34,0.08)] bg-white p-3 shadow-[0_18px_38px_rgba(15,23,42,0.04)]">
              <div className="photo-slot h-[260px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${siteImages.hero})` }} />
            </div>
            <p className="mt-6 max-w-3xl editorial-copy">
              Take part in community service, camps and social initiatives with NSS PESMCOE. Students contribute through practical service, collective responsibility and leadership development.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Upcoming events" title="Official engagement opportunities." description="Announcements, orientations and volunteering opportunities are shared through campus communication and official noticeboards." />
              <div className="space-y-5">
                {events.map((event) => (
                  <div key={event.id} className="grid gap-3 border-t border-[rgba(23,28,34,0.08)] py-5 md:grid-cols-[80px_1fr]">
                    <div className="text-xl font-black tracking-[-0.04em] text-[#b11d2e]">{event.date}</div>
                    <div>
                      <h3 className="text-2xl font-black text-[#171c22]">{event.title}</h3>
                      <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-red-700">{event.status || 'upcoming'}</span>
                      <p className="mt-2 text-sm text-[#5f5c59]">{event.time}</p>
                      <p className="mt-1 text-sm text-[#5f5c59]">{event.venue}</p>
                      <p className="mt-3 editorial-copy">{event.description}</p>
                      {event.registrationUrl && <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-red-700">Event registration →</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Notices" title="Official notices." description="Current information from the NSS unit and campus communication channels." />
              <div className="border border-[rgba(23,28,34,0.08)] bg-[#f9f5f2] p-4 sm:p-6">
                {notices.map((notice) => (
                  <div key={notice.id} className="border-b border-[rgba(23,28,34,0.08)] py-5 last:border-b-0 first:pt-0">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b11d2e]">{notice.important ? 'Important notice' : 'Notice'}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5f5c59]">{notice.date}</span>
                    </div>
                    <h4 className="mt-3 text-xl font-bold text-[#171c22]">{notice.title}</h4>
                    <p className="mt-3 editorial-copy">{notice.summary}</p>
                    {(notice.attachmentUrl || notice.link) && <a href={notice.attachmentUrl || notice.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-red-700">{notice.attachmentUrl ? 'Open attachment' : 'More information'} →</a>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DeveloperSection />
      </main>
    </>
  )
}

function DeveloperSection() {
  const { site } = useCms()
  const cmsDevelopers = (site?.collections?.developers || []).filter((member: any) => member.active !== false)
  const rutuja = cmsDevelopers.find((member: any) => member.primary === true || member.name === 'Rutuja Belokar')
  const rutujaDefaults = {
        role: 'Website Developer & Digital Management',
        department: 'B.Tech Information Technology',
        institution: 'P.E.S. Modern College of Engineering, Pune',
        description: 'Designed and developed the NSS PESMCOE website, including its content management system, digital content organization, and website maintenance.',
        linkedin: 'https://www.linkedin.com/in/rutuja-belokar',
        github: 'https://github.com/RutujaBelokar08'
      }
  const developers = [{
        ...rutujaDefaults,
        ...(rutuja || {}),
        name: 'Rutuja Belokar'
      }, ...cmsDevelopers.filter((member: any) => member !== rutuja && member.primary !== true && member.name !== 'Rutuja Belokar')]

  return (
    <section id="developers" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="border-t border-[rgba(23,28,34,0.1)] pt-10">
        <p className="editorial-kicker">Website credits</p>
        <h2 className="editorial-subheading">MEET THE DEVELOPERS</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f5c59]">Built with dedication to support NSS PESMCOE’s digital presence.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {developers.map((developer: any, index: number) => (
            <article key={developer.id || developer.name || index} className="flex min-w-0 flex-col border border-[rgba(23,28,34,0.1)] bg-[#f9f5f2] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="min-w-0">
                  <h3 className="break-words text-xl font-bold text-[#171c22]">{developer.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#b11d2e]">{developer.role || developer.position}</p>
                </div>
                <div className="ml-auto flex shrink-0 gap-2">
                  {developer.linkedin && <a href={developer.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn profile of ${developer.name}`} className="flex h-9 w-9 items-center justify-center border border-[#d6cec7] text-[#171c22] transition-colors hover:border-[#b11d2e] hover:text-[#b11d2e]"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" /></svg></a>}
                  {developer.github && <a href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub profile of ${developer.name}`} className="flex h-9 w-9 items-center justify-center border border-[#d6cec7] text-[#171c22] transition-colors hover:border-[#b11d2e] hover:text-[#b11d2e]"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.91.1-.71.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.24-5.08 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg></a>}
                </div>
              </div>
              {developer.department && <p className="mt-3 text-sm text-[#5f5c59]">{developer.department}</p>}
              {developer.institution && <p className="mt-1 text-sm text-[#5f5c59]">{developer.institution}</p>}
              {developer.description && <p className="mt-4 text-sm leading-6 text-[#5f5c59]">{developer.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  const { site } = useCms()
  const aboutContent = site?.settings?.about || {}
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="About NSS" title="What is NSS?" description="The National Service Scheme (NSS) is a government initiative designed to promote community service and social responsibility among students. Through NSS, students engage in meaningful activities that benefit society and contribute to their personal growth." />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {(aboutContent.pillars || aboutPillars).map((pillar: string) => (
          <div key={pillar} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{pillar}</h3>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-red-50 to-orange-50 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">Motto</p>
          <h3 className="mt-4 text-4xl font-black text-slate-900">{aboutContent.motto || 'Not Me, But You'}</h3>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The motto reflects selfless service and prioritizing the welfare of others. NSS encourages students to act beyond personal interests and work for the common good.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">NSS Day</p>
          <h3 className="mt-4 text-3xl font-black text-slate-900">NSS Day — 24 September</h3>
          <p className="mt-4 text-base leading-7 text-slate-600">
            NSS Day marks the birth of the scheme in 1969 and celebrates student volunteerism and contributions to social development. It is a reminder of the spirit of service and community leadership.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-[2rem] bg-slate-900 p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">About Our NSS Unit</p>
        <h3 className="mt-4 text-3xl font-black">About Our NSS Unit</h3>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          {aboutContent.description || 'Since its establishment, the NSS unit at PESMCOE, Pune-05 has been dedicated to involving students in community service and fostering their sense of responsibility toward society.'}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Annual Winter Camps',
            'University Camps',
            'Blood Donation Drives',
            'Tree Plantation Programs',
            'Cleanliness Drives',
            'Health & Hygiene Awareness Campaigns',
            'Police Mitra Volunteering'
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-700 bg-white/5 p-4 text-sm font-medium text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Programme Officers" title="NSS leadership" description="Dedicated faculty mentors guiding students in real-world community engagement and social development." />
        <div className="grid gap-6 md:grid-cols-2">
          {programmeOfficers.map((officer) => (
            <article key={officer.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
              {officer.photo ? <img src={officer.photo} alt={officer.name} className="mb-5 h-14 w-14 rounded-full object-cover"/> : <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-lg font-black text-white">{officer.name.charAt(0)}</div>}
              <h3 className="text-2xl font-bold text-slate-900">{officer.name}</h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{officer.designation}</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{officer.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

function TeamPortrait({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [photo])
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()

  return (
    <div className="mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-slate-200 bg-[#f4efe8]">
      {photo && !failed ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <div className="flex h-full items-center justify-center" role="img" aria-label={`Portrait unavailable for ${name}`}>
          <span className="text-5xl font-black tracking-wide text-slate-400">{initials}</span>
        </div>
      )}
    </div>
  )
}

function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<(typeof departmentFilters)[number]>('All')
  const { site } = useCms()
  const filters = ['All', ...new Set([...(site?.collections.domains || []).filter((domain: any) => domain.active !== false).map((domain: any) => domain.name), ...coreTeamMembers.map(member => member.department)].filter(Boolean))]

  const filteredMembers = useMemo(() => {
    return selectedDepartment === 'All'
      ? coreTeamMembers
      : coreTeamMembers.filter((member) => member.department === selectedDepartment)
  }, [selectedDepartment, site])

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <SectionHeading
          eyebrow="Programme Officers"
          title="Faculty leadership"
          description="The unit is guided by dedicated programme officers who coordinate service learning, student participation and community engagement."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {programmeOfficers.map((officer) => (
            <article key={officer.id || officer.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-6">
              <TeamPortrait name={officer.name} photo={officer.photo} />
              <h3 className="text-2xl font-bold text-slate-900">{officer.name}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">{officer.designation}</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{officer.description}</p>
            </article>
          ))}
        </div>
      </div>

      <SectionHeading
        eyebrow="Core Team"
        title="NSS core leadership and volunteers"
        description="The NSS unit functions through dedicated students and leaders who coordinate service events, campaigns and community initiatives."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedDepartment === filter
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:text-red-600'
            }`}
            onClick={() => setSelectedDepartment(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filteredMembers.map((member, index) => (
          <article key={member.id || `${member.name}-${index}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <TeamPortrait name={member.name} photo={member.photo} />
            <h3 className="mt-5 text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="mt-2 text-sm font-medium text-red-600">{member.department}</p>
            <p className="mt-3 text-sm text-slate-600">{member.position}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

function ActivitiesPage() {
  const { site } = useCms()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(activities[0]?.id ?? '')
  const categories = [...new Set(activities.map(activity => activity.category).filter(Boolean))]

  const filteredActivities = useMemo(() => {
    return selectedCategory === 'All'
      ? activities
      : activities.filter((activity) => activity.category === selectedCategory)
  }, [selectedCategory, site])

  const selectedActivity =
    filteredActivities.find((activity) => activity.id === selectedId) ?? filteredActivities[0]

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Activities" title="Community engagement in action" description="NSS volunteers participate in service initiatives that support health, environment, awareness and village development." />

      <div className="mb-8 flex flex-wrap gap-3">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:text-red-600'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          {filteredActivities.map((activity) => (
            <button
              key={activity.id}
              type="button"
              className={`w-full rounded-[1.5rem] border p-4 text-left transition-colors ${
                selectedActivity?.id === activity.id
                  ? 'border-red-200 bg-red-50'
                  : 'border-slate-200 bg-white hover:border-red-100'
              }`}
              onClick={() => setSelectedId(activity.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-600">
                    {activity.category}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{activity.name}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500" />
              </div>
            </button>
          ))}
        </div>

        {selectedActivity ? (
          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <img src={selectedActivity.image} alt={selectedActivity.name} className="h-72 w-full object-cover" />
            <div className="p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-600">
                {selectedActivity.category}
              </div>
              <h3 className="mt-3 text-3xl font-black text-slate-900">{selectedActivity.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{selectedActivity.description}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2"><MapPin size={16} /> {selectedActivity.location}</span>
                <span className="inline-flex items-center gap-2"><BookOpen size={16} /> {selectedActivity.date}</span>
              </div>
              {(selectedActivity.photos||[]).filter((photo:string)=>photo&&photo!==selectedActivity.image).length>0&&<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{(selectedActivity.photos||[]).filter((photo:string)=>photo&&photo!==selectedActivity.image).map((photo:string,index:number)=><img key={`${photo}-${index}`} src={photo} alt={`${selectedActivity.name} activity photo ${index+1}`} className="h-28 w-full object-cover" loading="lazy"/>)}</div>}
            </div>
          </article>
        ) : null}
      </div>
    </main>
  )
}

function CampsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Annual Winter Camp"
        title="Annual Winter Camp"
        description="A 7-Day Journey of Service, Learning & Community Development"
      />

      <section className="overflow-hidden border border-[rgba(23,28,34,0.1)] bg-white">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[340px] bg-slate-900 lg:min-h-[540px]">
            <img src={siteImages.camp.winterCamp} alt="NSS volunteers at the special winter camp in the hills" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200">Special Winter Camp</p>
              <h2 className="mt-3 max-w-xl text-3xl font-black sm:text-4xl">Seven days of service, learning and community.</h2>
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-base leading-7 text-slate-600">
              The Annual Winter Camp is a 7-day immersive experience that involves adopting a village and contributing to its development through various projects.
            </p>
            <p className="mt-6 border-l-2 border-red-700 pl-4 text-sm leading-6 text-slate-600">
              The orientation reference shows volunteers working alongside local residents on education, sustainability, health awareness and shared community needs.
            </p>
          </div>
        </div>
        <div className="grid border-t border-[rgba(23,28,34,0.1)] sm:grid-cols-2">
          <figure className="relative min-h-64 bg-slate-900">
            <img src={siteImages.camp.communityMeeting} alt="Volunteers and village residents gathered for a winter camp meeting" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">Listening and planning with the community</figcaption>
          </figure>
          <figure className="relative min-h-64 bg-slate-900 sm:border-l border-white">
            <img src={siteImages.camp.forestation} alt="NSS volunteers working together on a village forestation project" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">Forestation and hands-on field work</figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700">A week in service</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Camp activities</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">A mix of practical work, learning and cultural exchange shaped around local priorities.</p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {winterCampActivities.map((item, index) => (
            <li key={item} className="flex gap-4 border-t border-slate-200 py-4">
              <span className="text-xs font-bold tracking-wider text-red-700">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium text-slate-800">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid overflow-hidden bg-slate-900 text-white lg:grid-cols-2">
        <div className="relative min-h-72">
          <img src={siteImages.activities.culturalEvening} alt="NSS volunteers gathered during a cultural evening" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">Spandan</p>
          <h3 className="mt-4 text-3xl font-black">Cultural Program</h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            The cultural evening marks the conclusion of the camp and celebrates the spirit of service, creativity and collective effort developed over seven days of volunteering.
          </p>
        </div>
      </section>
    </main>
  )
}

function AchievementsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Achievements"
        title="Progress shaped by service and dedication"
        description="A collection of recognitions, participation and community outcomes made possible through NSS engagement."
      />

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} {...achievement} />
        ))}
      </div>
    </main>
  )
}

function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Gallery"
        title="A documented journey of service"
        description="From camps and awareness drives to village initiatives and community celebrations, the gallery presents the heart of NSS work."
      />
      <GalleryGrid />
    </main>
  )
}

function JoinPage() {
  const { site } = useCms()
  const content = site?.settings?.join || {}
  const steps: string[] = Array.isArray(content.steps) ? content.steps.filter(Boolean) : []
  const benefits: string[] = Array.isArray(content.benefits) ? content.benefits.filter(Boolean) : []
  const activitiesList: string[] = Array.isArray(content.activities) ? content.activities.filter(Boolean) : []
  const joinHref = isSafeCmsHref(content.ctaUrl) ? content.ctaUrl : ''
  const registrationHref = isSafeWebUrl(content.registrationUrl) ? content.registrationUrl : ''
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Join NSS" title={content.title || ''} description={content.description || ''} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">Why join?</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            {benefits.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">Who can join?</p>
          <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-600">{content.eligibility || ''}</p>
          {content.instructions ? <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{content.instructions}</p> : null}
        </div>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">How to join</p>
          <ol className="mt-5 space-y-4 text-base leading-7 text-slate-600">
            {steps.map((step, index) => <li key={`${index}-${step}`}>{index + 1}. {step}</li>)}
          </ol>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">Activities</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {activitiesList.map((activity) => <li key={activity}>• {activity}</li>)}
          </ul>
        </div>
      </div>
      {content.contactInformation ? <p className="mt-8 whitespace-pre-line text-center text-sm leading-7 text-slate-600">{content.contactInformation}</p> : null}
      {registrationHref ? <p className="mt-4 text-center"><a href={registrationHref} target="_blank" rel="noreferrer" className="text-sm font-semibold text-red-700 underline">Registration / application</a></p> : null}
      <div className="mt-12 border border-[rgba(23,28,34,0.08)] bg-[#f7f3ee] p-8 text-center">
        {joinHref ? <a href={joinHref} target={joinHref.startsWith('http') ? '_blank' : undefined} rel={joinHref.startsWith('http') ? 'noreferrer' : undefined} className="inline-flex items-center justify-center gap-2 border border-[#b11d2e] bg-[#b11d2e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#981a2a]">
          {content.ctaText || ''}<ArrowRight size={16} />
        </a> : null}
      </div>
    </main>
  )
}

function ContactPage() {
  const { site } = useCms()
  const contact = site?.settings?.contact || {}
  const visibleContact: Array<{ label: string; value: string }> = [
    contact.address ? { label: 'Address', value: contact.address } : null,
    contact.email ? { label: 'Email', value: contact.email } : null,
    contact.phone ? { label: 'Phone', value: contact.phone } : null
  ].filter((item): item is { label: string; value: string } => Boolean(item))
  const socialLinks = [
    { label: 'Instagram', url: contact.instagram },
    { label: 'Facebook', url: contact.facebook },
    { label: 'LinkedIn', url: contact.linkedin },
    { label: 'YouTube', url: contact.youtube },
    ...parseSocialEntries(contact.otherSocialLinks)
  ].filter((link): link is { label: string; url: string } => isSafeWebUrl(link.url))
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title={contact.pageTitle || ''} description={contact.pageDescription || ''} />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">Institution</p>
          <p className="mt-4 whitespace-pre-line text-xl font-semibold leading-8 text-slate-900">{contact.institution || ''}</p>
          <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
            <p><strong>National Service Scheme</strong></p>
            {contact.unit ? <p className="whitespace-pre-line">{contact.unit}</p> : null}
            {contact.officeInfo ? <p className="whitespace-pre-line">{contact.officeInfo}</p> : null}
            {visibleContact.map((item) => <p key={item.label}><strong>{item.label}:</strong> {item.value}</p>)}
          </div>
        </div>
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">Quick links</p>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            {isSafeWebUrl(contact.mapsUrl) ? <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="block hover:text-red-300">Campus map</a> : null}
            {socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="block hover:text-red-300">{link.label}</a>)}
          </div>
        </div>
      </div>
    </main>
  )
}
function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">Page not found</h1>
      <p className="mt-4 text-lg text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500">
        Back to home
      </Link>
    </main>
  )
}

function PublicRoutes() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/camps" element={<CampsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}

function App() {
  const { site } = useCms()
  void site
  return <Routes>
    <Route path="/admin/setup" element={<AdminSetup />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="*" element={<AppShell><PublicRoutes /></AppShell>} />
  </Routes>
}

export default App
