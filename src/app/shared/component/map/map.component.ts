import { Component, OnInit, Input } from '@angular/core'
import { CommonService } from '../../services/common.servie';

declare var ol: any;

@Component({
    selector: 'shared-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.less']
})

export class MapComponent implements OnInit {
    // Default Value Initially
    latitude: number = 18.5204135
    longitude: number = 73.8566888
    zoom = 16

    constructor(private commonSvc: CommonService) {}

    // Subscribe to change of coordinate from address component
    ngOnInit() { 
        this.commonSvc.coords.subscribe(val => {
            this.longitude = val.lng
            this.latitude = val.lat
        })
     }

    // Deals with marker relocation
    markerDragEnd($event) {
        console.log('dragEnd', $event);
        this.commonSvc.setPosition($event.coords.lat, $event.coords.lng)
    }

}