import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";
import { GenerateQrFormInterface } from "../interfaces/generate-qr-form.interface";

export interface PageSizeOption {
    value: QrDisplaySizeEnum;
    label: string;
    widthMm: number;
    heightMm: number;
}

/** Physical page dimensions in millimetres. Landscape variants swap width/height. */
export const PAGE_SIZE_OPTIONS: PageSizeOption[] = [
    { value: QrDisplaySizeEnum.A3, label: 'A3 Portrait (297 × 420mm)', widthMm: 297, heightMm: 420 },
    { value: QrDisplaySizeEnum.A4, label: 'A4 Portrait (210 × 297mm)', widthMm: 210, heightMm: 297 },
    { value: QrDisplaySizeEnum.A5, label: 'A5 Portrait (148 × 210mm)', widthMm: 148, heightMm: 210 },
    { value: QrDisplaySizeEnum.A3_LANDSCAPE, label: 'A3 Landscape (420 × 297mm)', widthMm: 420, heightMm: 297 },
    { value: QrDisplaySizeEnum.A4_LANDSCAPE, label: 'A4 Landscape (297 × 210mm)', widthMm: 297, heightMm: 210 },
    { value: QrDisplaySizeEnum.A5_LANDSCAPE, label: 'A5 Landscape (210 × 148mm)', widthMm: 210, heightMm: 148 },
];

/** Quick lookup of page dimensions (mm) keyed by page size. */
export const PAGE_SIZE_DIMENSIONS_MM: Record<QrDisplaySizeEnum, { widthMm: number; heightMm: number }> =
    PAGE_SIZE_OPTIONS.reduce((acc, option) => {
        acc[option.value] = { widthMm: option.widthMm, heightMm: option.heightMm };
        return acc;
    }, {} as Record<QrDisplaySizeEnum, { widthMm: number; heightMm: number }>);

/** Popular DPI choices for the export resolution. */
export const DPI_OPTIONS: number[] = [72, 96, 150, 200, 300, 600];

export const DEFAULT_DPI: number = 300;

export const DEFAULT_QR_CODE_DATA: GenerateQrFormInterface = {
    iban: '',
    amount: 0,
    pageSize: QrDisplaySizeEnum.A4,
    dpi: DEFAULT_DPI,
    showIban: true
};
