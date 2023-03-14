// import { Component } from '@angular/core';
// import { FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-c-identity-mock',
//   templateUrl: './c-identity-mock.component.html',
//   styleUrls: ['./c-identity-mock.component.css'],
// })
// export class CIdentityMockComponent {
//   clientIDType: string = '';
//   type: string = '';
//   clientDOB: any;
//   processing: boolean = false;
//   clientValidation: FormGroup;
//   validateClientAge() {}
//   onKeydownId($event: Event) {}
//   updateType(element: string) {}

//   constructor(){
//     this.clientValidation = this.formBuilder.group({
//       idType: this.type,
//       dob: [this.clientDOB, [Validators.required]],
//       id: [
//         this.idNumber,
//         [
//           Validators.required,
//           Validators.minLength(5),
//           Validators.maxLength(13),
//           this.idValidation,
//         ],
//       ],
//     });
//   }
// }
