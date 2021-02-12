import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor(private http: HttpClient) {
   }

   // DIBUJAR MAPA DISTRIOS
   getCoordenadasDistritos(estado) {
    return this.http.get('/data/json/'+ estado  + '/distritos/' + estado + '_DIS.json');
   }

   // PINTAR EL DISTRITO
   getInfoMapaDistritos(estado) {
    return this.http.get('/data/json/'+ estado  + '/distritos/' + estado + '_DIS_DATA.json');
 }


}
