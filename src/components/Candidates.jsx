import { useState } from 'react'
import { candidates } from '../data/candidates'
import { useLanguage } from '../context/LanguageContext'
import CandidateModal, { CandidateAvatar } from './CandidateModal'

export default function Candidates() {
  const { lang, t } = useLanguage()
  const [selected, setSelected] = useState(null)

  return (
    <section id="candidates" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
            {t.candidatesTitle}
          </h2>
          <div className="gold-line mx-auto mt-5 w-28" />
          <p className="mt-4 text-sm text-ink-muted sm:text-base">{t.candidatesSubtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {candidates.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c)}
              className="group fade-up overflow-hidden rounded-2xl border border-maroon/10 bg-ivory text-left shadow-[0_12px_40px_rgba(92,26,27,0.06)] transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_50px_rgba(92,26,27,0.12)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CandidateAvatar candidate={c} className="aspect-[4/5] w-full" />
              <div className="border-t border-gold/30 px-4 py-4">
                <p className="font-display text-xl font-semibold text-maroon">
                  {c.name[lang]}
                </p>
                <p className="mt-0.5 text-sm font-medium text-gold-deep">{c.post[lang]}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-maroon-soft opacity-80 transition group-hover:opacity-100">
                  {t.viewProfile} →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <CandidateModal candidate={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
