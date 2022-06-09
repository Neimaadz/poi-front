import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Poi } from '../models';
import { MapsService } from './maps.service';
import { CommonModule } from '@angular/common';
import { MapMarker } from '@angular/google-maps';
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow } from '@angular/google-maps';
import { map } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

    pois: Poi[];
    markers = [] as any
    infoContent = ''

    constructor(private mapService: MapsService) {
            
    }

    ngOnInit(): void {
      this.showPois();  
      this.addMarker();
      this.addPoi(this.pois[0]);
    }

    showPois() {
      this.mapService.getPois()
      .subscribe((data: Poi[]) => this.pois = {
          ...data
      });
    }

    addMarker() {
      this.markers.push({
        position: {
          lat:  ((Math.random() - 0.5) * 2) ,
          lng:  ((Math.random() - 0.5) * 2) ,
        },
        label: {
          color: 'red',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: 'Marker title ' + (this.markers.length + 1),
        info: 'Marker Info' + (this.markers.length + 1),
        options: { animation: google.maps.Animation.DROP },
      })
    }

    addPoi(myPoi: Poi) {
      this.markers.push({
        position: {
          lat:  myPoi.lat ,
          lng:  myPoi.lng ,
        },
        label: {
          color: 'red',
          text: myPoi.name + (this.markers.length + 1),
        },
        title: myPoi.name + (this.markers.length + 1),
        info: myPoi.comment + (this.markers.length + 1),
        options: { animation: google.maps.Animation.DROP },
      })
    }

    openInfo(marker: MapMarker, content: string) {
      this.infoContent = content
      this.info.open(marker)
    }

    title = 'poi-front';
    // Options de la carte
    // On met la position du POI en attribut center de façon à être centré dessus
    mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom : 3
   }

}
