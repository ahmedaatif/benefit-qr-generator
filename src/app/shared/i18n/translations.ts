export type Language = 'en' | 'ar';

export type Direction = 'ltr' | 'rtl';

/** Per-language metadata used to drive document `lang`/`dir` and the toggle label. */
export const LANGUAGE_META: Record<Language, { dir: Direction; label: string }> = {
  en: { dir: 'ltr', label: 'English' },
  ar: { dir: 'rtl', label: 'العربية' },
};

/**
 * Flat, dot-namespaced translation dictionary. Each key maps to its text in
 * every supported language so missing translations are obvious at a glance.
 */
export const TRANSLATIONS = {
  'header.brand': { en: 'Benefit QR Generator', ar: 'مولّد رمز بنفت QR' },
  'header.nav.home': { en: 'Home', ar: 'الرئيسية' },
  'header.nav.generateQr': { en: 'Generate QR', ar: 'إنشاء رمز QR' },

  'home.hero.title': {
    en: 'Generate Stunning Benefit QR Codes Instantly!',
    ar: 'أنشئ رموز بنفت QR مذهلة على الفور!',
  },
  'home.hero.subtitle': {
    en: 'Create custom Benefit QR codes for your business, events, or personal use with ease.',
    ar: 'أنشئ رموز بنفت QR مخصصة لعملك أو فعالياتك أو استخدامك الشخصي بكل سهولة.',
  },
  'home.hero.cta': { en: 'Generate Your QR Code Now!', ar: 'أنشئ رمز QR الخاص بك الآن!' },
  'home.features.title': {
    en: 'Powerful Features at Your Fingertips',
    ar: 'ميزات قوية في متناول يدك',
  },
  'home.features.sizes.title': { en: 'Customizable Sizes', ar: 'أحجام قابلة للتخصيص' },
  'home.features.sizes.text': {
    en: 'Adjust the size of your Benefit QR code to fit perfectly wherever you need it.',
    ar: 'اضبط حجم رمز بنفت QR ليناسب المكان الذي تحتاجه تمامًا.',
  },
  'home.features.headerFooter.title': { en: 'Header and Footers', ar: 'الرأس والتذييل' },
  'home.features.headerFooter.text': {
    en: 'Need to add supporting text? We got you covered with the optional header and footers!',
    ar: 'تحتاج إلى إضافة نص داعم؟ نوفّر لك ذلك عبر الرأس والتذييل الاختياريين!',
  },
  'home.features.preview.title': { en: 'Live Preview', ar: 'معاينة مباشرة' },
  'home.features.preview.text': {
    en: 'See your Benefit QR code change in real-time as you customize it, ensuring you get exactly what you envision.',
    ar: 'شاهد رمز بنفت QR يتغيّر في الوقت الفعلي أثناء تخصيصه لتحصل على ما تتخيّله تمامًا.',
  },

  'footer.title': { en: 'Benefit QR Generator', ar: 'مولّد رمز بنفت QR' },
  'footer.description': {
    en: 'benefit.ahmed.plus is a free service to allow you to generate QR codes for your various payment needs.',
    ar: 'benefit.ahmed.plus هي خدمة مجانية تتيح لك إنشاء رموز QR لاحتياجات الدفع المختلفة.',
  },
  'footer.openSource.prefix': {
    en: 'This website is open source and available on',
    ar: 'هذا الموقع مفتوح المصدر ومتاح على',
  },
  'footer.openSource.suffix': { en: '. Contribution is welcome!', ar: '. المساهمات مرحّب بها!' },

  'generateQr.iban.label': { en: 'IBAN', ar: 'رقم الآيبان' },
  'generateQr.iban.placeholder': { en: 'IBAN', ar: 'رقم الآيبان' },
  'generateQr.iban.help': {
    en: 'International Bank Account Number',
    ar: 'رقم الحساب المصرفي الدولي',
  },
  'generateQr.iban.invalid': { en: 'Entered IBAN is invalid', ar: 'رقم الآيبان المُدخل غير صالح' },
  'generateQr.amount.label': { en: 'Amount', ar: 'المبلغ' },
  'generateQr.amount.placeholder': { en: 'Amount (BHD)', ar: 'المبلغ (د.ب)' },
  'generateQr.header.label': { en: 'Header', ar: 'الرأس' },
  'generateQr.header.help': {
    en: 'Will be displayed above the QR code',
    ar: 'سيظهر أعلى رمز QR',
  },
  'generateQr.footer.label': { en: 'Footer', ar: 'التذييل' },
  'generateQr.footer.help': {
    en: 'Will be displayed below the QR code',
    ar: 'سيظهر أسفل رمز QR',
  },
  'generateQr.optional': { en: 'Optional', ar: 'اختياري' },
  'generateQr.pageSize.label': { en: 'Page Size', ar: 'حجم الصفحة' },
  'generateQr.dpi.label': { en: 'DPI (resolution)', ar: 'الدقة (DPI)' },
  'generateQr.dpi.help': {
    en: 'Higher DPI produces a larger, sharper image for the chosen page size',
    ar: 'تنتج دقة DPI أعلى صورة أكبر وأوضح لحجم الصفحة المختار',
  },
  'generateQr.showIban': { en: 'Show IBAN', ar: 'إظهار رقم الآيبان' },
  'generateQr.save': { en: 'Save', ar: 'حفظ' },
  'generateQr.required': { en: 'This field is required.', ar: 'هذا الحقل مطلوب.' },

  'generateQr.size.A3': { en: 'A3 Portrait (297 × 420mm)', ar: 'A3 عمودي (297 × 420 مم)' },
  'generateQr.size.A4': { en: 'A4 Portrait (210 × 297mm)', ar: 'A4 عمودي (210 × 297 مم)' },
  'generateQr.size.A5': { en: 'A5 Portrait (148 × 210mm)', ar: 'A5 عمودي (148 × 210 مم)' },
  'generateQr.size.A3_LANDSCAPE': {
    en: 'A3 Landscape (420 × 297mm)',
    ar: 'A3 أفقي (420 × 297 مم)',
  },
  'generateQr.size.A4_LANDSCAPE': {
    en: 'A4 Landscape (297 × 210mm)',
    ar: 'A4 أفقي (297 × 210 مم)',
  },
  'generateQr.size.A5_LANDSCAPE': {
    en: 'A5 Landscape (210 × 148mm)',
    ar: 'A5 أفقي (210 × 148 مم)',
  },

  'generateQr.success.title': { en: 'Generated QR code successfully!', ar: 'تم إنشاء رمز QR بنجاح!' },
  'generateQr.success.subtitle': {
    en: 'The file should start downloading soon.',
    ar: 'سيبدأ تنزيل الملف قريبًا.',
  },
  'generateQr.success.again': { en: 'Generate another', ar: 'إنشاء رمز آخر' },

  'notFound.message': { en: 'Page not found.', ar: 'الصفحة غير موجودة.' },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;
