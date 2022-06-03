import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
