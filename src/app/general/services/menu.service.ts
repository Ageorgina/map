import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { Emocion } from '../model/emocion';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  estado = 'COA';

  constructor(private http: HttpClient) { }
  getOpts() {
    return this.http.get<Menu[]>('/assets/menu/menu.js');
  }
  getEmociones() {
    return this.http.get<Emocion[]>('/assets/mock_info/grafica.js');
  }
  getInfo() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/INFO_MAPA_MX/' + this.estado + '_INFO.js');
  }
  getDistritosCOA() {
    console.log('getDistritosCOA', '/assets/mock_info/distritos.js');
    return this.http.get<any[]>('/assets/mock_info/distritos.js');
  }
  getInfoDistritos(id) {

    console.log('getInfoDistritos(id)', `${environment.cartografiaUrl}/` + 'data/js/INFO_DIS' + `${id}` + '.js');
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/INFO_DIS' + `${id}` + '.js' );
  }

  getinfoMx() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}` + '/data/js/DATA_MX.js');
  }
}
