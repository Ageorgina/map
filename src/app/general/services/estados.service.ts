import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  ruta = 'https://s3.amazonaws.com/nullpointerexception.com/COA_DIS'

  constructor(private http: HttpClient) {

   }
   getDistritos() {
      return this.http.get<any[]>(this.ruta + '.json');
   }
   getMapaDistritos() {
    return this.http.get<any[]>('/assets/mock_info/distritosmapa.json');
 }
   getSecciones(id) {
    return this.http.get<any[]>(this.ruta + `${id}` + '_SEC.json');
   }
   getSeccionesMapas() {
    return this.http.get<any[]>('/assets/mock_info/secciones16.json');
   }
   getCSV(id) {
     return this.http.get( this.ruta + `${id}` + '.csv', {responseType: 'text'});
   }
}
