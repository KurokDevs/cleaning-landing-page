import { es } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';
export type Translation = typeof en;

const translations = { es, en } as const;

/**
 * Returns the translation object for the given language.
 * Use in `.astro` files: `const t = useTranslations(lang)`.
 */
export function useTranslations(lang: Lang): Translation {
  return translations[lang] as Translation;
}

/**
 * Returns the URL for the same page in the opposite language.
 * Example: from "/es/about" returns "/about", from "/" returns "/es/"
 */
export function getAlternateUrl(currentPath: string, currentLang: Lang): string {
  if (currentLang === 'es') {
    // Remove /es prefix
    return currentPath.replace(/^\/es/, '') || '/';
  }
  // Add /es prefix
  return '/es' + (currentPath === '/' ? '/' : currentPath);
}
