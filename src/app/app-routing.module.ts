import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DistritosComponent } from './components/distritos/distritos.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { PartidosComponent } from './components/partidos/partidos.component';


const routes: Routes = [
  { path: '', redirectTo: 'coahuila', pathMatch: 'full' },
  { path: 'coahuila', component: HomeComponent},
  { path: 'distritos', component: DistritosComponent},
  { path: 'secciones', component: SeccionesComponent},
  { path: 'partidos', component: PartidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
