import { Globe, Mail, MapPin, Phone, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteImages } from '../data/images'
import { isSafeWebUrl, parseSocialEntries } from '../data/siteSettings'
import { useCms } from '../data/CmsContext'

const quickLinks = [
  { label: 'Activities', to: '/activities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Join NSS', to: '/join' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin Login', to: '/admin/login' }
]

export function Footer() {
  const { site } = useCms()
  const footer = site?.settings?.contact || {}
  const fallbackSocials = [
    { label: 'Instagram', url: footer.instagram },
    { label: 'Facebook', url: footer.facebook },
    { label: 'LinkedIn', url: footer.linkedin },
    { label: 'YouTube', url: footer.youtube },
    ...parseSocialEntries(footer.otherSocialLinks)
  ].filter((link): link is { label: string; url: string } => isSafeWebUrl(link.url))
  const customFooterSocials = parseSocialEntries(footer.footerSocialLinks)
  const socialLinks = (customFooterSocials.length ? customFooterSocials : fallbackSocials).map((link) => ({ ...link, icon: link.label.toLowerCase() === 'youtube' ? Play : Globe }))

  return (
    <footer className="mt-20 border-t border-[rgba(255,255,255,0.08)] bg-[#171c22] text-[#f0eae5]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.55fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={siteImages.nssLogo} alt="National Service Scheme" className="h-12 w-12 shrink-0 rounded-full bg-white p-1 object-contain" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5a2ac]">NSS</div>
              <div className="text-sm font-medium text-[#f7f2ee]">{footer.footerTagline || ''}</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#d8d2ce]">
              {footer.footerDescription || ''}
            </p>
            {footer.footerContactText ? <p className="mt-3 max-w-sm whitespace-pre-line text-sm leading-7 text-[#d8d2ce]">{footer.footerContactText}</p> : null}
          </div>

          <div className="flex items-start lg:justify-center">
            <img src={siteImages.pesmcoeLogo} alt="Progressive Education Society's Modern College of Engineering" className="h-28 w-40 object-contain" loading="lazy" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#d8d2ce]">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-[#ffb0b8]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-[#d8d2ce]">
              {footer.address ? (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#e6b0b7]" />
                  <span>{footer.address}</span>
                </div>
              ) : null}
              {footer.email ? (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#e6b0b7]" />
                  <a href={`mailto:${footer.email}`} className="hover:text-[#ffb0b8]">{footer.email}</a>
                </div>
              ) : null}
              {footer.phone ? (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#e6b0b7]" />
                  <a href={`tel:${footer.phone}`} className="hover:text-[#ffb0b8]">{footer.phone}</a>
                </div>
              ) : null}
            </div>
            {socialLinks.length > 0 ? (
              <div className="mt-5 flex gap-3">
                {socialLinks.map(({ url, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-[#2d343b] text-[#f4efe8] transition-colors hover:border-[#d16c79] hover:text-[#ffb0b8]"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#2a3037] pt-6 text-sm text-[#c8c0bb] sm:flex-row sm:items-center sm:justify-between">
          <div>{footer.footerCopyright || ''}</div>
          <div>{footer.footerTagline || ''}</div>
        </div>
      </div>
    </footer>
  )
}
