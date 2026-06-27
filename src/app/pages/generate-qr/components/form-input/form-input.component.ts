import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ibanValidator } from '../../../../shared/validators/iban-validator';
import { QrDisplaySizeEnum } from '../../enums/qr-display-size.enum';
import { GenerateQrFormInterface, QrFontSize, QrThemeInterface } from '../../interfaces/generate-qr-form.interface';
import {
  DEFAULT_DPI,
  DEFAULT_THEME,
  DPI_OPTIONS,
  FONT_OPTIONS,
  FONT_SIZE_OPTIONS,
  FontOption,
  FontSizeOption,
  isPixelNativeSize,
  PAGE_SIZE_GROUPS,
  PageSizeGroupOption,
  THEME_PRESETS,
  ThemePresetOption,
} from '../../constants/generate-qr.constants';
import { TranslationKey } from '../../../../shared/i18n/translations';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';

interface WizardStep {
  titleKey: TranslationKey;
  /** Controls that gate advancing past this step. */
  controls: string[];
}

@Component({
  selector: 'app-form-input',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-input.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent implements OnInit {

  /** When provided, the form opens pre-filled with these values (edit mode). */
  @Input() public data: GenerateQrFormInterface | null = null;

  @Output() private formData: EventEmitter<GenerateQrFormInterface> = new EventEmitter<GenerateQrFormInterface>();
  @Output() private saveQrImage: EventEmitter<void> = new EventEmitter<void>();

  public submit: boolean = false;

  public currentStep: number = 0;

  public readonly steps: WizardStep[] = [
    { titleKey: 'generateQr.step.payment', controls: ['iban', 'amount'] },
    { titleKey: 'generateQr.step.content', controls: ['header', 'footer'] },
    { titleKey: 'generateQr.step.format', controls: ['pageSize', 'dpi'] },
    { titleKey: 'generateQr.step.appearance', controls: ['headerBgColor', 'headerTextColor', 'footerTextColor', 'ibanTextColor', 'fontFamily', 'fontSize'] },
  ];

  public pageSizeGroups: PageSizeGroupOption[] = PAGE_SIZE_GROUPS;
  public dpiOptions: number[] = DPI_OPTIONS;
  public themePresets: ThemePresetOption[] = THEME_PRESETS;
  public fontOptions: FontOption[] = FONT_OPTIONS;
  public fontSizeOptions: FontSizeOption[] = FONT_SIZE_OPTIONS;

  public activePreset: string = THEME_PRESETS[0].id;

  public ibanForm = new FormGroup({
    iban: new FormControl<string>('', [Validators.required, ibanValidator()]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    showIban: new FormControl<boolean>(false),
    header: new FormControl<string>(''),
    footer: new FormControl<string>(''),
    pageSize: new FormControl<QrDisplaySizeEnum>(QrDisplaySizeEnum.A4),
    dpi: new FormControl<number>(DEFAULT_DPI),
    headerBgColor: new FormControl<string>(DEFAULT_THEME.headerBgColor),
    headerTextColor: new FormControl<string>(DEFAULT_THEME.headerTextColor),
    footerTextColor: new FormControl<string>(DEFAULT_THEME.footerTextColor),
    ibanTextColor: new FormControl<string>(DEFAULT_THEME.ibanTextColor),
    fontFamily: new FormControl<string>(DEFAULT_THEME.fontFamily),
    fontSize: new FormControl<QrFontSize>(DEFAULT_THEME.fontSize),
  });

  public ngOnInit(): void {
    this.ibanForm.get('pageSize')!.valueChanges.subscribe((size) => this.syncDpiState(size));
    this.ibanForm.valueChanges.subscribe(() => this.emitFormData());
    if (this.data) this.initFromData(this.data);
  }

  /** Pre-fills the form when re-opened to edit previously generated values. */
  private initFromData(data: GenerateQrFormInterface): void {
    const theme = data.theme ?? DEFAULT_THEME;
    this.ibanForm.patchValue({
      iban: data.iban,
      amount: data.amount || null,
      showIban: data.showIban,
      header: data.header ?? '',
      footer: data.footer ?? '',
      pageSize: data.pageSize,
      dpi: data.dpi,
      headerBgColor: theme.headerBgColor,
      headerTextColor: theme.headerTextColor,
      footerTextColor: theme.footerTextColor,
      ibanTextColor: theme.ibanTextColor,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
    }, { emitEvent: false });
    this.syncDpiState(data.pageSize);
    this.activePreset = this.detectPreset(theme);
  }

  /** Matches the theme colours against a known preset, falling back to "custom". */
  private detectPreset(theme: QrThemeInterface): string {
    const eq = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
    const match = THEME_PRESETS.find((preset) =>
      eq(preset.colors.headerBgColor, theme.headerBgColor) &&
      eq(preset.colors.headerTextColor, theme.headerTextColor) &&
      eq(preset.colors.footerTextColor, theme.footerTextColor) &&
      eq(preset.colors.ibanTextColor, theme.ibanTextColor)
    );
    return match ? match.id : 'custom';
  }

  public get iban() {
    return this.ibanForm.get('iban');
  }

  public get amount() {
    return this.ibanForm.get('amount');
  }

  public get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  /** DPI only applies to physical print sizes; pixel-native sizes export at a fixed resolution. */
  public get dpiDisabled(): boolean {
    return isPixelNativeSize(this.ibanForm.get('pageSize')!.value!);
  }

  public isStepValid(index: number): boolean {
    // A disabled control (e.g. DPI on pixel-native sizes) reports as not-valid in
    // Angular, so treat disabled controls as satisfied for step gating.
    return this.steps[index].controls.every((name) => {
      const control = this.ibanForm.get(name)!;
      return control.disabled || control.valid;
    });
  }

  /** A step can be jumped to only once every preceding step is valid. */
  public canReach(index: number): boolean {
    for (let i = 0; i < index; i++) {
      if (!this.isStepValid(i)) return false;
    }
    return true;
  }

  public goToStep(index: number): void {
    if (index === this.currentStep) return;
    if (index < this.currentStep || this.canReach(index)) {
      this.currentStep = index;
      this.submit = false;
    } else {
      this.submit = true;
    }
  }

  public next(): void {
    if (!this.isStepValid(this.currentStep)) {
      this.submit = true;
      return;
    }
    this.submit = false;
    if (!this.isLastStep) this.currentStep++;
  }

  public back(): void {
    if (this.currentStep > 0) this.currentStep--;
    this.submit = false;
  }

  public applyPreset(preset: ThemePresetOption): void {
    this.ibanForm.patchValue(preset.colors);
    this.activePreset = preset.id;
  }

  /** Manual colour edits detach from any preset. */
  public onColorEdited(): void {
    this.activePreset = 'custom';
  }

  public resetTheme(): void {
    this.ibanForm.patchValue({
      headerBgColor: DEFAULT_THEME.headerBgColor,
      headerTextColor: DEFAULT_THEME.headerTextColor,
      footerTextColor: DEFAULT_THEME.footerTextColor,
      ibanTextColor: DEFAULT_THEME.ibanTextColor,
      fontFamily: DEFAULT_THEME.fontFamily,
      fontSize: DEFAULT_THEME.fontSize,
    });
    this.activePreset = THEME_PRESETS[0].id;
  }

  /** Routes the native form submit (e.g. Enter key): advance, or generate on the last step. */
  public onFormSubmit(): void {
    if (this.isLastStep) this.onSubmit();
    else this.next();
  }

  public onSubmit(): void {
    this.submit = true;
    if (this.ibanForm.invalid) {
      this.currentStep = 0;
      return;
    }
    // Emit only — do not reset here. Resetting would emit empty data and blank the
    // preview before it is captured. The form is recreated (and thus reset) when the
    // user chooses "Generate another".
    this.saveQrImage.emit();
  }

  private emitFormData(): void {
    const value = this.ibanForm.getRawValue();
    this.formData.emit({
      iban: value.iban ?? '',
      amount: value.amount as number,
      header: value.header ?? '',
      footer: value.footer ?? '',
      pageSize: value.pageSize!,
      dpi: value.dpi!,
      showIban: value.showIban!,
      theme: {
        headerBgColor: value.headerBgColor!,
        headerTextColor: value.headerTextColor!,
        footerTextColor: value.footerTextColor!,
        ibanTextColor: value.ibanTextColor!,
        fontFamily: value.fontFamily!,
        fontSize: value.fontSize!,
      },
    });
  }

  /** Enables or disables the DPI control to match whether the selected size uses DPI. */
  private syncDpiState(size: QrDisplaySizeEnum | null): void {
    const dpiControl = this.ibanForm.get('dpi')!;
    if (size && isPixelNativeSize(size)) {
      dpiControl.disable({ emitEvent: false });
    } else {
      dpiControl.enable({ emitEvent: false });
    }
  }

}
