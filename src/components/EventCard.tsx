import { CalendarDays, Clock3, MapPin, Ticket } from 'lucide-react'

export type EventCardProps = {
  title: string
  date: string
  time: string
  venue: string
  description: string
  registrationUrl: string
}

export function EventCard({
  title,
  date,
  time,
  venue,
  description,
  registrationUrl
}: EventCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="mb-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-700">
        Upcoming event
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-red-500" /> {date}</div>
        <div className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-red-500" /> {time}</div>
        <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-red-500" /> {venue}</div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      {registrationUrl ? <a
        href={registrationUrl}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
      >
        <Ticket size={16} />
        Register
      </a> : null}
    </article>
  )
}
