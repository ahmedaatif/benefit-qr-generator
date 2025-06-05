import { Component, EventEmitter, Output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ibanValidator } from '../../../../shared/validators/iban-validator';
import { output } from '@angular/core';
import { QrDisplaySizeEnum } from '../../enums/qr-display-size.enum';
import { BenefitQrCodeInterface } from '../../interfaces/generate-qr-form.interface';

@Component({
  selector: 'app-form-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {

  @Output() private formData: EventEmitter<BenefitQrCodeInterface> = new EventEmitter<BenefitQrCodeInterface>();

  public ibanForm = new FormGroup({
    iban: new FormControl<string>('', [Validators.required, ibanValidator()]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    pageSize: new FormControl<QrDisplaySizeEnum>(QrDisplaySizeEnum.A4),
    header: new FormControl<string>(''),
    footer: new FormControl<string>(''),
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
    this.formData.emit(this.ibanForm.getRawValue() as BenefitQrCodeInterface);
    this.ibanForm.reset();
    this.submit = false;
  }
}
