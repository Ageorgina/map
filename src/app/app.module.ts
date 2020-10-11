import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DistritosComponent } from './components/distritos/distritos.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { PartidosComponent } from './components/partidos/partidos.component';
import { ChartModule } from 'angular-highcharts';
import { CookieService } from 'ngx-cookie-service';
import { InfoEstadosComponent } from './components/formularios/info-estados/info-estados.component';
import { InfoDistritosComponent } from './components/formularios/info-distritos/info-distritos.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DistritosComponent,
    SeccionesComponent,
    PartidosComponent,
    InfoEstadosComponent,
    InfoDistritosComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    ChartModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
