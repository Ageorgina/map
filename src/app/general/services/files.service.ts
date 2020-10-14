import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  estado = 'COA';

  constructor(private http: HttpClient) { }
  getInfoEstado() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + this.estado + '_INFO.js');
  }
  getInfoDistrito() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + this.estado + '_INFO.js');
  }

  updateInfoEstado() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}` + '/data/js/DATA_MX.js');
  }

  updateInfoDistrito() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}` + '/data/js/DATA_MX.js');
  }

}
