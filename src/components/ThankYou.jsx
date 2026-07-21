import { useEffect } from 'react'
import logo from '../assets/logo.png'
import mandala from '../assets/background-mandala.png'
import { useLanguage } from '../context/LanguageContext'
import { panelInfo } from '../data/candidates'

export default function ThankYou() {
  const { t, lang, setLang } = useLanguage()
  const panel = panelInfo.panel[lang]
  const slogan = panelInfo.slogan[lang]

  useEffect(() => {
    document.title =
      lang === 'hi'
        ? 'धन्यवाद · विजय 2026'
        : 'Thank You · Victory 2026'
    return () => {
      document.title = 'श्री अग्रवाल समाज केन्द्रीय समिति चुनाव 2026'
    }
  }, [lang])

  return (
    <div className="thankyou-page relative flex min-h-dvh flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-linear-to-b from-maroon-deep via-maroon to-maroon-deep" />
        <img
          src={mandala}
          alt=""
          className="mandala-spin absolute left-1/2 top-1/2 h-[min(140vw,900px)] w-[min(140vw,900px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        />
        <img
          src={mandala}
          alt=""
          className="mandala-spin-reverse absolute -left-[20%] -top-[10%] h-[min(70vw,420px)] w-[min(70vw,420px)] max-w-none opacity-[0.1]"
        />
        <img
          src={mandala}
          alt=""
          className="mandala-spin absolute -bottom-[15%] -right-[15%] h-[min(70vw,420px)] w-[min(70vw,420px)] max-w-none opacity-[0.1]"
        />
        <div className="thankyou-shimmer absolute inset-0" />
        <div className="thankyou-sparkles absolute inset-0" />
      </div>

      <div className="relative z-10 flex justify-end px-4 pt-4 sm:px-6">
        <div className="inline-flex overflow-hidden rounded-full border border-gold/45 bg-maroon-deep/50 p-0.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              lang === 'hi'
                ? 'bg-gold text-maroon-deep'
                : 'text-ivory/70 hover:text-gold-light'
            }`}
          >
            {t.langHi}
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              lang === 'en'
                ? 'bg-gold text-maroon-deep'
                : 'text-ivory/70 hover:text-gold-light'
            }`}
          >
            {t.langEn}
          </button>
        </div>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-6 text-center sm:px-8">
        <div className="thankyou-enter flex flex-col items-center">
          <div className="gold-flourish mb-4">
            <span className="text-gold-light">✦</span>
          </div>

          <div className="thankyou-logo-ring mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-ivory/95 p-2 shadow-[0_0_40px_rgba(201,162,39,0.35)] ring-2 ring-gold/60 sm:h-36 sm:w-36 sm:p-3">
            <img
              src={logo}
              alt={t.brand}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <p className="font-display text-sm font-semibold tracking-[0.2em] text-gold-light uppercase sm:text-base">
            {t.brand}
          </p>
          <div className="gold-line mx-auto mt-3 w-28" />

          <p className="mt-5 font-display text-xs font-semibold tracking-wide text-gold/90 sm:text-sm">
            {t.thankYouBadge}
          </p>

          <h1 className="thankyou-title mt-3 font-display text-5xl font-extrabold leading-none text-gold-light sm:text-6xl md:text-7xl">
            {t.thankYouTitle}
          </h1>

          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold leading-snug text-ivory sm:text-3xl md:text-4xl">
            {t.thankYouVictory}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base">
            {t.thankYouMessage}
          </p>

          <div className="mt-8 rounded-2xl border border-gold/40 bg-maroon-deep/40 px-6 py-4 backdrop-blur-sm sm:px-10">
            <p className="font-display text-lg font-extrabold text-gold-light sm:text-xl">
              {panel}
            </p>
            <p className="mt-1 text-sm text-ivory/70">{slogan}</p>
          </div>

          <p className="mt-8 font-display text-base font-semibold tracking-wide text-gold sm:text-lg">
            {t.thankYouBlessing}
          </p>
        </div>
      </main>
    </div>
  )
}
