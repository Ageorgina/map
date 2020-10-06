import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  filecvs = 'https://s3.amazonaws.com/nullpointerexception.com/saltillo3.csv';

  constructor(private http: HttpClient) {

   }
   getDistritos() {
      return this.http.get<any[]>('https://s3.amazonaws.com/nullpointerexception.com/COA_DIS.json');
   }
   getSecciones() {
    return this.http.get<any[]>('https://s3.amazonaws.com/nullpointerexception.com/COA_DIS14_SEC.json');
   }
   getCSV() {
     return this.http.get( this.filecvs, {responseType: 'text'});
   }
}
