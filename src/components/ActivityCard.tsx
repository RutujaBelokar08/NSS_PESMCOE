import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ActivityItem } from '../data/activities'

type ActivityCardProps = {
  activity: ActivityItem
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_60px_rgba(15,23,42,0.12)]">
      <div className="overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-700">
            {activity.category}
          </span>
          <span className="text-xs font-medium text-slate-500">{activity.date}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{activity.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{activity.description}</p>
        <div className="mt-4 text-sm font-medium text-slate-500">{activity.location}</div>
        <Link
          to="/activities"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-500"
        >
          View Details
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
