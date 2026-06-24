import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-generated-successfully',
  imports: [TranslatePipe],
  templateUrl: './generated-successfully.component.html',
  styleUrl: './generated-successfully.component.scss'
})
export class GeneratedSuccessfullyComponent {
  @Output() public showForm: EventEmitter<void> = new EventEmitter<void>();
}
