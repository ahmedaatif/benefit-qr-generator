import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

export type QrFontSize = 'sm' | 'md' | 'lg';

/** Customizable appearance of the generated QR card. */
export interface QrThemeInterface {
    headerBgColor: string;
    headerTextColor: string;
    footerTextColor: string;
    ibanTextColor: string;
    fontFamily: string;
    fontSize: QrFontSize;
}

export interface GenerateQrFormInterface extends BenefitQrCodeInterface {
    header?: string;
    footer?: string;
    pageSize: QrDisplaySizeEnum;
    dpi: number;
    showIban: boolean;
    theme: QrThemeInterface;
}

export interface BenefitQrCodeInterface {
    iban: string;
    amount: number;
}
