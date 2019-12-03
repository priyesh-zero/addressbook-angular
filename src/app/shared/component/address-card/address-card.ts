import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { CommonService } from '../../services/common.servie'

@Component({
    selector: 'address-card',
    templateUrl: './address-card.html',
    styleUrls: ['./address-card.less']
})

export class AddressCardComponent implements OnInit {

    // Input variables for the address book
    @Input() Name: string
    @Input() Phone: string
    @Input() Address: string
    @Input() Type: string
    @Input() Index: string

    constructor(private commonService: CommonService) {}

    ngOnInit() {}

    // Deleting by calling the service delete method.
    delete(index) {
        this.commonService.deleteAddress(index)
    }
}