import { useEffect } from 'react'
import { Phone, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'

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
      className="modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-maroon-deep/60 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="palace-frame modal-panel relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-gold/45 bg-ivory shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-name"
      >
        <PalaceCorners />
        <div
          className="relative px-6 pb-8 pt-10 text-center text-ivory"
          style={{ background: candidate.color }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundSize: '80px 80px',
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-gold/30 bg-black/25 p-2 text-ivory transition hover:bg-black/40"
            aria-label={t.close}
          >
            <X size={18} />
          </button>

          <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-gold/75 bg-[#fff8ee] shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-4 ring-gold/20">
            <CandidateAvatar candidate={candidate} className="h-full w-full" softBg />
          </div>
          <h3 id="candidate-name" className="relative font-display text-3xl font-semibold">
            {candidate.name[lang]}
          </h3>
          <p className="relative mt-1 text-sm font-medium tracking-wide text-gold-light">
            {candidate.post[lang]}
          </p>
          {candidate.phone && (
            <a
              href={`tel:${candidate.phone}`}
              className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/15 px-4 py-2 text-sm text-ivory transition hover:bg-black/25"
            >
              <Phone size={14} className="text-gold" />
              {candidate.phone}
            </a>
          )}
        </div>

        <div className="space-y-6 px-6 py-8">
          {candidate.detail?.[lang] && (
            <p className="text-center text-sm text-ink-muted">{candidate.detail[lang]}</p>
          )}
          {candidate.aboutUs?.[lang] && (
            <div>
              <h4 className="font-display text-xl font-semibold text-maroon">{t.aboutUs}</h4>
              <div className="gold-line mt-2 w-16" />
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {candidate.aboutUs[lang]}
              </p>
            </div>
          )}
          {candidate.mission?.[lang] && (
            <div>
              <h4 className="font-display text-xl font-semibold text-maroon">{t.mission}</h4>
              <div className="gold-line mt-2 w-16" />
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {candidate.mission[lang]}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-maroon py-3.5 text-sm font-semibold text-ivory shadow-md transition hover:bg-maroon-soft"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CandidateAvatar({ candidate, className = '', softBg = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex h-full w-full items-center justify-center font-display text-3xl font-bold ${
          softBg ? 'bg-[#fff8ee] text-maroon/40' : 'text-ivory'
        }`}
        style={softBg ? undefined : { background: candidate.color }}
      >
        {candidate.initials}
      </div>
      <img
        src={candidate.photo}
        alt=""
        className={`absolute inset-0 h-full w-full ${
          softBg ? 'object-contain object-center p-1.5' : 'object-cover'
        }`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
