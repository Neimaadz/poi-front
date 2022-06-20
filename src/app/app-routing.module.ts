import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MapsComponent } from './maps/maps.component';
import { PoiCreateComponent } from './poi/poi-create/poi-create.component';
import { PoiEditComponent } from './poi/poi-edit/poi-edit.component';
import { PoiComponent } from './poi/poi.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { TripComponent } from './trip/trip.component';

export const routes: Routes = [
    {
        path: '', component: HomepageComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signin', component: SigninComponent
    },
    {
        path: 'poi', component: PoiComponent, canActivate: [AuthenticationGuard]    // restrict path only for connected user
    },
    {
        path: 'poi/create', component: PoiCreateComponent, canActivate: [AuthenticationGuard]
    },
    {
        path: 'poi/edit/:id', component: PoiEditComponent, canActivate: [AuthenticationGuard]
    },
    {
        path: 'maps', component: MapsComponent, canActivate: [AuthenticationGuard]
    },
    {
        path: 'trip', component: TripComponent, canActivate: [AuthenticationGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
