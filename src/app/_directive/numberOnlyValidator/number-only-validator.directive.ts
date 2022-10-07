import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNumberOnlyValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumberOnlyValidatorDirective,
    multi: true
  }]
})
export class NumberOnlyValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    if (/^[0-9]*$/.test(control.value)) {
      return { phoneNumberInvalid: true };
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
