import { Component, output } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-generated-successfully',
  imports: [TranslatePipe],
  templateUrl: './generated-successfully.component.html',
  styleUrl: './generated-successfully.component.scss'
})
export class GeneratedSuccessfullyComponent {
  /** Start over with a blank form. */
  public readonly showForm = output<void>();
  /** Return to the form keeping the values that were just generated. */
  public readonly editQr = output<void>();
}
