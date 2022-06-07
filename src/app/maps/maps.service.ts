import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poi } from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

   
  serverUrl = 'https://app-poi-api.azurewebsites.net/';
  poiPath = 'api/poi';
    
  public getPois() {
    return this.http.get<Poi[]>(`${this.serverUrl}${this.poiPath}`);
  }
}
