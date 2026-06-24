import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";
import { GenerateQrFormInterface } from "../interfaces/generate-qr-form.interface";
import { TranslationKey } from "../../../shared/i18n/translations";

export interface PageSizeOption {
    value: QrDisplaySizeEnum;
    labelKey: TranslationKey;
    widthMm: number;
    heightMm: number;
}

/** Physical page dimensions in millimetres. Landscape variants swap width/height. */
export const PAGE_SIZE_OPTIONS: PageSizeOption[] = [
    { value: QrDisplaySizeEnum.A3, labelKey: 'generateQr.size.A3', widthMm: 297, heightMm: 420 },
    { value: QrDisplaySizeEnum.A4, labelKey: 'generateQr.size.A4', widthMm: 210, heightMm: 297 },
    { value: QrDisplaySizeEnum.A5, labelKey: 'generateQr.size.A5', widthMm: 148, heightMm: 210 },
    { value: QrDisplaySizeEnum.A3_LANDSCAPE, labelKey: 'generateQr.size.A3_LANDSCAPE', widthMm: 420, heightMm: 297 },
    { value: QrDisplaySizeEnum.A4_LANDSCAPE, labelKey: 'generateQr.size.A4_LANDSCAPE', widthMm: 297, heightMm: 210 },
    { value: QrDisplaySizeEnum.A5_LANDSCAPE, labelKey: 'generateQr.size.A5_LANDSCAPE', widthMm: 210, heightMm: 148 },
];

/** Quick lookup of page dimensions (mm) keyed by page size. */
export const PAGE_SIZE_DIMENSIONS_MM: Record<QrDisplaySizeEnum, { widthMm: number; heightMm: number }> =
    PAGE_SIZE_OPTIONS.reduce((acc, option) => {
        acc[option.value] = { widthMm: option.widthMm, heightMm: option.heightMm };
        return acc;
    }, {} as Record<QrDisplaySizeEnum, { widthMm: number; heightMm: number }>);

/** Popular DPI choices for the export resolution. */
export const DPI_OPTIONS: number[] = [72, 96, 150, 200, 300];

export const DEFAULT_DPI: number = 150;

export const DEFAULT_QR_CODE_DATA: GenerateQrFormInterface = {
    iban: '',
    amount: 0,
    pageSize: QrDisplaySizeEnum.A4,
    dpi: DEFAULT_DPI,
    showIban: true
};
