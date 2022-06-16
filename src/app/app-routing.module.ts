import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MapsComponent } from './maps/maps.component';
import { PoiCreateComponent } from './poi/poi-create/poi-create.component';
import { PoiEditComponent } from './poi/poi-edit/poi-edit.component';
import { PoiComponent } from './poi/poi.component';
import { SigninComponent } from './signin/signin.component';
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
        path: 'poi',
        component: PoiComponent
    },
    {
        path: 'poi/create',
        component: PoiCreateComponent
    },
    {
        path: 'poi/edit/:id',
        component: PoiEditComponent
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
