import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  cookies: any;
  estado = 'COA';
  carpetajson = 'json/';
  carpetacsv = 'csv/';
  cookieValue: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   // DIBUJAR MAPA DISTRIOS
   getCoordenadasDistritos() {
      return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson +
             this.estado  + '/distritos/' + this.estado + '_DIS.json');
   }

   // PINTAR EL DISTRITO
   getInfoMapaDistritos(estado) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/`+'data/' + this.carpetajson
           + estado + '/distritos/' + estado + '_DIS_DATA.json');
 }
 // DIBUJAR EL MAPA DE SECCIONES
   getCoordenadasSecciones(id) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` +'data/' + this.carpetajson + this.estado + '/secciones/' + this.estado + '_DIS' + `${id}` + '_SEC.json');
   }
   // PINTAMOS PINTA LAS SECCIONES EN ESPECIFICO
   getInfoMapaSecciones(estado) {
    return this.http.get<any[]>( `${environment.cartografiaUrl}/` +'data/' + this.carpetajson + this.estado + '/secciones/' + this.estado + '_DIS' + `${estado}` + '_DATA.json');
   }

   // OBTIENE INFORMACION DE CADA SECCION
   getCSV(id) {
     return this.http.get( `${environment.cartografiaUrl}/` +'data/' + this.carpetacsv + this.estado + '_DIS' + `${id}` + '.csv', {responseType: 'text'});
   }

}
