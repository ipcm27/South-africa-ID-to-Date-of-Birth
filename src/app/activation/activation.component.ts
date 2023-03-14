import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  ricaFormGroup!: FormGroup;
  ricaTouched: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ricaFormGroup = this.formBuilder.group({
      ricaDetailsAddress1: ['', Validators.required],
      ricaDetailsAddress2: [],
      ricaDetailsSuburb: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^!-&(-,.-@[-_{-~¢-¬®-³¶-¿×÷]*$/),
        ],
      ],
      ricaDetailsCity: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^!-&(-,.-@[-_{-~¢-¬®-³¶-¿×÷]*$/),
        ],
      ],
      ricaDetailsCode: [
        '',
        // this.clientResp.clientData.addressCode,
        [Validators.required, Validators.pattern(/^\d*$/)],
      ],
      ricaDetailsProvince: [
        '',
        // this.clientResp.clientData.addressProvince,
        Validators.required,
      ],
      ricaDetailsAddVerified: ['', Validators.required],
      ricaDetailsVerified: ['', Validators.required],
    });
  }
}
