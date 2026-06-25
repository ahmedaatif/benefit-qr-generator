import { QrDisplaySizeEnum } from "../enums/qr-display-size.enum";
import { GenerateQrFormInterface, QrFontSize, QrThemeInterface } from "../interfaces/generate-qr-form.interface";
import { TranslationKey } from "../../../shared/i18n/translations";

/** Print sizes are physical (mm) and scale with DPI; screen sizes are a fixed pixel canvas. */
export type PageSizeGroup = 'print' | 'screen';

export interface PageSizeOption {
    value: QrDisplaySizeEnum;
    labelKey: TranslationKey;
    group: PageSizeGroup;
    /** When true the export canvas is a fixed pixel size and DPI does not apply. */
    pixelNative: boolean;
    /** Native dimensions: millimetres for print sizes, pixels for screen sizes. */
    width: number;
    height: number;
}

/** Physical page dimensions in millimetres. Landscape variants swap width/height. */
const PRINT_SIZE_OPTIONS: PageSizeOption[] = [
    { value: QrDisplaySizeEnum.A3, labelKey: 'generateQr.size.A3', group: 'print', pixelNative: false, width: 297, height: 420 },
    { value: QrDisplaySizeEnum.A4, labelKey: 'generateQr.size.A4', group: 'print', pixelNative: false, width: 210, height: 297 },
    { value: QrDisplaySizeEnum.A5, labelKey: 'generateQr.size.A5', group: 'print', pixelNative: false, width: 148, height: 210 },
    { value: QrDisplaySizeEnum.A3_LANDSCAPE, labelKey: 'generateQr.size.A3_LANDSCAPE', group: 'print', pixelNative: false, width: 420, height: 297 },
    { value: QrDisplaySizeEnum.A4_LANDSCAPE, labelKey: 'generateQr.size.A4_LANDSCAPE', group: 'print', pixelNative: false, width: 297, height: 210 },
    { value: QrDisplaySizeEnum.A5_LANDSCAPE, labelKey: 'generateQr.size.A5_LANDSCAPE', group: 'print', pixelNative: false, width: 210, height: 148 },
];

/** Screen and social formats with a fixed pixel canvas; DPI is irrelevant for these. */
const SCREEN_SIZE_OPTIONS: PageSizeOption[] = [
    { value: QrDisplaySizeEnum.INSTAGRAM_STORY, labelKey: 'generateQr.size.INSTAGRAM_STORY', group: 'screen', pixelNative: true, width: 1080, height: 1920 },
    { value: QrDisplaySizeEnum.INSTAGRAM_POST, labelKey: 'generateQr.size.INSTAGRAM_POST', group: 'screen', pixelNative: true, width: 1080, height: 1080 },
    { value: QrDisplaySizeEnum.DESKTOP_1080P, labelKey: 'generateQr.size.DESKTOP_1080P', group: 'screen', pixelNative: true, width: 1920, height: 1080 },
];

export const PAGE_SIZE_OPTIONS: PageSizeOption[] = [...PRINT_SIZE_OPTIONS, ...SCREEN_SIZE_OPTIONS];

export interface PageSizeGroupOption {
    labelKey: TranslationKey;
    options: PageSizeOption[];
}

/** Page sizes grouped for rendering as `<optgroup>`s in the size selector. */
export const PAGE_SIZE_GROUPS: PageSizeGroupOption[] = [
    { labelKey: 'generateQr.sizeGroup.print', options: PRINT_SIZE_OPTIONS },
    { labelKey: 'generateQr.sizeGroup.screen', options: SCREEN_SIZE_OPTIONS },
];

/** Quick lookup of a page size's definition keyed by its value. */
export const PAGE_SIZE_DIMENSIONS: Record<QrDisplaySizeEnum, PageSizeOption> =
    PAGE_SIZE_OPTIONS.reduce((acc, option) => {
        acc[option.value] = option;
        return acc;
    }, {} as Record<QrDisplaySizeEnum, PageSizeOption>);

/** Whether the given page size has a fixed pixel canvas (DPI does not apply). */
export function isPixelNativeSize(qrSize: QrDisplaySizeEnum): boolean {
    return PAGE_SIZE_DIMENSIONS[qrSize].pixelNative;
}

/** Popular DPI choices for the export resolution. */
export const DPI_OPTIONS: number[] = [72, 96, 150, 200, 300];

export const DEFAULT_DPI: number = 150;

/** Default appearance — reproduces the original card look (Benefit red header). */
export const DEFAULT_THEME: QrThemeInterface = {
    headerBgColor: '#e90030',
    headerTextColor: '#ffffff',
    footerTextColor: '#212529',
    ibanTextColor: '#212529',
    fontFamily: '',
    fontSize: 'md',
};

export interface ThemePresetOption {
    /** Stable id; 'custom' is reserved for manual colour edits. */
    id: string;
    labelKey: TranslationKey;
    /** Colour overrides applied when the preset is picked. */
    colors: Pick<QrThemeInterface, 'headerBgColor' | 'headerTextColor' | 'footerTextColor' | 'ibanTextColor'>;
}

/** Ready-made colour themes. `applyPreset` patches these onto the form. */
export const THEME_PRESETS: ThemePresetOption[] = [
    {
        id: 'benefit', labelKey: 'generateQr.theme.preset.benefit',
        colors: { headerBgColor: '#e90030', headerTextColor: '#ffffff', footerTextColor: '#212529', ibanTextColor: '#212529' },
    },
    {
        id: 'dark', labelKey: 'generateQr.theme.preset.dark',
        colors: { headerBgColor: '#212529', headerTextColor: '#ffffff', footerTextColor: '#212529', ibanTextColor: '#495057' },
    },
    {
        id: 'mono', labelKey: 'generateQr.theme.preset.mono',
        colors: { headerBgColor: '#000000', headerTextColor: '#ffffff', footerTextColor: '#000000', ibanTextColor: '#6c757d' },
    },
    {
        id: 'ocean', labelKey: 'generateQr.theme.preset.ocean',
        colors: { headerBgColor: '#0d6efd', headerTextColor: '#ffffff', footerTextColor: '#0a3678', ibanTextColor: '#0a3678' },
    },
];

export interface FontOption {
    labelKey: TranslationKey;
    /** CSS font-family stack; empty string inherits the app's system font. */
    value: string;
}

/** Web-safe font stacks only, so the html-to-image PNG export stays faithful. */
export const FONT_OPTIONS: FontOption[] = [
    { labelKey: 'generateQr.theme.font.system', value: '' },
    { labelKey: 'generateQr.theme.font.arial', value: 'Arial, Helvetica, sans-serif' },
    { labelKey: 'generateQr.theme.font.verdana', value: 'Verdana, Geneva, sans-serif' },
    { labelKey: 'generateQr.theme.font.trebuchet', value: '"Trebuchet MS", Helvetica, sans-serif' },
    { labelKey: 'generateQr.theme.font.georgia', value: 'Georgia, "Times New Roman", serif' },
    { labelKey: 'generateQr.theme.font.times', value: '"Times New Roman", Times, serif' },
    { labelKey: 'generateQr.theme.font.courier', value: '"Courier New", Courier, monospace' },
];

export interface FontSizeOption {
    labelKey: TranslationKey;
    value: QrFontSize;
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
    { labelKey: 'generateQr.theme.size.sm', value: 'sm' },
    { labelKey: 'generateQr.theme.size.md', value: 'md' },
    { labelKey: 'generateQr.theme.size.lg', value: 'lg' },
];

/** Multiplier applied to the card's text sizes for each font-size choice. */
export const FONT_SIZE_SCALE: Record<QrFontSize, number> = {
    sm: 0.85,
    md: 1,
    lg: 1.2,
};

export const DEFAULT_QR_CODE_DATA: GenerateQrFormInterface = {
    iban: '',
    amount: 0,
    pageSize: QrDisplaySizeEnum.A4,
    dpi: DEFAULT_DPI,
    showIban: true,
    theme: DEFAULT_THEME,
};
