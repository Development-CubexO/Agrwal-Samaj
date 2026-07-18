import {
  Briefcase,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Sparkles,
  Users,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'

const ICONS = [Handshake, GraduationCap, Briefcase, Users, Sparkles, HeartHandshake]

export default function Vision() {
  const { t } = useLanguage()
  const items = t.visionItems || []

  return (
    <section id="vision" className="relative scroll-mt-24 overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="mandala-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 text-center fade-up sm:mb-10">
          <p className="section-ornament mb-3 justify-center">Objectives</p>
          <div className="gold-flourish mb-2">
            <span className="text-gold">✦</span>
          </div>
          <h2 className="section-heading">
            {t.visionTitle}
          </h2>
          <div className="gold-line-thick mx-auto mt-5 w-44" />
          <p className="mt-4 text-base text-ink-muted sm:text-lg">{t.visionSubtitle}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] || Handshake
            return (
              <article
                key={item.title}
                className="palace-frame glass-card fade-up group relative overflow-hidden rounded-3xl px-6 py-8 text-center"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <PalaceCorners />
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-linear-to-br from-gold/20 to-gold/5 text-gold-deep shadow-[0_8px_24px_rgba(201,162,39,0.2)] transition duration-300 group-hover:scale-110 group-hover:border-gold group-hover:from-gold/30">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="section-subheading">
                  {item.title}
                </h3>
                <div className="gold-line mx-auto mt-3 w-14" />
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted sm:text-base">{item.desc}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
