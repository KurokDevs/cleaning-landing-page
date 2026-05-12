import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { es, en, type Lang, type Translation } from "./translations"

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const translations = { es, en }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'es' || saved === 'en') {
      setLang(saved)
    }
  }, [])

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useTranslation() {
  const { t } = useLanguage()
  return t
}
