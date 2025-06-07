import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { BenefitQrCodeInterface, GenerateQrFormInterface } from '../../interfaces/generate-qr-form.interface';
import { DEFAULT_QR_CODE_DATA } from '../../constants/generate-qr.constants';

@Component({
  selector: 'app-generated-qr-code-display',
  imports: [QRCodeComponent],
  templateUrl: './generated-qr-code-display.component.html',
  styleUrl: './generated-qr-code-display.component.scss'
})
export class GeneratedQrCodeDisplayComponent {
  @Input() public qrData: GenerateQrFormInterface = DEFAULT_QR_CODE_DATA;

  public populateQrCode(qrData: GenerateQrFormInterface): string {
    return JSON.stringify({
      iban: qrData.iban,
      amount: qrData.amount
    } as BenefitQrCodeInterface)
  }
}
