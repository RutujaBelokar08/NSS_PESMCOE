import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NSS_JOIN_FORM_URL } from '../constants'

export function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-[0_32px_80px_rgba(15,23,42,0.2)] sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.28),_transparent_28%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-300">Volunteer with us</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Become a part of the change.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Join NSS and take part in service, leadership and community action that creates lasting impact.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={NSS_JOIN_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Become a Volunteer
            <ArrowRight size={16} />
          </a>
          <Link
            to="/join"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
