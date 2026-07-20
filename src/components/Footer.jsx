import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logo from '../assets/logo.png'
import cubexoLogo from '../assets/cubexo.png'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#candidates', label: t.navCandidates },
    { href: '#vision', label: t.navVision },
    { href: '#members', label: t.navMembers },
  ]

  return (
    <>
      <div className="w-full border-t border-gold/25 bg-[#f7f2ea]">
        <a
          href="https://www.cubexo.io"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-2 px-4 py-2.5 text-center transition hover:bg-[#efe8dc] sm:gap-2.5 sm:px-6 sm:py-3"
        >
          <span className="text-[11px] font-medium tracking-wide text-maroon-deep/70 sm:text-xs">
            Designed &amp; Developed by
          </span>
          <img
            src={cubexoLogo}
            alt="Cubexo"
            className="h-4 w-auto sm:h-5"
          />
          <span className="hidden text-maroon-deep/25 sm:inline">·</span>
          <span className="text-[11px] font-semibold text-[#1a9fd8] sm:text-xs">
            www.cubexo.io
          </span>
        </a>
      </div>

      <footer id="contact" className="relative overflow-hidden bg-maroon-deep text-ivory">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:gap-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ivory ring-1 ring-gold/50">
              <img src={logo} alt={t.brand} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold leading-tight sm:text-base">{t.brand}</p>
              <p className="text-[10px] text-ivory/50">
                © {year} · {t.rights}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ivory/70 transition hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#home"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition hover:bg-gold hover:text-maroon-deep"
            aria-label={t.backToTop}
            title={t.backToTop}
          >
            <ArrowUp size={14} />
          </a>
        </div>

        <div className="relative border-t border-gold/20">
          <p className="w-full px-4 py-3 text-center text-[11px] text-ivory/45 sm:text-xs">
            Designed &amp; Developed by{' '}
            <span className="font-medium text-gold-light/80">Prashant Soni</span>
            {' '}from{' '}
            <span className="font-medium text-gold-light/80">Cubexo Software Solutions LLP</span>
          </p>
        </div>
      </footer>
    </>
  )
}
