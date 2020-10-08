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
  carpetajson = '/assets/data/json/';

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   //DIBUJAR MAPA DISTRIOS
   getDistritos() {
      return this.http.get<any[]>(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + '.json');
   }

   //PINTAR EL DISTRITO
   getMapaDistritos(estado) {
    return this.http.get<any[]>( this.carpetajson + estado + '/distritos/' + estado + '_DIS_DATA.json');
 }
 // DIBUJAR EL MAPA DE SECCIONES
   getSecciones(id) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '_SEC.json');
   }
   // PINTAMOS PINTA LAS SECCIONES EN ESPECIFICO
   getSeccionesMapas(estado) {
    return this.http.get<any[]>( this.carpetajson + this.estado + '/secciones/' + this.estado + '_DIS' + `${estado}` + '_DATA.json');
   }

   // OBTIENE INFORMACION DE CADA SECCION
   getCSV(id) {
     return this.http.get( `${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '.csv', {responseType: 'text'});
   }

   getCOOKIE(cookies) {
    //console.log('OBTENER COA009PAN', cookies);
     //return this.http.get('http://localhost:4200/secciones/9', cookies);
   }
}
