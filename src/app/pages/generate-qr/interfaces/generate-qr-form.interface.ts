import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

export interface GenerateQrFormInterface {
    iban: string;
    amount: number;
    pageSize: QrDisplaySizeEnum;
}