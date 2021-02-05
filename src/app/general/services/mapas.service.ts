import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  cookies: any;
  carpetajson = 'json/';
  carpetacsv = 'csv/';
  cookieValue: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   // DIBUJAR MAPA DISTRIOS
   getCoordenadasDistritos(estado) {
     console.log('getCoordenadasDistritos',`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson +
     estado  + '/distritos/' + estado + '_DIS.json');
      return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson +
             estado  + '/distritos/' + estado + '_DIS.json');
   }

   // PINTAR EL DISTRITO
   getInfoMapaDistritos(estado) {
    console.log('pinta el distrito->',`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson
    + estado + '/distritos/' + estado + '_DIS_DATA.json')

    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/' + this.carpetajson
           + estado + '/distritos/' + estado + '_DIS_DATA.json');
 }
 // DIBUJAR EL MAPA DE SECCIONES
   getCoordenadasSecciones(id, estado) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/' +
    this.carpetajson + estado + '/secciones/' + estado + '_DIS' + `${id}` + '_SEC.json');
   }
   // PINTAMOS PINTA LAS SECCIONES EN ESPECIFICO
   getInfoMapaSecciones(id, estado) {
     console.log('pinta secciones->',( `${environment.cartografiaUrl}/` + 'data/'
     + this.carpetajson + estado + '/secciones/' + estado + '_DIS' + `${id}` + '_DATA.json')  )
    return this.http.get<any[]>( `${environment.cartografiaUrl}/` + 'data/'
    + this.carpetajson + estado + '/secciones/' + estado + '_DIS' + `${id}` + '_DATA.json');
   }

   // OBTIENE INFORMACION DE CADA SECCION
   getCSV(id, estado) {
     return this.http.get( `${environment.cartografiaUrl}/` + 'data/csv/' +
     estado + '_DIS' + `${id}` + '.csv', {responseType: 'text'});
   }

}
