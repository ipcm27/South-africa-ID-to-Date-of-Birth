import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appZipCodeValidator]',
})
export class ZipCodeValidatorDirective {
  private regex: RegExp = /^[0-9]*$/;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.control.control != null) {
      const numericValue = value.replace(/\D/g, '');
      this.control.control.setValue(numericValue.slice(0, 4));

      const invalidValues = ['0000', '1234'];
      if (numericValue.length === 4 && !invalidValues.includes(numericValue)) {
        this.control.control.setErrors(null);
      } else {
        this.control.control.setErrors({ invalidInput: true });
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.key);
    if (
      !this.el ||
      !this.regex.test(event.key) ||
      this.el.nativeElement.value.length >= 4
    ) {
      if (event.key === 'Backspace' || event.key === 'Tab') {
        return;
      }
      event.preventDefault();
    }
  }
}
