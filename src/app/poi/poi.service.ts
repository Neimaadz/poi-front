import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Poi } from '../../types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  // URL absolue
  serverUrl = environment.apiURL;
  // chemin relatif sur le serveur
  poisPath = '/api/poi';

  constructor(
    private http: HttpClient,
    private router: Router
    // private authenticationService: AuthenticationService,
  ) {
    // pas nécessaire si on utilise une fonction fléchée dans catchError() 
    // this.handleError = this.handleError.bind(this);
  }

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

  getAllPoi(): Observable<Poi[]> {
    return this.http
      .get<Poi[]>(
        `${this.serverUrl}${this.poisPath}`
      );
  }

  getPoi(poiId: number): Observable<Poi> {
    return this.http
      .get<Poi>(
        `${this.serverUrl}${this.poisPath}/${poiId}`
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  createPoi(poiData: any, image: File): Observable<Poi> {
    const formData: FormData = new FormData();
    Object.keys(poiData).forEach((key)=>{formData.append(key,poiData[key])});
    if (image) formData.append("Image", image, image.name)
    else formData.append("Image", "");
    return this.http
      .post<Poi>(
        `${this.serverUrl}${this.poisPath}`,
        formData,
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  editPoi(poiData: any, image: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(poiData).forEach((key) => { formData.append(key, poiData[key]) });
    if (image) formData.append("Image", image, image.name)
    else formData.append("Image", "");
    return this.http
      .put(`${this.serverUrl}${this.poisPath}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.log(error);
          return this.handleError(error)
        })
      );
  }

  deletePoi(poiId: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.serverUrl}${this.poisPath}/${poiId}`,
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

}
