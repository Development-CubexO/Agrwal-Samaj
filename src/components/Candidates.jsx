import { useState } from 'react'
import { Award, Heart } from 'lucide-react'
import {
  padadhikari,
  purushKaryakarini,
  mahilaKaryakarini,
  president,
} from '../data/candidates'
import { useLanguage } from '../context/LanguageContext'
import CandidateModal, { CandidateAvatar } from './CandidateModal'
import PalaceCorners from './PalaceCorners'
import mandala from '../assets/background-mandala.png'

const PHOTO_BG = 'bg-[#fff8ee]'

function SectionBadge({ children }) {
  return (
    <div className="mx-auto mb-5 flex w-fit items-center justify-center sm:mb-6">
      <div className="relative rounded-full bg-linear-to-b from-maroon-soft to-maroon-deep px-12 py-3 shadow-[0_8px_24px_rgba(63,15,26,0.4)] ring-1 ring-gold/60 sm:px-16">
        <span className="font-display text-lg font-extrabold tracking-wide text-ivory sm:text-xl">
          {children}
        </span>
      </div>
    </div>
  )
}

function CandidateCard({ candidate, size = 'large', onSelect, delay = 0 }) {
  const { lang } = useLanguage()
  const isLarge = size === 'large'
  const detail = candidate.detail?.[lang]
  const post = candidate.post?.[lang]

  return (
    <button
      type="button"
      onClick={() => onSelect(candidate)}
      className="candidate-card fade-up group flex h-full w-full cursor-pointer flex-col items-center rounded-2xl border border-gold/40 bg-ivory/75 p-3 text-center shadow-[0_10px_32px_rgba(63,15,26,0.08)] backdrop-blur-sm transition hover:border-gold/70 hover:bg-ivory sm:p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`candidate-photo shrink-0 overflow-hidden rounded-xl border-[1.5px] border-gold/60 shadow-[0_8px_20px_rgba(63,15,26,0.1)] transition duration-300 ${PHOTO_BG} ${
          isLarge
            ? 'aspect-4/5 w-full max-w-[200px]'
            : 'aspect-4/5 w-full max-w-[130px]'
        }`}
      >
        <CandidateAvatar candidate={candidate} className="h-full w-full" softBg />
      </div>

      <div className="mt-3 flex w-full flex-1 flex-col items-center justify-start">
        {isLarge && post && (
          <p className="font-hindi text-xs font-bold leading-tight text-maroon sm:text-sm">
            {post}
          </p>
        )}

        <p
          className={`font-display font-extrabold leading-snug text-maroon-deep ${
            isLarge ? 'mt-1.5 text-base sm:text-lg' : 'text-sm sm:text-base'
          }`}
        >
          {candidate.name[lang]}
        </p>

        {detail && (
          <p className="mt-0.5 text-[11px] leading-tight text-ink-muted sm:text-xs">
            {detail}
          </p>
        )}
      </div>
    </button>
  )
}

export default function Candidates() {
  const { lang, t } = useLanguage()
  const [selected, setSelected] = useState(null)
  const otherPadadhikari = padadhikari.filter((c) => c.id !== president.id)

  return (
    <section id="candidates" className="scroll-mt-24 px-3 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center fade-up sm:mb-10">
          <p className="section-ornament mb-3 justify-center">{t.candidatesSubtitle}</p>
          <div className="gold-flourish mb-2">
            <span className="text-gold">✦</span>
          </div>
          <h2 className="section-heading">
            {t.candidatesTitle}
          </h2>
          <div className="gold-line-thick mx-auto mt-5 w-44" />
          {/* <p className="mt-3 text-sm text-ink-muted sm:text-base">{t.candidatesSubtitle}</p> */}
        </div>

        {/* Featured President */}
        <article className="palace-frame fade-up relative mb-8 overflow-visible rounded-3xl border-2 border-gold/75 bg-linear-to-br from-maroon via-maroon to-maroon-deep luxury-shadow sm:mb-10">
          <PalaceCorners size="lg" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <img
              src={mandala}
              alt=""
              className="mandala-spin absolute left-[-8%] top-1/2 h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-y-1/2 opacity-[0.28]"
            />
            <img
              src={mandala}
              alt=""
              className="mandala-spin-reverse absolute right-[-10%] top-1/2 h-[min(70vw,340px)] w-[min(70vw,340px)] -translate-y-1/2 opacity-[0.2]"
            />
            <div className="absolute inset-0 bg-maroon/20" />
          </div>
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid items-end gap-4 overflow-visible px-5 pt-5 sm:px-8 sm:pt-6 lg:grid-cols-[240px_1fr] lg:gap-8 lg:px-10 lg:pt-6">
            {/* Photo — no white bg / frame, overflows upward, flush bottom */}
            <div className="relative z-10 mx-auto w-full max-w-[240px] self-end lg:max-w-none">
              <div className="relative mx-auto aspect-3/4 w-[min(100%,220px)] sm:w-[240px] lg:w-[260px]">
                <img
                  src={president.photo}
                  alt={president.name[lang]}
                  className="absolute bottom-0 left-1/2 h-[125%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>

            <div className="relative z-0 pb-5 text-center sm:pb-6 lg:pb-7 lg:text-left">
              <span className="gold-shimmer inline-block rounded-full px-5 py-2 text-base font-black tracking-[0.1em] text-maroon-deep uppercase shadow-sm sm:text-lg">
                {t.presidentLabel}
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-ivory sm:text-4xl lg:text-5xl">
                {president.name[lang]}
              </h3>
              {president.detail?.[lang] && (
                <p className="mt-1.5 text-base text-gold-light/90">{president.detail[lang]}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <div className="flex items-center gap-2 rounded-full border border-gold/35 bg-maroon-deep/45 px-3 py-1.5 text-xs text-gold-light backdrop-blur-sm sm:text-sm">
                  <Award size={14} className="text-gold" />
                  <span>{president.experience[lang]}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gold/35 bg-maroon-deep/45 px-3 py-1.5 text-xs text-gold-light backdrop-blur-sm sm:text-sm">
                  <Heart size={14} className="text-gold" />
                  <span>{president.tagline[lang]}</span>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ivory/90">
                {president.aboutUs[lang]}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <button
                  type="button"
                  onClick={() => setSelected(president)}
                  className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-base font-extrabold text-maroon-deep shadow-[0_12px_32px_rgba(201,162,39,0.4)] transition hover:scale-[1.03] hover:bg-gold-light"
                >
                  {t.moreDetails}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Panel roster */}
        <div className="palace-frame relative overflow-hidden rounded-3xl border border-gold/45 bg-ivory/75 px-3 py-7 shadow-[0_16px_48px_rgba(63,15,26,0.08)] backdrop-blur-md sm:px-8 sm:py-9">
          <PalaceCorners />
          <div className="mb-8">
            <SectionBadge>{t.padadhikariTitle}</SectionBadge>
            <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {otherPadadhikari.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  size="large"
                  onSelect={setSelected}
                  delay={i * 40}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SectionBadge>{t.purushTitle}</SectionBadge>
            <div className="grid grid-cols-3 items-stretch gap-2 sm:grid-cols-5 sm:gap-4">
              {purushKaryakarini.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  size="small"
                  onSelect={setSelected}
                  delay={i * 30}
                />
              ))}
            </div>
          </div>

          <div className="mb-7">
            <SectionBadge>{t.mahilaTitle}</SectionBadge>
            <div className="mx-auto grid max-w-md grid-cols-3 items-stretch gap-3 sm:max-w-lg sm:gap-5">
              {mahilaKaryakarini.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  size="small"
                  onSelect={setSelected}
                  delay={i * 40}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <CandidateModal candidate={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
