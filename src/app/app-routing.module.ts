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
import { DistritoAdminComponent } from './components/distrito-admin/distrito-admin.component';
import { MapaSeccionesAdminComponent } from './shared/mapa-secciones-admin/mapa-secciones-admin.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { AdmonUsersComponent } from './admin/admon-users/admon-users.component';
import { EstadisticasComponent } from './influencer/estadisticas/estadisticas.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'distritos', component: DistritosComponent, canActivate: [LoginGuard]},
  {path: 'distritos/:id', component: DistritosComponent, canActivate: [LoginGuard]},
  {path: 'secciones', component: SeccionesComponent, canActivate: [LoginGuard]},
  {path: 'secciones/:id', component: SeccionesComponent, canActivate: [LoginGuard]},
  {path: 'partidos', component: PartidosComponent, canActivate: [LoginGuard]},
  {path: 'estado', component: InfoEstadosComponent, canActivate: [LoginGuard]},
  {path: 'distrito', component: InfoDistritosComponent, canActivate: [LoginGuard]},
  {path: 'data', component: DocumentosComponent, canActivate: [LoginGuard] },
  {path: '404', component: Error404Component, canActivate: [LoginGuard] },
  {path: 'home_admin', component: DistritoAdminComponent, canActivate: [LoginGuard]},
  {path: 'secciones_admin/:id', component: MapaSeccionesAdminComponent, canActivate: [LoginGuard]},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'admon_usuarios', component: AdmonUsersComponent},
  {path: 'estadisticas', component: EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
