import { PAGE_SIZE_DIMENSIONS } from "../constants/generate-qr.constants";
import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

const MM_PER_INCH = 25.4;

/** Converts a physical length in millimetres to pixels at the given DPI. */
export function mmToPixels(mm: number, dpi: number): number {
    return Math.round((mm / MM_PER_INCH) * dpi);
}

/**
 * Export canvas size in pixels for the chosen page size. Print sizes scale by DPI;
 * screen/social sizes use their fixed pixel dimensions and ignore DPI.
 */
export function getExportDimensions(qrSize: QrDisplaySizeEnum, dpi: number): { width: number; height: number } {
    const size = PAGE_SIZE_DIMENSIONS[qrSize];
    if (size.pixelNative) {
        return { width: size.width, height: size.height };
    }
    return { width: mmToPixels(size.width, dpi), height: mmToPixels(size.height, dpi) };
}
