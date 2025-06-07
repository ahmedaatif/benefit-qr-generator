import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormInputComponent } from "./components/form-input/form-input.component";
import { GeneratedQrCodeDisplayComponent } from "./components/generated-qr-code-display/generated-qr-code-display.component";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { GenerateQrFormInterface } from './interfaces/generate-qr-form.interface';
import { getHeightFromQrDisplaySize, getWidthFromQrDisplaySize } from './util/generate-qr-code-util';
@Component({
  selector: 'app-generate-qr',
  imports: [FormInputComponent, GeneratedQrCodeDisplayComponent],
  templateUrl: './generate-qr.component.html',
  styleUrl: './generate-qr.component.scss'
})
export class GenerateQrComponent {
  @ViewChild('qrCodeDisplay', { read: ElementRef }) qrDisplayRef!: ElementRef;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public qrData: GenerateQrFormInterface | undefined = undefined;

  public setQrData(data: GenerateQrFormInterface): void {
    this.qrData = data;
    this.saveQrImage(data);
  }

  private saveQrImage(data: GenerateQrFormInterface) {
    setTimeout(() => {
      this.cdr.detectChanges();
      const node = this.qrDisplayRef?.nativeElement;
      if (!node) return;

      toPng(node, { canvasWidth: getWidthFromQrDisplaySize(data.pageSize), canvasHeight: getHeightFromQrDisplaySize(data.pageSize), backgroundColor: '#ffffff' })
        .then((dataUrl) => download(dataUrl, `${data.iban}-${data.amount}BHD.png`));
    }, 100);

  }
}
