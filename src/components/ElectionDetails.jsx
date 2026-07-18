import { Calendar, Clock, MapPin, Vote } from 'lucide-react'
import { panelInfo } from '../data/candidates'
import { useLanguage } from '../context/LanguageContext'
import mandala from '../assets/background-mandala.png'

export default function ElectionDetails() {
  const { lang, t } = useLanguage()
  const info = panelInfo

  const votingItems = [
    t.votingTotal,
    t.votingPad,
    t.votingPurush,
    t.votingMahila,
  ]

  const electionItems = [
    { icon: Calendar, label: info.date[lang] },
    { icon: Clock, label: info.time[lang] },
    { icon: MapPin, label: info.venue[lang] },
  ]

  return (
    <section
      id="election-info"
      className="relative scroll-mt-24 overflow-hidden px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-maroon-deep via-maroon to-maroon-deep" />
        <img
          src={mandala}
          alt=""
          className="absolute right-[-8%] top-1/2 h-56 w-56 -translate-y-1/2 opacity-[0.14] sm:h-72 sm:w-72"
        />
        <img
          src={mandala}
          alt=""
          className="absolute left-[-8%] top-1/2 h-56 w-56 -translate-y-1/2 opacity-[0.14] sm:h-72 sm:w-72"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[900px]">
        <div className="mb-4 flex items-center justify-center gap-2 text-center">
          <span className="text-gold text-xs">✦</span>
          <h2 className="font-display text-lg font-bold text-ivory sm:text-xl">
            {info.election[lang]}
          </h2>
          <span className="text-gold text-xs">✦</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {/* मतदान निर्देश */}
          <article className="rounded-2xl border border-gold/45 bg-ivory/[0.08] p-4 shadow-lg backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-gold/25 pb-2.5">
              <Vote size={16} className="text-gold" />
              <h3 className="font-display text-sm font-bold text-gold-light sm:text-base">
                {t.votingTitle}
              </h3>
            </div>
            <ul className="space-y-1.5">
              {votingItems.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-2 text-[11px] leading-snug text-ivory/90 sm:text-xs"
                >
                  <span className="shrink-0 font-semibold text-gold">{i + 1}.</span>
                  <span className="font-hindi">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* चुनाव जानकारी */}
          <article className="rounded-2xl border border-gold/45 bg-ivory/[0.08] p-4 shadow-lg backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-gold/25 pb-2.5">
              <Calendar size={16} className="text-gold" />
              <h3 className="font-display text-sm font-bold text-gold-light sm:text-base">
                {t.electionInfoTitle}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {electionItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Icon size={13} />
                  </span>
                  <span className="text-[11px] leading-snug text-ivory/92 sm:text-xs">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-3 text-center font-display text-xs font-semibold tracking-wide text-gold-light/90 sm:text-sm">
          {info.slogan[lang]}
          <span className="mx-2 text-gold/50">·</span>
          <span className="font-body text-[10px] font-normal text-ivory/60 sm:text-xs">
            {info.footer[lang]}
          </span>
        </p>
      </div>
    </section>
  )
}
