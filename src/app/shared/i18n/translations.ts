import en from './locales/en.json';
import ar from './locales/ar.json';

export type Language = 'en' | 'ar';

export type Direction = 'ltr' | 'rtl';

/** Per-language metadata used to drive document `lang`/`dir` and the toggle label. */
export const LANGUAGE_META: Record<Language, { dir: Direction; label: string }> = {
  en: { dir: 'ltr', label: 'English' },
  ar: { dir: 'rtl', label: 'العربية' },
};

/** Translation keys are derived from the English locale, which is the source of truth. */
export type TranslationKey = keyof typeof en;

/** Active translation dictionaries, loaded from the per-language JSON files. */
export const LOCALES: Record<Language, Record<TranslationKey, string>> = { en, ar };
