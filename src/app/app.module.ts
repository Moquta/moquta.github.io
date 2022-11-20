import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DisplayComponent } from './pages/display/display.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SettingsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
