import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Poi } from '../models';
import { MapsService } from './maps.service';
import { MapMarker } from '@angular/google-maps';
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow } from '@angular/google-maps';
import { environment } from 'src/environments/environment';

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
    poi: Poi = new Poi;
    apiURL = environment.apiURL;

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
        comment: myPoi.comment,
        image: myPoi.imagePath,
        options: { animation: google.maps.Animation.DROP },
      })
    }

    openInfo(marker: MapMarker, name: string, comment: string, imagePath: string) {
      this.poi.name = name
      this.poi.comment = comment
      this.poi.imagePath = imagePath
      this.info.open(marker)
    }

    title = 'poi-front';
    // Options de la carte
    // On met la position du POI en attribut center de façon à être centré dessus
    mapOptions: google.maps.MapOptions = {
      center: { lat: 48.856307094080336, lng: 2.3487893173830603 },
      zoom : 13,
      minZoom : 3
   }

}
