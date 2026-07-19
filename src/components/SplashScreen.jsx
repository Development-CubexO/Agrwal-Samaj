import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import mandala from '../assets/background-mandala.png'
import { useLanguage } from '../context/LanguageContext'
import { panelInfo } from '../data/candidates'

const DISPLAY_MS = 3000
const FADE_MS = 700

export default function SplashScreen({ onDone }) {
  const { lang, t } = useLanguage()
  const [leaving, setLeaving] = useState(false)
  const title =
    lang === 'hi'
      ? 'श्री अग्रवाल समाज केन्द्रीय समिति — द्विवार्षिक चुनाव 2026'
      : 'Shree Agrawal Samaj Kendriya Samiti — Biennial Election 2026'
  const panel = panelInfo.panel[lang]

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLeaving(true), DISPLAY_MS)
    const doneTimer = setTimeout(() => onDone?.(), DISPLAY_MS + FADE_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      className={`splash-screen ${leaving ? 'splash-screen--leave' : ''}`}
      role="dialog"
      aria-label={title}
      aria-live="polite"
    >
      <div className="splash-mandala-layer" aria-hidden>
        <img
          src={mandala}
          alt=""
          className="splash-mandala splash-mandala--center mandala-spin"
        />
        <img
          src={mandala}
          alt=""
          className="splash-mandala splash-mandala--tl mandala-spin-reverse"
        />
        <img
          src={mandala}
          alt=""
          className="splash-mandala splash-mandala--br mandala-spin"
        />
      </div>
      <div className="splash-glow" aria-hidden />
      <div className="splash-logo-wrap">
        <img src={logo} alt={t.brand} className="splash-logo" />
      </div>
      <div className="splash-copy">
        <p className="splash-brand font-display">{title}</p>
        <p className="splash-panel font-display">{panel}</p>
      </div>
    </div>
  )
}
