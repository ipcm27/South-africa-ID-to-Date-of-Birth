import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ZipCodeValidatorDirective } from "./zip-code-validator.directive";

@Component({
  template: `
    <form [formGroup]="form">
      <input type="text" appZipCodeValidator formControlName="zipCodeInput" />
      <span *ngIf="form.controls['zipCodeInput'].hasError('invalidInput')"
        >PLease insert a 4 digit number</span
      >
    </form>
  `,
})
class TestComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      zipCodeInput: new FormControl("", [Validators.required]),
    });
  }

  ricaSubmit() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }
}

describe("ZipCodeValidatorDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TestComponent, ZipCodeValidatorDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css("input"));

    fixture.detectChanges();
  });

  it("should set invalidInput error if the value is less than 4", () => {
    inputElement.nativeElement.value = "123";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const formControl = component.form.controls["zipCodeInput"];
    expect(formControl.hasError("invalidInput")).toBeTruthy();
  });

  it("should set invalidInput error if the value is 0000", () => {
    inputElement.nativeElement.value = "0000";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const formControl = component.form.controls["zipCodeInput"];
    expect(formControl.hasError("invalidInput")).toBeTruthy();
  });

  it("should set invalidInput error if the value is 1234", () => {
    inputElement.nativeElement.value = "0000";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const formControl = component.form.controls["zipCodeInput"];
    expect(formControl.hasError("invalidInput")).toBeTruthy();
  });

  it("should not allow submit if the form has an error", () => {
    const formControl = component.form.controls["zipCodeInput"];
    formControl.setErrors({ invalidInput: true });
    fixture.detectChanges();
    const result = component.ricaSubmit();
    expect(result).toBe(false);
  });

  it("should set invalidInput error if the value is more than 4", () => {
    inputElement.nativeElement.value = "12345";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    const formControl = component.form.controls["zipCodeInput"];
    expect(formControl.hasError("invalidInput")).toBeTruthy();
  });

  it("should allow 4 digits and have no error", () => {
    inputElement.nativeElement.value = "1221";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    const formControl = component.form.controls["zipCodeInput"];
    const result = component.ricaSubmit();
    expect(result).toBe(true);
    expect(inputElement.nativeElement.value).toBe("1221");
  });

  it("should not allow more than 4 digits", () => {
    inputElement.nativeElement.value = "12345";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(inputElement.nativeElement.value).toBe("1234");
  });

  it("should not allow letters or symbols", () => {
    inputElement.nativeElement.value = "!@ab";
    inputElement.nativeElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toBe("");
  });
});
