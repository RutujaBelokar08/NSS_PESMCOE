import { ArrowRight, Award, BadgeCheck, Heart, Leaf, Sparkles, Trophy } from 'lucide-react'

type AchievementCardProps = {
  title: string
  description: string
  icon: string
  image?: string
}

const iconMap = {
  sparkles: Sparkles,
  leaf: Leaf,
  trophy: Trophy,
  badge: BadgeCheck,
  heart: Heart,
  award: Award
}

export function AchievementCard({ title, description, icon, image }: AchievementCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Sparkles

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.1)]">
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          {image ? <img
            src={image}
            alt={title}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          /> : <div className="h-24 bg-slate-100" aria-hidden="true" />}
          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-red-600 shadow-lg backdrop-blur-sm">
            <Icon size={22} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-auto pt-5 text-sm font-semibold text-red-600">
            <span className="inline-flex items-center gap-2">
              NSS impact <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
