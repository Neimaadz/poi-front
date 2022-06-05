import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../connection.component.css']
})
export class SigninComponent implements OnInit {

    form: FormGroup;
    flag: boolean = true;
    error = '';
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.form = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        });
        
        if(this.authenticationService.currentUserValue){
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
    }

    onSubmit(){
        const { username, password } = this.form.value; // Destructuring
        this.authenticationService.register(username, password)
            .subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.error = error;
                }
            })
    }

}
