import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  cookies: any;
  estado = 'COA';
  carpetajson = 'json/';
  carpetacsv = 'csv/';
  cookieValue: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   //DIBUJAR MAPA DISTRIOS
   getDistritos() {
      return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson + this.estado  + '/distritos/' + this.estado + '_DIS.json');
   }

   //PINTAR EL DISTRITO
   getMapaDistritos(estado) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/`+'data/' + this.carpetajson + estado + '/distritos/' + estado + '_DIS_DATA.json');
 }
 // DIBUJAR EL MAPA DE SECCIONES
   getSecciones(id) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` +'data/' + this.carpetajson + this.estado + '/secciones/' + this.estado + '_DIS' + `${id}` + '_SEC.json');
   }
   // PINTAMOS PINTA LAS SECCIONES EN ESPECIFICO
   getSeccionesMapas(estado) {
    return this.http.get<any[]>( `${environment.cartografiaUrl}/` +'data/' + this.carpetajson + this.estado + '/secciones/' + this.estado + '_DIS' + `${estado}` + '_DATA.json');
   }

   // OBTIENE INFORMACION DE CADA SECCION
   getCSV(id) {
     return this.http.get( `${environment.cartografiaUrl}/` +'data/' + this.carpetacsv + this.estado + '_DIS' + `${id}` + '.csv', {responseType: 'text'});
   }

   getCOOKIE() {
    this.cookieValue = this.cookieService.get('user');
    return this.cookieValue;
   }
}
