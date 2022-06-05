
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenUserPayload, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    serverUrl = 'https://aspnet-core-poi-api.azurewebsites.net/api/poi';
    // serverUrl = 'https://localhost:5001/';
    loginPath = 'api/auth/login';
    registerPath = 'api/auth/register';
    
    public currentUserSubject: BehaviorSubject<User | null>;
    public token: string = localStorage.getItem('token') || '';

    constructor(private http: HttpClient) {
        const storedUserJSON = localStorage.getItem('currentUser');
        const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public register(username: string, password: string): Observable<TokenUserPayload> {
        return this.http.post<TokenUserPayload>(
            `${this.serverUrl}${this.registerPath}`,
            { username, password }
        )
        .pipe(map((payload: TokenUserPayload) => {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('currentUser', JSON.stringify(payload.user));
            
            this.currentUserSubject.next(payload.user);
            this.token = payload.token;

            return payload;
        }));
    }

    public login(username: string, password: string): Observable<TokenUserPayload> {
        return this.http.post<TokenUserPayload>(
            `${this.serverUrl}${this.loginPath}`,
            {username, password}
        )
        .pipe(map((payload: TokenUserPayload) => {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('currentUser', JSON.stringify(payload.user));
            
            this.currentUserSubject.next(payload.user);
            this.token = payload.token;

            return payload;
        }));
    }

    public logout() {
        this.currentUserSubject.next(null);
        this.token = '';
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}
