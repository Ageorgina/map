import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}).append('Authorization', localStorage.getItem('token'))
};
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
    console.log('srv', (`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + estado + '_INFO.js'))
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + estado + '_INFO.js');
  }

  postInfoDistrito(nombreArchivo, contenido) {
    return this.http.post<any[]>(`${environment.cartografiaBack}/entropia/archivoDistritosJS`, { nombreArchivo, contenido}, httpOptions);
  }


  postCSV(nombreArchivo, contenido) {
    return this.http.post<any[]>(`${environment.cartografiaBack}/entropia/archivo`, { nombreArchivo, contenido}, httpOptions);

  }

}
