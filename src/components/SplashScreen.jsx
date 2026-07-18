import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import mandala from '../assets/background-mandala.png'
import { useLanguage } from '../context/LanguageContext'

const DISPLAY_MS = 3000
const FADE_MS = 700

export default function SplashScreen({ onDone }) {
  const { t } = useLanguage()
  const [leaving, setLeaving] = useState(false)

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
      aria-label={t.brand}
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
      <p className="splash-brand font-display">{t.brand}</p>
    </div>
  )
}
