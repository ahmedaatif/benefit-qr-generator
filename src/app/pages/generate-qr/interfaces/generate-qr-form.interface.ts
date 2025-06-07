import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

export interface GenerateQrFormInterface extends BenefitQrCodeInterface {
    header?: string;
    footer?: string;
    pageSize: QrDisplaySizeEnum;
    showIban: boolean;
}

export interface BenefitQrCodeInterface {
    iban: string;
    amount: number;
}