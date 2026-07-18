import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logo from '../assets/logo.png'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#candidates', label: t.navCandidates },
    { href: '#vision', label: t.navVision },
    { href: '#members', label: t.navMembers },
    { href: '#contact', label: t.navContact },
  ]

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-0' : 'glass-nav'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <a href="#home" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-ivory shadow-[0_0_0_2px_rgba(201,162,39,0.55),0_0_0_5px_rgba(201,162,39,0.15),0_10px_24px_rgba(0,0,0,0.3)] transition duration-300 group-hover:scale-[1.05] sm:h-14 sm:w-14">
            <img src={logo} alt={t.brand} className="h-full w-full object-cover" />
          </div>
          <div className="hidden leading-tight min-[420px]:block">
            <p className="font-display text-lg font-extrabold tracking-wide text-ivory sm:text-xl">
              {t.brand}
            </p>
            <p className="mt-0.5 text-[10px] font-medium tracking-[0.08em] text-gold-light uppercase sm:text-[11px]">
              {t.brandSub}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link rounded-lg px-3.5 py-2.5 text-[13px] font-medium tracking-wide text-ivory/90 transition hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center rounded-full border border-gold/45 bg-maroon-deep/50 p-0.5 text-xs font-semibold shadow-inner"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`rounded-full px-3.5 py-1.5 transition ${
                lang === 'hi'
                  ? 'bg-gold text-maroon-deep shadow-sm'
                  : 'text-ivory/80 hover:text-gold-light'
              }`}
            >
              {t.langHi}
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-3.5 py-1.5 transition ${
                lang === 'en'
                  ? 'bg-ivory text-maroon shadow-sm'
                  : 'text-ivory/80 hover:text-gold-light'
              }`}
            >
              {t.langEn}
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-maroon-deep/30 text-ivory transition hover:border-gold/70 hover:bg-gold/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/30 bg-maroon-deep/98 px-4 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ivory/90 transition hover:bg-gold/15 hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
