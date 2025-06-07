import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-generated-successfully',
  imports: [],
  templateUrl: './generated-successfully.component.html',
  styleUrl: './generated-successfully.component.scss'
})
export class GeneratedSuccessfullyComponent {
  @Output() public showForm: EventEmitter<void> = new EventEmitter<void>();
}
