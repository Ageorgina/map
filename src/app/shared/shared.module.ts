import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapaMexicoComponent } from './mapa-mexico/mapa-mexico.component';
import { EmocionesComponent } from './emociones/emociones.component';
import { MapaDistritosComponent } from './mapa-distritos/mapa-distritos.component';
import { MapaSeccionesComponent } from './mapa-secciones/mapa-secciones.component';
import { MapaSeccionesAdminComponent } from './mapa-secciones-admin/mapa-secciones-admin.component';

@NgModule({
  declarations: [
    SidebarComponent,
    MapaMexicoComponent,
    EmocionesComponent,
    MapaDistritosComponent,
    MapaSeccionesComponent,
    MapaSeccionesAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    MapaMexicoComponent,
    EmocionesComponent,
    MapaDistritosComponent,
    MapaSeccionesComponent
  ]
})
export class SharedModule { }
