import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SaIdToDobComponent } from './SaIdToDobComponent/SaIdToDobComponent.component';

@NgModule({
  declarations: [AppComponent, SaIdToDobComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
