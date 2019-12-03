import { Component } from '@angular/core';
import { CommonService } from './shared/services/common.servie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Address Component';
  showAddressComponent: boolean = false;

  // Calling service for getting the addressList
  constructor(public commonService: CommonService) {}

}
