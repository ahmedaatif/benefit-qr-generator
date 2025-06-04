import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormInputComponent } from "./components/form-input/form-input.component";

@Component({
  selector: 'app-generate-qr',
  imports: [FormsModule, ReactiveFormsModule, QRCodeComponent, FormInputComponent],
  templateUrl: './generate-qr.component.html',
  styleUrl: './generate-qr.component.scss'
})
export class GenerateQrComponent {


  // {"iban":"BH86BIBB00100000163300","amount":"0"}

  public qrData: any = undefined;

  public setQrData(data: any): void {
    this.qrData = data;
  }
}
