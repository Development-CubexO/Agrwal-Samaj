import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="mandala-bg pointer-events-none absolute inset-y-0 left-0 w-40 opacity-50 sm:w-56" />
      <div className="mandala-bg pointer-events-none absolute inset-y-0 right-0 w-40 opacity-50 sm:w-56" />

      <div className="relative mx-auto max-w-4xl fade-up">
        <div className="mb-6 text-center sm:mb-8">
          <p className="section-ornament mb-3 justify-center">Mission</p>
          <div className="gold-flourish mb-2">
            <span className="text-gold">✦</span>
          </div>
          <h2 className="section-heading">
            {t.aboutTitle}
          </h2>
          <div className="gold-line-thick mx-auto mt-5 w-44" />
        </div>

        <article className="palace-frame glass-panel relative overflow-hidden rounded-3xl px-6 py-8 text-center sm:px-12 sm:py-12">
          <PalaceCorners size="lg" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='48' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3Ccircle cx='60' cy='60' r='28' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundSize: '120px 120px',
            }}
          />
          <p className="relative text-[1.05rem] leading-[1.9] text-ink-muted sm:text-xl">
            {t.aboutText}
          </p>
        </article>
      </div>
    </section>
  )
}
