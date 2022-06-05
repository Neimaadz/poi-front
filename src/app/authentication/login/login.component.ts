import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    flag: boolean = true;
    returnUrl: string;
    error = '';
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.form = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]//, Validators.minLength(6)]],
        });
        
        if(this.authenticationService.currentUserValue){
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
    }

    onSubmit(){
        const { username, password } = this.form.value; // Destructuring
        this.authenticationService.login(username, password)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl(this.returnUrl);
                },
                error: (error) => {
                    this.error = error;
                }
            })
    }

}
