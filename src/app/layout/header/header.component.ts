import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';
import { TranslationService } from '../../shared/i18n/translation.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected readonly translation = inject(TranslationService);

  protected toggleLanguage(): void {
    this.translation.toggle();
  }
}
