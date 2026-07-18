import { ArrowUp, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logo from '../assets/logo.png'
import PalaceCorners from './PalaceCorners'

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186 31.247 31.247 0 000 12.017a31.25 31.25 0 00.502 5.831 3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136A31.25 31.25 0 0024 12.017a31.247 31.247 0 00-.502-5.831zM9.545 15.568V8.465l6.273 3.552-6.273 3.551z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#candidates', label: t.navCandidates },
    { href: '#vision', label: t.navVision },
    { href: '#members', label: t.navMembers },
    { href: '#contact', label: t.navContact },
  ]

  const social = [
    { href: '#', label: 'Facebook', icon: FacebookIcon, className: 'bg-[#1877F2] text-white' },
    { href: '#', label: 'Instagram', icon: InstagramIcon, className: 'bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white' },
    { href: '#', label: 'YouTube', icon: YoutubeIcon, className: 'bg-[#FF0000] text-white' },
    { href: '#', label: 'WhatsApp', icon: WhatsAppIcon, className: 'bg-[#25D366] text-white' },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden bg-maroon-deep text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-transparent via-gold to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: '100px 100px',
        }}
      />

      <div className="palace-frame relative mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-10">
        <PalaceCorners size="lg" />

        <div className="relative grid gap-10 px-2 py-10 sm:px-4 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-ivory shadow-md ring-2 ring-gold/60">
                <img src={logo} alt={t.brand} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-tight">{t.brand}</p>
                <p className="mt-0.5 text-[11px] tracking-[0.06em] text-gold-light uppercase">
                  {t.brandSub}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">{t.footerNote}</p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-gold">{t.footerQuickLinks}</h3>
            <div className="gold-line mt-2 w-12" />
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/80 transition hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-gold">{t.footerContact}</h3>
            <div className="gold-line mt-2 w-12" />
            <ul className="mt-5 space-y-3.5 text-sm text-ivory/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>{t.footerAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={`tel:${t.footerPhone.replace(/\D/g, '')}`} className="hover:text-gold-light">
                  {t.footerPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${t.footerEmail}`} className="hover:text-gold-light">
                  {t.footerEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe size={16} className="shrink-0 text-gold" />
                <span>{t.footerWeb}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-gold">{t.footerConnect}</h3>
            <div className="gold-line mt-2 w-12" />
            <div className="mt-5 flex flex-wrap gap-3">
              {social.map(({ href, label, icon: Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full shadow-md transition hover:scale-110 ${className}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gold/25">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div className="min-w-0">
            <p className="text-xs text-ivory/55">
              © {year} · {t.brand} · {t.rights}
            </p>
            <p className="mt-1 text-[11px] text-ivory/45 sm:text-xs">
              Design &amp; Develop by{' '}
              <span className="font-medium text-gold-light/80">Prashant Soni</span>
              {' '}from Cubexo Software Solution LLP
            </p>
          </div>
          <a
            href="#home"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full border border-gold/50 bg-gold/15 text-gold transition hover:bg-gold hover:text-maroon-deep sm:self-auto"
            aria-label={t.backToTop}
            title={t.backToTop}
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
