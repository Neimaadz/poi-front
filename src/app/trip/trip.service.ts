import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // URL absolue
  serverUrl = environment.apiURL;
  // chemin relatif sur le serveur
  tripPath = '/api/trip';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private handleError(error: HttpErrorResponse | string) {
    if (typeof error === 'string') {
      return throwError(error);
    }
    let errorMessage = '';
    switch (error.status) {
      case 0:
        errorMessage = 'A network error occurred. Please come back later';
        break;
      case 400:
        errorMessage = 'There are missing or misformated fields.';
        break;
      case 404:
        errorMessage = 'This poi does not exist anymore.';
        break;
      default:
        errorMessage = 'An unexpected error occurred.';
    }
    return throwError(errorMessage);
  }

  
  createTrip(tripData: any): Observable<Trip> {
    const formData: FormData = new FormData();
    Object.keys(tripData).forEach((key)=>{formData.append(key,tripData[key])});
    return this.http
      .post<Trip>(
        `${this.serverUrl}${this.tripPath}`,
        formData,
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  
  getTripOriginDestination(tripData: any): Observable<Trip[]> {
    const formData: FormData = new FormData();
    Object.keys(tripData).forEach((key)=>{formData.append(key,tripData[key])});
    return this.http
      .get<Trip[]>(
        `${this.serverUrl}${this.tripPath}/origin-destination`, {
          params: {
            origin: formData.get('origin')!.toString(),
            destination: formData.get('destination')!.toString()
          }
        }
      );
  }
  
}
