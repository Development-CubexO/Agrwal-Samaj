import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gold/30 bg-maroon text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/40">
          <span className="font-display text-2xl font-bold text-gold">अ</span>
        </div>
        <p className="font-display text-xl font-semibold">{t.brand}</p>
        <p className="text-sm text-gold-light/90">{t.footerNote}</p>
        <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="text-xs text-ivory/60">
          © {year} · {t.rights}
        </p>
      </div>
    </footer>
  )
}
