import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MapsComponent } from './maps/maps.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
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
