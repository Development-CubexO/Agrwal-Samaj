import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CandidateModal({ candidate, onClose }) {
  const { lang, t } = useLanguage()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!candidate) return null

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-maroon-deep/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-panel max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-name"
      >
        <div
          className="relative px-6 pb-8 pt-10 text-center text-ivory"
          style={{ background: candidate.color }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-ivory transition hover:bg-black/35"
            aria-label={t.close}
          >
            <X size={18} />
          </button>

          <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-gold/70 shadow-lg">
            <CandidateAvatar candidate={candidate} className="h-full w-full text-2xl" />
          </div>
          <h3 id="candidate-name" className="font-display text-3xl font-semibold">
            {candidate.name[lang]}
          </h3>
          <p className="mt-1 text-sm font-medium tracking-wide text-gold-light">
            {candidate.post[lang]}
          </p>
        </div>

        <div className="space-y-6 px-6 py-7">
          <div>
            <h4 className="font-display text-xl font-semibold text-maroon">{t.aboutUs}</h4>
            <div className="gold-line mt-2 w-16" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              {candidate.aboutUs[lang]}
            </p>
          </div>
          <div>
            <h4 className="font-display text-xl font-semibold text-maroon">{t.mission}</h4>
            <div className="gold-line mt-2 w-16" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              {candidate.mission[lang]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-maroon py-3 text-sm font-semibold text-ivory transition hover:bg-maroon-soft"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CandidateAvatar({ candidate, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-ivory"
        style={{ background: candidate.color }}
      >
        {candidate.initials}
      </div>
      <img
        src={candidate.photo}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
