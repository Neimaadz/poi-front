import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Poi } from '../models';
import { MapsService } from './maps.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {

    pois: Poi[];

    constructor(private mapService: MapsService) {
      this.showPois();
    }

    showPois() {
      this.mapService.getPois()
      .subscribe((data: Poi[]) => this.pois = {
          ...data
      });
    }

    title = 'poi-front';
    // Options de la carte
    // On met la position du POI en attribut center de façon à être centré dessus
    mapOptions: google.maps.MapOptions = {
      center: { lat: 38.9987208, lng: -77.2538699 },
      zoom : 14
   }
    // Attributs du marker, le plus important est la position
    marker = {
      position: { lat: 38.9987208, lng: -77.2538699 },
   }

  

}
