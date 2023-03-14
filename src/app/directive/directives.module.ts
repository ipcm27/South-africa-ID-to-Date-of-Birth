import {NgModule} from '@angular/core';
import {NumberDirective} from './number.directive';
import { ZipCodeValidatorDirective } from './zip-code-validator.directive';

@NgModule({
  declarations: [
    NumberDirective,
    ZipCodeValidatorDirective
  ],
  exports: [
    NumberDirective,
    ZipCodeValidatorDirective
  ]
})
export class DirectivesModule { }
