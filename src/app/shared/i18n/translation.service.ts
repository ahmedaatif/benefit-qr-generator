import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  Direction,
  LANGUAGE_META,
  Language,
  LOCALES,
  TranslationKey,
} from './translations';

const STORAGE_KEY = 'app.language';
const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Runtime (no-rebuild) i18n. Holds the active language as a signal, keeps the
 * document `lang`/`dir` attributes in sync, and persists the choice so the
 * page reloads in the last-used language.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);

  private readonly _language = signal<Language>(this.readStoredLanguage());

  /** The currently active language. */
  public readonly language = this._language.asReadonly();

  /** Text direction derived from the active language. */
  public readonly direction = computed<Direction>(() => LANGUAGE_META[this._language()].dir);

  constructor() {
    // Reflect the active language onto <html> and persist it on every change.
    effect(() => {
      const language = this._language();
      const root = this.document.documentElement;
      root.setAttribute('lang', language);
      root.setAttribute('dir', LANGUAGE_META[language].dir);
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // localStorage may be unavailable (e.g. private mode); ignore.
      }
    });
  }

  /** Translate a key into the active language. */
  public translate(key: TranslationKey): string {
    return LOCALES[this._language()][key] ?? key;
  }

  public setLanguage(language: Language): void {
    this._language.set(language);
  }

  /** Switch between the two supported languages. */
  public toggle(): void {
    this._language.update((current) => (current === 'en' ? 'ar' : 'en'));
  }

  /** Native label of the language the toggle would switch *to*. */
  public get oppositeLanguageLabel(): string {
    return LANGUAGE_META[this._language() === 'en' ? 'ar' : 'en'].label;
  }

  private readStoredLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ar') return stored;
    } catch {
      // ignore unavailable storage
    }
    return DEFAULT_LANGUAGE;
  }
}
