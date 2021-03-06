import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './authentication/login/login.component';
import { MapsComponent } from './maps/maps.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PoiComponent } from './poi/poi.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PoiCreateComponent } from './poi/poi-create/poi-create.component';
import { PoiEditComponent } from './poi/poi-edit/poi-edit.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { JwtInterceptor } from './jwt.interceptor';
import { TripComponent } from './trip/trip.component';
import { SearchTripComponent } from './maps/search-trip/search-trip.component';
import { DetailsTripComponent } from './maps/search-trip/details-trip/details-trip.component';
import { DetailsPoisComponent } from './maps/search-trip/details-trip/details-pois/details-pois.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MapsComponent,
        SigninComponent,
        PoiComponent,
        PoiCreateComponent,
        PoiEditComponent,
        FileUploadComponent,
        AuthenticationComponent,
        HomepageComponent,
        TripComponent,
        SearchTripComponent,
        DetailsTripComponent,
        DetailsPoisComponent
    ],
    imports: [
        MatGridListModule,
        HttpClientModule,
        MatRadioModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        GoogleMapsModule,
        AppRoutingModule,
        HttpClientModule,
        FlexLayoutModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
