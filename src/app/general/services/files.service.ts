import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}).append('Authorization', localStorage.getItem('token'))
};
let $;
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) {
  }
  postInfoEstado( nombreArchivo, contenido) {
    return this.http.post<any[]>(`${environment.cartografiaBack}/entropia/archivoEstadosJS`, { nombreArchivo, contenido}, httpOptions);
  }

  getInfoDistrito(estado) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/' + estado + '/' + estado + '_DISTRITOS.js' );
  }
  getInfoEstado(estado) {
    return this.http.get(`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + estado + '_INFO.js');
  }

  postInfoDistrito(nombreArchivo, contenido) {
    return this.http.post<any[]>(`${environment.cartografiaBack}/entropia/archivoDistritosJS`, { nombreArchivo, contenido}, httpOptions);
  }


  postCSV(nombreArchivo, contenido) {
    return this.http.post<any[]>(`${environment.cartografiaBack}/entropia/archivo`, { nombreArchivo, contenido}, httpOptions);

  }
  getEDOInfo(){
    return this.http.get<any[]>('./data/js/INFO_MAPA_MX/INFO_DIS.js');
  }
  getDISInfo(){
    return this.http.get<any[]>('./data/js/INFO_MAPA_MX/INFO_DIS000.js');
  }
  existeInfoEDO(estado){
    
    const file = `${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/'+estado + '_INFO.js';
    
    const path = new XMLHttpRequest(); 
    path.open('GET', file,  this.existe(path) )
    path.send();
    return path.status!== 403;

}


}
