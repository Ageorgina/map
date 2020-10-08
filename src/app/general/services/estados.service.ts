import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
 // ruta = 'https://s3.amazonaws.com/nullpointerexception.com/COA_DIS';
  cookies: any;
  estado = 'COA';
  carpeta = '/assets/data/json/';

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   //DIBUJAR MAPA DISTRIOS
   getDistritos() {
     console.log('MAPA D',(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + '.json'));
      return this.http.get<any[]>(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + '.json');
   }

   //PINTAR EL DISTRITO
   getMapaDistritos(estado) {
    console.log('assets/D',this.carpeta + estado + '/distritos/' + estado + '_DIS_DATA.json');
    return this.http.get<any[]>( this.carpeta + estado + '/distritos/' + estado + '_DIS_DATA.json');
 }
 // DIBUJAR EL MAPA DE SECCIONES
   getSecciones(id) {
    console.log('MAPA SEC',`${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '_SEC.json');
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '_SEC.json');
   }
   // PINTAMOS PINTA LAS SECCIONES EN ESPECIFICO
   getSeccionesMapas() {
   // console.log('assets/D',this.carpeta + estado + '/distritos/' + estado + '_DIS_DATA.json');
    return this.http.get<any[]>('/assets/mock_info/COA_DIS016_DATA.json');
   }

   // OBTIENE INFORMACION DE CADA SECCION
   getCSV(id) {
     console.log(`${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '.csv')
     return this.http.get( `${environment.cartografiaUrl}/` + this.estado + '_DIS' + `${id}` + '.csv', {responseType: 'text'});
   }

   getCOOKIE(cookies) {
    console.log('OBTENER COA009PAN', cookies);
     return this.http.get('http://localhost:4200/secciones/9', cookies);
   }
}
