import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Poi } from '../../types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  // URL absolue
  serverUrl = 'https://app-poi-api.azurewebsites.net/';
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

  createPoi(poiData: Partial<Poi>): Observable<Poi> {
    return this.http
      .post<Poi>(
        `${this.serverUrl}${this.poisPath}`,
        poiData,
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  editPoi(poiData: Partial<Poi>, id: number): Observable<any> {
    return this.http
      .put(`${this.serverUrl}${this.poisPath}/${id}`, poiData)
      .pipe(
          catchError(error => this.handleError(error))
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