import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';
import { TranslationKey } from './translations';

/**
 * Translates a key into the active language, e.g. `{{ 'header.brand' | translate }}`.
 *
 * Marked impure so it re-evaluates when the language changes (the key input
 * itself stays the same across a language switch).
 */
@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly translation = inject(TranslationService);

  transform(key: TranslationKey): string {
    return this.translation.translate(key);
  }
}
