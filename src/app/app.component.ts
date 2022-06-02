import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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
