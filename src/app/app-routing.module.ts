import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './connection/login/login.component';
import { MapsComponent } from './maps/maps.component';
import { SigninComponent } from './connection/signin/signin.component';
import { AuthenticationGuard } from './connection/authentication.guard';

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
        component: MapsComponent,
        canActivate: [AuthenticationGuard]  // restrict path only for connected user
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
