import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CIdentityComponent } from './c-identity.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import { AlertModule } from '../../../../alert';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CIdentityComponent],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,

    MatFormFieldModule,
    MatInputModule,
    AlertModule,
    MatButtonModule,
  ],
})
export class CIdentityModule {}
