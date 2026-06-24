import { PAGE_SIZE_DIMENSIONS_MM } from "../constants/generate-qr.constants";
import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

const MM_PER_INCH = 25.4;

/** Converts a physical length in millimetres to pixels at the given DPI. */
export function mmToPixels(mm: number, dpi: number): number {
    return Math.round((mm / MM_PER_INCH) * dpi);
}

export function getWidthFromQrDisplaySize(qrSize: QrDisplaySizeEnum, dpi: number): number {
    return mmToPixels(PAGE_SIZE_DIMENSIONS_MM[qrSize].widthMm, dpi);
}

export function getHeightFromQrDisplaySize(qrSize: QrDisplaySizeEnum, dpi: number): number {
    return mmToPixels(PAGE_SIZE_DIMENSIONS_MM[qrSize].heightMm, dpi);
}
