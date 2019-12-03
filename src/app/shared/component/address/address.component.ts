import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { CommonService } from '../../services/common.servie';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  isSubmitted = false;
  public states = []; 

  constructor(private fb: FormBuilder, private commonSvc:CommonService) {  }

  // @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
  public handleAddressChange(address: Address) {
  // Do some stuff
    this.commonSvc.setPosition(address.geometry.location.lat(), address.geometry.location.lng())
  }
  // ngOnInit calls a form builder and subscribe to a address change function
  ngOnInit() {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locality: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cdt: ['', [Validators.required]],
      state: ['', [Validators.required]],
      landmark: '',
      alternatePhone: '',
      search: '',
      addressType: ['home', [Validators.required]]
    });
    this.commonSvc.addrObs.subscribe(address => {
      this.addressForm.controls['pincode'].setValue(address.postalCode)
      this.addressForm.controls['locality'].setValue(address.locality)
      this.addressForm.controls['address'].setValue(address.formattedAddress)
      this.addressForm.controls['cdt'].setValue(address.city)
      this.addressForm.controls['state'].setValue(address.state)
    })
  }

  onSubmit(form: FormGroup) {
    this.isSubmitted = true;
    if(!this.addressForm.valid) {
      return false;
    } else {
      this.commonSvc.addAddress(this.addressForm.value)
      this.addressForm.reset()
    }
  }

  // Gets the geo co-ordinates from the browser and renders error when denied
  getLocation(e) {
    e.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.commonSvc.setPosition(position.coords.latitude, position.coords.longitude)
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
