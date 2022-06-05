import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    currentUser: User | null;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
            this.currentUser = this.authenticationService.currentUserValue
        });
    }

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}
