import { ValidatorFn, AbstractControl } from "@angular/forms";
import { isValid } from 'iban-ts';

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;

    if (!value || typeof value !== 'string') {
      return null;
    }

    if (isValid(control.value)) {
      return null
    } else {
      return { invalidIban: 'Invalid IBAN number' };
    }
  };
}