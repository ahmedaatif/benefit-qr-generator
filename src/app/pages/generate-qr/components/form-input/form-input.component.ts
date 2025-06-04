import { Component, EventEmitter, Output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ibanValidator } from '../../../../shared/validators/iban-validator';
import { output } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {

  @Output() private formData: EventEmitter<string> = new EventEmitter<string>();

  public ibanForm = new FormGroup({
    iban: new FormControl<string | null>(null, [Validators.required, ibanValidator()]),
    amount: new FormControl<number | null>(null, [Validators.required]),
  });

  public get iban() {
    return this.ibanForm.get('iban');
  }

  public get amount() {
    return this.ibanForm.get('amount');
  }

  public submit: boolean = false;

  public onSubmit() {
    this.submit = true;
    if (this.ibanForm.invalid) return;
    this.formData.emit(JSON.stringify(this.ibanForm.getRawValue()));
    this.ibanForm.reset();
    this.submit = false;
  }
}
