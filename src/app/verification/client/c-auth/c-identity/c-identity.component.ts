import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert';
import { ClientDataResp } from '../../../../entities/ClientDataResp';

@Component({
  selector: 'app-c-identity',
  templateUrl: './c-identity.component.html',
  styleUrls: ['./c-identity.component.css'],
})
export class CIdentityComponent implements OnInit {
  clientValidation: any;
  // clientValidation: FormGroup
  type!: string;
  idNumber!: string;
  isValidId!: boolean;
  clientResp!: ClientDataResp;
  errorMsg!: string;
  clientDOB!: string;
  DOBOutput!: string;
  // navAuth!: AuthController;
  clientIDType!: string;
  @ViewChild('id', { static: false })
  idInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dob', { static: false })
  dobInput!: ElementRef<HTMLInputElement>;
  processing!: boolean;
  age!: number;
  serviceClient: any;

  constructor(private route: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // idValidation = (control: AbstractControl): ValidationErrors => {
    // const errors: ValidationErrors = {};
    // // Force type saftey
    // if (typeof control.value === 'string') {
    //   // Perform RSA ID exclusive validation
    //   if (this.type === 'SA') {
    //     // The SA ID must be numeric
    //     if (/^\d*$/.test(control.value)) {
    //       // If it is numeric, perform the Luhn Algorithm to validate the checksum
    //       // Taken from https://github.com/tolbon/luhn-ts/blob/master/src/luhn.ts
    //       let digit = 0;
    //       let sum = 0;
    //       let odd = false;
    //       for (let i: number = control.value.length - 1; i >= 0; i--) {
    //         digit = parseInt(control.value[i], 10);
    //         if (odd) {
    //           digit *= 2;
    //           if (digit > 9) {
    //             // This is shorthand for summing the digits of a two digit number less than 19
    //             digit -= 9;
    //           }
    //         }
    //         odd = !odd;
    //         sum += digit;
    //       }
    //       // If the checksum is valid our sum should be divisble by 10
    //       if (sum % 10 !== 0) {
    //         errors['checksumInvalid'] = true;
    //       }
    //     } else {
    //       errors['nonNumeric'] = true;
    //     }
    //     // Perform passport exclusive validation
    //   } else {
    //     // The passport must only contain alphanumeric characters
    //     if (!/^[a-zA-Z0-9]*$/.test(control.value)) {
    //       errors['invalidCharacters'] = true;
    //     }
    //   }
    // }
    // // Ensure we return null if there is no errors in object
    // return errors === {} ? null : errors;
  // };

  validateClientId() {
    console.debug('processing validateClientId()', this.processing);
    if (!this.processing) {
      // this.alertService.clear();

      this.type = this.clientValidation.get('idType').value;
      console.info('IdType', this.clientValidation.get('idType').value);
      this.idNumber = this.clientValidation.get('id').value;
      console.info('id', this.clientValidation.get('id').value);
      // this.clientDOB = this.clientValidation.get('dob').value;  // added by Njabulo
      console.info('dob', this.clientValidation.get('dob').value);

      if (this.clientValidation.valid) {
        console.debug(' client.id =>', this.idNumber);
        sessionStorage.setItem('client.id', this.idNumber);
        console.debug(' client.id.type =>', this.type);
        sessionStorage.setItem('client.id.type', this.type);

        this.processing = true;
        this.serviceClient
          .ValidateClientId(
            sessionStorage.getItem('session.id'),
            this.idNumber.toLocaleUpperCase(),
            this.type
          )
          .subscribe(
            (data: ClientDataResp) => {
              this.clientResp = data;
              console.debug(
                ' client.bio.id =>',
                this.clientResp.clientData.bioId
              );
              sessionStorage.setItem(
                'client.bio.id',
                this.clientResp.clientData.bioId
              );

              // Check agent SIM stock
              this.serviceClient
                .GetAgentSims(sessionStorage.getItem('session.id'))
                .subscribe(
                  (data: { simCards: string | any[] }) => {
                    this.processing = false;
                    this.route.navigate(['/client-auth']);

                    if (data.simCards.length === 0) {
                      this.alertService.presetError(
                        'clientIDVerification',
                        'noSIMStock',
                        'You have no SIM stock available to issue to clients.'
                      );
                    }
                  },
                  (error: any) => {
                    this.processing = false;
                    this.alertService.presetError(
                      'clientIDVerification',
                      'simStockError',
                      'Failure to retrieve SIM stock information, please try again.'
                    );
                    console.error('SIM Stock Check Error:', error);
                  }
                );
            },
            (error: string) => {
              this.processing = false;
              this.errorMsg = error;
              this.alertService.error(error);
            }
          );
      }
    }
  }

  updateType(type: string) {
    this.idInput.nativeElement.value = '';
    this.dobInput.nativeElement.value = '';
    this.type = type;
    if (this.type === 'SA') {
      this.clientIDType = 'ID Number';
      this.clientDOB = 'Date of Birth'; // Added by Njabulo
    } else {
      this.clientIDType = 'Passport';
      this.clientDOB = 'Date of Birth'; // Added by Njabulo
    }
    this.clientValidation.get('id').updateValueAndValidity();
  }

  getDateFromId(id: string | any[]) {
    const century = '19';
    const century2 = '20';
    const year = Number(id.slice(0, 2));
    const month = id.slice(2, 4);
    const day = id.slice(4, 6);

    if (year > 23 && year <= 99) {
      return `${century}${year}/${month}/${day}`;
    } else {
      return `${century2}${year}/${month}/${day}`;
    }
  }

  validateClientAge() {
    const idType = this.clientValidation.get('idType').value;
    console.info('idType value :', idType);
    const idNumberValue = this.clientValidation.get('id').value;
    console.info('idNumberValue value :', idNumberValue);
    const dateOfBirth = this.clientValidation.get('dob').value;
    console.info('dateOfBirth value :', dateOfBirth);
    let dob = new Date(dateOfBirth);
    console.info('dob value :', dob);

    if (!(dateOfBirth && idNumberValue)) {
      console.log('Please choose your date of birth!');
      this.alertService.clear();
      this.alertService.presetError(
        'clientIDVerification',
        'dobInvalid',
        'Please correct all form errors.'
      );
    }

    const dobVsId = dateOfBirth.slice(2, 10);
    const dobVsId2 = dobVsId.split('-').join('');
    const dobIdValue = idNumberValue.slice(0, 6);
    const minYear = new Date(1920);
    const dobAndIdDiff = dobVsId2 - dobIdValue;
    let birthday;

    if (this.clientValidation.invalid) {
      if (idType === 'SA') {
        this.alertService.clear();
        this.alertService.presetError(
          'clientIDVerification',
          'rsaIDInvalid',
          'Invalid RSA ID, please verify the entered number and try again.'
        );
      } else if (idType === 'Passport') {
        this.alertService.clear();
        this.alertService.presetError(
          'clientIDVerification',
          'passportInvalid',
          'Invalid passport number, please verify the passport number and try again.'
        );
      } else if (idType === 'SA' && dobAndIdDiff !== 0) {
        console.log('ID number and Date of Birth do not align.', dobAndIdDiff);
        this.alertService.clear();

        const dateFromId = this.getDateFromId(idNumberValue);
        this.clientDOB = dateFromId; //newly added to read the dob
        console.log('date from Id: ', dateFromId);
        this.alertService.presetError(
          'clientIDVerification',
          'dobAndIdInvalid',
          'ID number and Date of Birth do not align, please correct the input, and try again.'
        );
      }
    } else {
      const mdate = dateOfBirth.toString();
      const dobYear = parseInt(mdate.substring(0, 4), 10);
      const dobMonth = parseInt(mdate.substring(5, 7), 10);
      const dobDate = parseInt(mdate.substring(8, 10), 10);
      birthday = new Date(dobYear, dobMonth - 1, dobDate);
      const today = new Date();
      const diffMilliSec = today.valueOf() - birthday.valueOf();
      const ageDifMs = Number(Date.now()) - Number(birthday);
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      Math.floor((diffMilliSec % 31536000000) / 86400000);

      Math.floor(Math.floor((diffMilliSec % 31536000000) / 86400000) / 30);
      if (dob > today) {
        this.alertService.presetError(
          'clientIDVerification',
          'dobDateInvalid',
          'Invalid date input - Please try again'
        );
      } else if (idType === 'SA' && dobAndIdDiff !== 0) {
        this.alertService.clear();
        this.alertService.presetError(
          'clientIDVerification',
          'dobAndIdInvalid',
          'ID number and Date of Birth do not align, please correct the input, and try again.'
        );
      } else if (this.age < 18) {
        console.log(
          'You are :',
          this.age,
          'Client must be 18 years or older to RICA. Client logon not authorized.'
        );
        this.alertService.clear();
        this.alertService.presetError(
          'clientIDVerification',
          'dobRestriction',
          'Client must be 18 years or older to register and RICA a SIM. Client logon not authorized.'
        );
      } else if (this.age > 102) {
        this.alertService.clear();
        this.alertService.presetError(
          'clientIDVerification',
          'maxYear',
          'system only accept year from 1920.'
        );
      } else {
        console.log('You are :', this.age, 'Eligible to perform RICA');
        this.alertService.clear();
        this.validateClientId();
      }
    }
  }
}
