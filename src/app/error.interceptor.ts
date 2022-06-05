import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './connection/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.status === 0) {
            errorMessage = 'A network error occurred. Please come back later';
        } else if (error.status === 401){
            errorMessage = `Error ${error.status} : ${error.error}`;
            this.authenticationService.logout();
            this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
        } else if (error.status === 403){
            errorMessage = 'Error 403 : You are not allowed to do this';
        } else {
            errorMessage = `Error ${error.status} : ${error.error}`;
        }
        return throwError(errorMessage);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => this.handleError(error))
        );
    }
}
