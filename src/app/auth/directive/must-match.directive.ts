import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validators} from "@angular/forms";
import {MustMatch} from './mast-mutch';

@Directive({
  selector: '[appMustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective implements Validators{

  @Input('appMustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }

}
