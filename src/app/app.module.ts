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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DistritosComponent,
    SeccionesComponent,
    PartidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
