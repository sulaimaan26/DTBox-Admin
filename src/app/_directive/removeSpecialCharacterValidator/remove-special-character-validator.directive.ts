import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appRemoveSpecialCharacterValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RemoveSpecialCharacterValidatorDirective,
    multi: true
  }]
})
export class RemoveSpecialCharacterValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    if ( !/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/.test(control.value)) {
      return { symbols: true };
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
