import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapaMexicoComponent } from './mapa-mexico/mapa-mexico.component';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, MapaMexicoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    MapaMexicoComponent
  ]
})
export class SharedModule { }
