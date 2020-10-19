import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DistritosComponent} from './components/distritos/distritos.component';
import {SeccionesComponent} from './components/secciones/secciones.component';
import {PartidosComponent} from './components/partidos/partidos.component';
import {InfoEstadosComponent} from './components/formularios/info-estados/info-estados.component';
import {InfoDistritosComponent} from './components/formularios/info-distritos/info-distritos.component';
import {LoginComponent} from './components/login/login.component';
import {LoginGuard} from './shared/guards/login.guard';
import {LogoutComponent} from './components/logout/logout.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { DocumentosComponent } from './components/documentos/documentos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  //  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  //  {path: 'distritos', component: DistritosComponent, canActivate: [LoginGuard]},
  //  {path: 'distritos/:id', component: DistritosComponent, canActivate: [LoginGuard]},
  //  {path: 'secciones', component: SeccionesComponent, canActivate: [LoginGuard]},
  //  {path: 'secciones/:id', component: SeccionesComponent, canActivate: [LoginGuard]},
  //  {path: 'partidos', component: PartidosComponent, canActivate: [LoginGuard]},
  //  {path: 'agregar_info_estados', component: InfoEstadosComponent, canActivate: [LoginGuard]},
  //  {path: 'agregar_info_distritos', component: InfoDistritosComponent, canActivate: [LoginGuard]},
  // {path: 'agregar_cvs', component: DocumentosComponent, canActivate: [LoginGuard] },
  // {path: '404', component: Error404Component, canActivate: [LoginGuard] }
   {path: 'home', component: HomeComponent},
   {path: 'distritos', component: DistritosComponent},
   {path: 'distritos/:id', component: DistritosComponent},
   {path: 'secciones', component: SeccionesComponent},
   {path: 'secciones/:id', component: SeccionesComponent},
   {path: 'partidos', component: PartidosComponent},
   {path: 'agregar_info_estados', component: InfoEstadosComponent},
   {path: 'agregar_info_distritos', component: InfoDistritosComponent},
   {path: '404', component: Error404Component},
   {path: 'agregar_cvs', component: DocumentosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
