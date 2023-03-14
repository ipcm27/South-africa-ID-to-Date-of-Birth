import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SaIdToDobComponent } from './SaIdToDobComponent/SaIdToDobComponent.component';
import { TestingThisComponent } from './testing-this/testing-this.component';

import { CommonModule } from '@angular/common';
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
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from './directive/directives.module';
import { ActivationComponent } from './activation/activation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CIdentityComponent } from './verification/client/c-auth/c-identity/c-identity.component';
import { AlertModule } from '../app/alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    SaIdToDobComponent,
    TestingThisComponent,
    ActivationComponent,
    CIdentityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    DirectivesModule,
    BrowserAnimationsModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
