import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-generated-successfully',
  imports: [TranslatePipe],
  templateUrl: './generated-successfully.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './generated-successfully.component.scss'
})
export class GeneratedSuccessfullyComponent {
  /** Start over with a blank form. */
  @Output() public showForm: EventEmitter<void> = new EventEmitter<void>();
  /** Return to the form keeping the values that were just generated. */
  @Output() public editQr: EventEmitter<void> = new EventEmitter<void>();
}
