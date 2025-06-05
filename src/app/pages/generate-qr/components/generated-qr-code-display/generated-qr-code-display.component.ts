import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { GenerateQrFormInterface } from '../../interfaces/generate-qr-form.interface';
import { QrDisplaySizeEnum } from '../../enums/qr-display-size.enum';

@Component({
  selector: 'app-generated-qr-code-display',
  imports: [QRCodeComponent, JsonPipe],
  templateUrl: './generated-qr-code-display.component.html',
  styleUrl: './generated-qr-code-display.component.scss'
})
export class GeneratedQrCodeDisplayComponent {
  @Input() public qrData: GenerateQrFormInterface = this.getDefaultQrData();

  private getDefaultQrData(): GenerateQrFormInterface {
    return {
      iban: '',
      amount: 0,
      pageSize: QrDisplaySizeEnum.A4
    };
  }
}
