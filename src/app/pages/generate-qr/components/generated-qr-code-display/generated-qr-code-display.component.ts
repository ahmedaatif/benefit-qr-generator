import { Component, Input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { BenefitQrCodeInterface, GenerateQrFormInterface, QrThemeInterface } from '../../interfaces/generate-qr-form.interface';
import { DEFAULT_QR_CODE_DATA, DEFAULT_THEME, FONT_SIZE_SCALE, PAGE_SIZE_DIMENSIONS } from '../../constants/generate-qr.constants';

@Component({
  selector: 'app-generated-qr-code-display',
  imports: [QRCodeComponent],
  templateUrl: './generated-qr-code-display.component.html',
  styleUrl: './generated-qr-code-display.component.scss'
})
export class GeneratedQrCodeDisplayComponent {
  @Input() public qrData: GenerateQrFormInterface = DEFAULT_QR_CODE_DATA;

  /** CSS aspect-ratio matching the selected page size so the preview (and exported image) is not distorted. */
  public get aspectRatio(): string {
    const dimensions = PAGE_SIZE_DIMENSIONS[this.qrData.pageSize];
    return `${dimensions.width} / ${dimensions.height}`;
  }

  public get isLandscape(): boolean {
    const dimensions = PAGE_SIZE_DIMENSIONS[this.qrData.pageSize];
    return dimensions.width > dimensions.height;
  }

  public get theme(): QrThemeInterface {
    return this.qrData.theme ?? DEFAULT_THEME;
  }

  /** Empty string means "inherit the app font", so resolve it to null to drop the inline style. */
  public get fontFamily(): string | null {
    return this.theme.fontFamily || null;
  }

  private get fontScale(): number {
    return FONT_SIZE_SCALE[this.theme.fontSize] ?? 1;
  }

  public get headerFontSize(): string {
    return `${(1.25 * this.fontScale).toFixed(3)}rem`;
  }

  public get footerFontSize(): string {
    return `${(1.25 * this.fontScale).toFixed(3)}rem`;
  }

  public get ibanFontSize(): string {
    return `${(1 * this.fontScale).toFixed(3)}rem`;
  }

  public populateQrCode(qrData: GenerateQrFormInterface): string {
    return JSON.stringify({
      iban: qrData.iban,
      amount: qrData.amount
    } as BenefitQrCodeInterface)
  }
}
