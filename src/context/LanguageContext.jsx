import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('as-lang') || 'hi'
  })

  useEffect(() => {
    localStorage.setItem('as-lang', lang)
    document.body.classList.toggle('lang-hi', lang === 'hi')
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
  }, [lang])

  const t = translations[lang]
  const toggleLang = () => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
