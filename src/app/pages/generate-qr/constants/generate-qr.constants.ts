import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";
import { GenerateQrFormInterface } from "../interfaces/generate-qr-form.interface";

export const DEFAULT_QR_CODE_DATA: GenerateQrFormInterface = {
    iban: '',
    amount: 0,
    pageSize: QrDisplaySizeEnum.A4,
    showIban: true
};