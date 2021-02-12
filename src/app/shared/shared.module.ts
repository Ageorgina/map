import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapaMexicoComponent } from './mapa-mexico/mapa-mexico.component';
import { MapaDistritosComponent } from './mapa-distritos/mapa-distritos.component';


@NgModule({
  declarations: [
    MapaMexicoComponent,
    MapaDistritosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MapaMexicoComponent,
    MapaDistritosComponent,
  ]
})
export class SharedModule { }
