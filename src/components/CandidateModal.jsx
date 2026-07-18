import { useEffect, useState } from 'react'
import { Phone, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'
import mandala from '../assets/background-mandala.png'

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
        className="palace-frame modal-panel relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-gold/45 bg-ivory shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-name"
      >
        {/* Corners stay fixed on the visible frame (do not scroll) */}
        <PalaceCorners />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-gold/30 bg-black/25 p-2 text-ivory transition hover:bg-black/40"
          aria-label={t.close}
        >
          <X size={18} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative overflow-hidden bg-maroon px-6 pb-8 pt-10 text-center text-ivory">
            <img
              src={mandala}
              alt=""
              className="mandala-spin pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 opacity-25"
            />

            <div className="relative z-[1] mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-gold/75 bg-[#fff8ee] shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-4 ring-gold/20">
              <CandidateAvatar candidate={candidate} className="h-full w-full" softBg />
            </div>
            <h3 id="candidate-name" className="relative z-[1] font-display text-3xl font-extrabold sm:text-4xl">
              {candidate.name[lang]}
            </h3>
            <p className="relative z-[1] mt-1.5 text-base font-semibold tracking-wide text-gold-light">
              {candidate.post[lang]}
            </p>
            {candidate.phone && (
              <a
                href={`tel:${candidate.phone}`}
                className="relative z-[1] mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/15 px-4 py-2 text-sm text-ivory transition hover:bg-black/25"
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
            {candidate.roles?.[lang]?.length > 0 && (
              <div>
                <h4 className="section-subheading text-maroon">{t.rolesTitle}</h4>
                <div className="gold-line mt-2 w-16" />
                <ul className="mt-4 space-y-2.5 text-left">
                  {candidate.roles[lang].map((role, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-muted sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {candidate.aboutUs?.[lang] && (
              <div>
                <h4 className="section-subheading text-maroon">{t.aboutUs}</h4>
                <div className="gold-line mt-2 w-16" />
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {candidate.aboutUs[lang]}
                </p>
              </div>
            )}
            {candidate.mission?.[lang] && (
              <div>
                <h4 className="section-subheading text-maroon">{t.mission}</h4>
                <div className="gold-line mt-2 w-16" />
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {candidate.mission[lang]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CandidateAvatar({ candidate, className = '', softBg = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {(failed || !candidate.photo) && (
        <div
          className={`flex h-full w-full items-center justify-center font-display text-3xl font-bold ${
            softBg ? 'bg-[#fff8ee] text-maroon/40' : 'text-ivory'
          }`}
          style={softBg ? undefined : { background: candidate.color }}
        >
          {candidate.initials}
        </div>
      )}
      {!failed && candidate.photo && (
        <img
          src={candidate.photo}
          alt=""
          className={`absolute inset-0 h-full w-full ${
            softBg
              ? 'bg-[#fff8ee] object-contain object-center'
              : 'object-cover'
          }`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
