import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormInputComponent } from "./components/form-input/form-input.component";
import { GeneratedQrCodeDisplayComponent } from "./components/generated-qr-code-display/generated-qr-code-display.component";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { GenerateQrFormInterface } from './interfaces/generate-qr-form.interface';
import { getHeightFromQrDisplaySize, getWidthFromQrDisplaySize } from './util/generate-qr-code-util';
import { DEFAULT_QR_CODE_DATA } from './constants/generate-qr.constants';
import { GeneratedSuccessfullyComponent } from "./components/generated-successfully/generated-successfully.component";
@Component({
  selector: 'app-generate-qr',
  imports: [FormInputComponent, GeneratedQrCodeDisplayComponent, GeneratedSuccessfullyComponent],
  templateUrl: './generate-qr.component.html',
  styleUrl: './generate-qr.component.scss'
})
export class GenerateQrComponent {
  @ViewChild('qrCodeDisplay', { read: ElementRef }) qrDisplayRef!: ElementRef;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public qrData: GenerateQrFormInterface = DEFAULT_QR_CODE_DATA;

  public showForm: boolean = true;

  public setQrData(data: GenerateQrFormInterface): void {
    this.qrData = data;
  }

  public showFormAndReset(): void {
    this.qrData = DEFAULT_QR_CODE_DATA;
    this.showForm = true;
  }

  public saveQrImage() {
    this.showForm = false;
    const data = this.qrData;
    setTimeout(() => {
      this.cdr.detectChanges();
      const node = this.qrDisplayRef?.nativeElement;
      if (!node) return;

      toPng(node, { canvasWidth: getWidthFromQrDisplaySize(data.pageSize), canvasHeight: getHeightFromQrDisplaySize(data.pageSize), backgroundColor: '#ffffff' })
        .then((dataUrl) => download(dataUrl, `${data.iban}-${data.amount}BHD.png`));
    }, 100);
  }
}
