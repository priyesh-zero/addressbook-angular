import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddressComponent } from './shared/component/address/address.component';
import { AgmCoreModule } from '@agm/core'
import { GooglePlaceModule } from "ngx-google-places-autocomplete"

import { CommonService } from './shared/services/common.servie';
import { MapComponent } from './shared/component/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { AddressCardComponent } from './shared/component/address-card/address-card';
@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    MapComponent,
    AddressCardComponent
  ],
  imports: [
    GooglePlaceModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
      apiKey: 'AIzaSyARR7uFPjj5hVSlCnTgYiq0VnfG2qM8d_A'
    })
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
