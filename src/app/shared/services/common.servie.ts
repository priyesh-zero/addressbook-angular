import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
@Injectable()
export class CommonService {

    // Variables defaults
    address = {
        formattedAddress: '',
        locality: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    }

    addressList = []

    showForm = false

    // Behaviour Subject to listen for different changes in variables
    private position = new BehaviorSubject({ lat: null, lng: null })
    coords = this.position.asObservable()

    private addrBS = new BehaviorSubject(this.address)
    addrObs = this.addrBS.asObservable()

    // Subscribing to change in co-ords
    constructor(private http: HttpClient) { 
        this.coords.subscribe(coord => { this.setAddress(coord) })
     }

    // Handles change of coords 
    setAddress(coord) {
        if (!coord.lat || !coord.lng) {
            return
        }
        this.http
            .get(environment.api.googleLocationAPI(coord.lat,coord.lng))
            .pipe(map(res => res["results"][0]))
            .subscribe(res => {
                this.address.formattedAddress = res["formatted_address"]
                res.address_components.forEach(comp => {
                    if (comp.types.includes('country')) {
                        this.address.country = comp["long_name"]
                    } else if (comp.types.includes('postal_code')) {
                        this.address.postalCode = comp["long_name"]
                    } else if(comp.types.includes('administrative_area_level_1')) {
                        this.address.state = comp["long_name"]
                    } else if(comp.types.includes('administrative_area_level_2')) {
                        this.address.city = comp["long_name"]
                    } else if(comp.types.includes('neighborhood')) {
                        this.address.locality = comp["long_name"]
                    }
                })
                console.log(this.address)
                this.addrBS.next(this.address)
            })
    }

    // Sets the coords and fires the BehaviorSubject
    setPosition(lat, lng) {
        this.position.next({ lat, lng })
    }

    // Adds new address to the list
    addAddress(address) {
        this.addressList.push(address)
        this.showForm = false
    }

    // Removes the addresses from the list
    deleteAddress(i) {
        this.addressList = this.addressList.filter((address, index) => {
            return i !== index
        })
    }
}