import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DistritosComponent } from './components/distritos/distritos.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { InfoEstadosComponent } from './components/formularios/info-estados/info-estados.component';
import { InfoDistritosComponent } from './components/formularios/info-distritos/info-distritos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'distritos', component: DistritosComponent },
  { path: 'distritos/:id', component: DistritosComponent },
  { path: 'secciones', component: SeccionesComponent },
  { path: 'secciones/:id', component: SeccionesComponent },
  { path: 'partidos', component: PartidosComponent },
  { path: 'agregar_info_estados', component: InfoEstadosComponent },
  { path: 'agregar_info_distritos', component: InfoDistritosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
