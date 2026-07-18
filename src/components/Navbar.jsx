import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#candidates', label: t.navCandidates },
    { href: '#members', label: t.navMembers },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 shadow-[0_8px_30px_rgba(92,26,27,0.08)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon text-gold shadow-md ring-1 ring-gold/40 transition group-hover:scale-[1.03]">
            <span className="font-display text-xl font-bold leading-none">अ</span>
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold tracking-wide text-maroon sm:text-xl">
              {t.brand}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold-deep">
              {t.brandSub}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-maroon/5 hover:text-maroon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-gold/50 bg-ivory-deep/80 p-0.5 text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === 'hi'
                  ? 'bg-maroon text-ivory shadow-sm'
                  : 'text-ink-muted hover:text-maroon'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === 'en'
                  ? 'bg-maroon text-ivory shadow-sm'
                  : 'text-ink-muted hover:text-maroon'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-maroon/15 text-maroon md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-maroon/10 bg-ivory/98 px-4 py-3 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-maroon/5 hover:text-maroon"
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
