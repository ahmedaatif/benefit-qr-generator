import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { ibanValidator } from '../../shared/validators/iban-validator';

@Component({
  selector: 'app-generate-qr',
  imports: [FormsModule, ReactiveFormsModule, QRCodeComponent],
  templateUrl: './generate-qr.component.html',
  styleUrl: './generate-qr.component.scss'
})
export class GenerateQrComponent {

  submit: boolean = false;

  ibanForm = new FormGroup({
    iban: new FormControl(null, [Validators.required, ibanValidator()]),
    amount: new FormControl(null, [Validators.required]),
  });

  get iban() {
    return this.ibanForm.get('iban');
  }

  get amount() {
    return this.ibanForm.get('amount');
  }
  generatedData = '';
  // {"iban":"BH86BIBB00100000163300","amount":"0"}

  onSubmit() {
    this.submit = true;
    if (this.ibanForm.invalid) return;
    this.generatedData = JSON.stringify(this.ibanForm.getRawValue());
    console.log(this.ibanForm.getRawValue());
    this.ibanForm.reset();
    this.submit = false;
  }

}
