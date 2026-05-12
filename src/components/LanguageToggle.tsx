import * as React from "react"
import { useLanguage } from "../i18n/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const toggle = () => setLang(lang === 'en' ? 'es' : 'en')

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 bg-white shadow-sm"
      aria-label="Toggle language"
    >
      <span className={`${lang === 'en' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>EN</span>
      <span className="text-gray-300 text-xs">/</span>
      <span className={`${lang === 'es' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>ES</span>
    </button>
  )
}
