import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapaMexicoComponent } from './mapa-mexico/mapa-mexico.component';
import { EmocionesComponent } from './emociones/emociones.component';
import { MapaDistritosComponent } from './mapa-distritos/mapa-distritos.component';
import { MapaSeccionesComponent } from './mapa-secciones/mapa-secciones.component';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, MapaMexicoComponent, EmocionesComponent, MapaDistritosComponent, MapaSeccionesComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    MapaMexicoComponent,
    EmocionesComponent,
    MapaDistritosComponent,
    MapaSeccionesComponent
  ]
})
export class SharedModule { }
