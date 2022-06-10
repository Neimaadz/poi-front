import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { PoiCreateComponent } from './poi/poi-create/poi-create.component';
import { PoiComponent } from './poi/poi.component';
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
        path: 'poi',
        component: PoiComponent
    },
    {
        path: 'poi/create',
        component: PoiCreateComponent
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
