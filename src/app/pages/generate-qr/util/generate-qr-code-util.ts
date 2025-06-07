import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";

export function getWidthFromQrDisplaySize(qrSize: QrDisplaySizeEnum): number {
    const size = qrSize.toString().split('x');
    return parseInt(size[0], 10);
}

export function getHeightFromQrDisplaySize(qrSize: QrDisplaySizeEnum): number {
    const size = qrSize.toString().split('x');
    return parseInt(size[1], 10);
}