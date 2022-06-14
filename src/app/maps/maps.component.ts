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
import { waitForAsync } from '@angular/core/testing';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select/select';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

    pois: Poi[] = [];
    markers = [] as any
    infoContent = ''

    constructor(private mapService: MapsService) {
       
    }

    ngOnInit(): void {
      this.showPois();
    }

    // 
    showPois() {
      this.mapService.getPois()
      .subscribe(pois => {
        this.pois = pois;
        this.update();
      });
    }

    // Permet d'appeler addPoi avec les infos récupérées
    update() {
      console.log(this.pois);

      this.pois.forEach(poi => {
        this.addPoi(poi);
      });
      
    }

    // Ajoute le POI sur la carte
    addPoi(myPoi: Poi) {
      this.markers.push({
        position: {
          lat:  myPoi.lat ,
          lng:  myPoi.lng ,
        },
        label: {
          color: 'black',
          text: myPoi.name,
        },
        title: myPoi.name,
        info: myPoi.comment,
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
      center: { lat: 49, lng: 2 },
      zoom : 3,
      minZoom : 3
   }

}
