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
          <div className="relative overflow-hidden bg-linear-to-br from-maroon via-maroon to-maroon-deep px-5 pb-5 pt-10 text-ivory sm:px-6 sm:pb-6 sm:pt-11">
            {/* Mandala — left & right */}
            <img
              src={mandala}
              alt=""
              className="mandala-spin pointer-events-none absolute left-[-18%] top-1/2 h-[200px] w-[200px] -translate-y-1/2 opacity-[0.28] sm:h-[240px] sm:w-[240px]"
            />
            <img
              src={mandala}
              alt=""
              className="mandala-spin-reverse pointer-events-none absolute right-[-18%] top-1/2 h-[170px] w-[170px] -translate-y-1/2 opacity-[0.22] sm:h-[210px] sm:w-[210px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-maroon/15" />

            {/* Square frame in background */}
            <div
              className="pointer-events-none absolute inset-3 rounded-sm border border-gold/45 sm:inset-4"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-4 rounded-sm border border-gold/25 sm:inset-5"
              aria-hidden
            />

            <div className="relative z-[1] flex items-end gap-4 sm:gap-5">
              {/* Photo — left, with white frame behind */}
              <div className="relative w-[110px] shrink-0 self-end sm:w-[130px]">
                <div className="relative aspect-3/4 w-full overflow-visible rounded-md border-[3px] border-white bg-white">
                  {candidate.photo ? (
                    <img
                      src={candidate.photo}
                      alt={candidate.name[lang]}
                      className="absolute inset-0 h-full w-full bg-transparent object-contain object-bottom drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.nextElementSibling
                        if (fallback) fallback.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-ivory/80 ${
                      candidate.photo ? 'hidden' : ''
                    }`}
                    style={{ background: candidate.color }}
                  >
                    {candidate.initials}
                  </div>
                </div>
              </div>

              {/* Name, then post below */}
              <div className="min-w-0 flex-1 self-center pb-1 text-left">
                <h3
                  id="candidate-name"
                  className="font-display text-2xl font-extrabold leading-tight sm:text-3xl"
                >
                  {candidate.name[lang]}
                </h3>
                {candidate.post?.[lang] && (
                  <p className="mt-1.5 text-sm font-semibold tracking-wide text-gold-light sm:text-base">
                    {candidate.post[lang]}
                  </p>
                )}
                {candidate.detail?.[lang] && (
                  <p className="mt-1 text-xs text-ivory/75 sm:text-sm">
                    {candidate.detail[lang]}
                  </p>
                )}
                {candidate.phone && (
                  <a
                    href={`tel:${candidate.phone}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/15 px-3 py-1.5 text-xs text-ivory transition hover:bg-black/25 sm:text-sm"
                  >
                    <Phone size={14} className="text-gold" />
                    {candidate.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6 py-8">
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
