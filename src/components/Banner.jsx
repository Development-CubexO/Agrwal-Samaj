import { useLanguage } from '../context/LanguageContext'

export default function Banner() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative min-h-[88vh] overflow-hidden pt-20 sm:min-h-[92vh]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #3d1011 0%, #5c1a1b 42%, #6b2a1f 72%, #8f7335 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L52 28 L72 32 L56 48 L60 68 L40 58 L20 68 L24 48 L8 32 L28 28 Z' fill='none' stroke='%23c4a35a' stroke-opacity='0.35' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-24 pt-16 text-center sm:px-6 sm:pt-24">
        <div className="banner-glow">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-light sm:text-sm">
            {t.bannerSubtitle}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ivory sm:text-6xl md:text-7xl">
            {t.bannerTitle}
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <a
            href="#candidates"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-gold/60 bg-gold/15 px-8 py-3 text-sm font-semibold tracking-wide text-ivory backdrop-blur-sm transition hover:bg-gold hover:text-maroon-deep"
          >
            {t.bannerCta}
          </a>
        </div>
      </div>
    </section>
  )
}
