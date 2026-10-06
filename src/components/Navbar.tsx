import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { siteImages } from '../data/images'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Activities', to: '/activities' },
  { label: 'Camps', to: '/camps' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Join NSS', to: '/join' },
  { label: 'Contact', to: '/contact' }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(23,28,34,0.08)] bg-[#f4efe8]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="NSS home">
          <img src={siteImages.nssLogo} alt="National Service Scheme" className="h-10 w-10 shrink-0 object-contain" />
          <div className="leading-tight">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b11d2e]">
              NSS
            </div>
            <div className="max-w-[220px] text-[11px] font-semibold tracking-[0.08em] text-[#171c22]">
              PES Modern College of Engineering
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-[#171c22] transition-colors duration-200 hover:text-[#b11d2e]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/join"
            className="inline-flex items-center justify-center border border-[#b11d2e] bg-[#b11d2e] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#981a2a]"
          >
            Join NSS
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(23,28,34,0.12)] bg-white text-[#171c22] lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[rgba(23,28,34,0.08)] bg-[#f8f4f1] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-none px-1 py-2 text-sm font-medium text-[#171c22] transition-colors hover:text-[#b11d2e]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="mt-2 inline-flex items-center justify-center border border-[#b11d2e] bg-[#b11d2e] px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Join NSS
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
