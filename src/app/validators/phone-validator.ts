import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PhoneValidators = {
  minLength(minLength: number = 2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneWithoutMasked: string = control.value.replace(/\D/g, '');
      const phoneValid: boolean = phoneWithoutMasked.length >= minLength;
      return !phoneValid ? { notValid: true } : null;
    };
  },
  maxLength(maxLength: number = 2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneWithoutMasked: string = control.value.replace(/\D/g, '');
      const phoneValid: boolean = phoneWithoutMasked.length <= maxLength;
      return !phoneValid ? { notValid: true } : null;
    };
  }
}