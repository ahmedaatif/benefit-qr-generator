import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ibanValidator } from '../../../../shared/validators/iban-validator';
import { QrDisplaySizeEnum } from '../../enums/qr-display-size.enum';
import { GenerateQrFormInterface } from '../../interfaces/generate-qr-form.interface';

@Component({
  selector: 'app-form-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {

  @Output() private formData: EventEmitter<GenerateQrFormInterface> = new EventEmitter<GenerateQrFormInterface>();
  @Output() private saveQrImage: EventEmitter<void> = new EventEmitter<void>();

  public submit: boolean = false;

  public qrDisplaySizeEnum: typeof QrDisplaySizeEnum = QrDisplaySizeEnum;

  public ibanForm = new FormGroup({
    iban: new FormControl<string>('', [Validators.required, ibanValidator()]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    pageSize: new FormControl<QrDisplaySizeEnum>(QrDisplaySizeEnum.A4),
    header: new FormControl<string>(''),
    footer: new FormControl<string>(''),
    showIban: new FormControl<boolean>(false)
  });

  public get iban() {
    return this.ibanForm.get('iban');
  }

  public get amount() {
    return this.ibanForm.get('amount');
  }

  public onChange(): void {
    this.formData.emit(this.ibanForm.getRawValue() as GenerateQrFormInterface);
  }

  public onSubmit(): void {
    this.submit = true;
    if (this.ibanForm.invalid) return;
    this.saveQrImage.emit();
    this.resetForm();
    this.submit = false;
  }

  private resetForm(): void {
    this.ibanForm.reset({
      iban: '',
      amount: null,
      pageSize: QrDisplaySizeEnum.A4,
      header: '',
      footer: '',
      showIban: false
    });
  }
}
