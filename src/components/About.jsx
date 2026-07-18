import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center fade-up">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
          Agrawal Samaj
        </p>
        <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
          {t.aboutTitle}
        </h2>
        <div className="gold-line mx-auto mt-5 w-28" />
        <p className="mt-8 text-base leading-relaxed text-ink-muted sm:text-lg">
          {t.aboutText}
        </p>
      </div>
    </section>
  )
}
