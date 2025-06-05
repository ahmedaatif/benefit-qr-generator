import { Component } from '@angular/core';
import { FormInputComponent } from "./components/form-input/form-input.component";
import { GeneratedQrCodeDisplayComponent } from "./components/generated-qr-code-display/generated-qr-code-display.component";

@Component({
  selector: 'app-generate-qr',
  imports: [FormInputComponent, GeneratedQrCodeDisplayComponent],
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
