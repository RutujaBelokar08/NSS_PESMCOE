import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteImages } from '../data/images'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#171c22]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(17, 17, 17, 0.82) 0%, rgba(17, 17, 17, 0.55) 42%, rgba(17, 17, 17, 0.78) 100%), url(${siteImages.hero})`
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(177,29,46,0.18),_transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl py-10 lg:py-20">
            <p className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#f4efe8]">
              <img src={siteImages.nssLogo} alt="" aria-hidden="true" className="h-8 w-8 rounded-full bg-white p-1 object-contain" />
              National Service Scheme
            </p>
            <h1 className="editorial-heading text-white">
              Not Me,
              <span className="mt-2 block text-[#f4efe8] [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">But You.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#e8e2dc] sm:text-lg">
              Serving the community. Developing responsible citizens. Creating meaningful impact through action, empathy and leadership.
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8f4f1] opacity-90">
              NSS Unit A-117 | PES Modern College of Engineering, Pune
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-[#b11d2e] bg-[#b11d2e] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#981a2a]"
              >
                Explore Our Work
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Join NSS
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
              <div className="photo-slot h-[420px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${siteImages.hero})` }} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center text-[#f2ece6]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9d1ca]">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
