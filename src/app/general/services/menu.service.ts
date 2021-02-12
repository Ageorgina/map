import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu, Emocion, Rol } from '../model';
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
  getOptsADM() {
    return this.http.get<Menu[]>('/assets/menu/menuADM.js');
  }
  getOptsINF() {
    return this.http.get<Menu[]>('/assets/menu/menuINF.js');
  }
  getEmociones() {
    return this.http.get<Emocion[]>('/assets/mock_info/grafica.js');
  }
  getRoles() {
    return this.http.get<Rol[]>('/assets/menu/roles.js');
  }
  getPartidos() {
    return this.http.get<any[]>('/assets/menu/partidos.js');
  }
  getDistritosCOA() {
    return this.http.get<any[]>('/assets/mock_info/distritos.js');
  }

  getInfoDistritos(id, estado){
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/' + estado + '/INFO_DIS' + `${id}` + '.js' );
  }

  getinfoMx() {
    return this.http.get<any[]>(`${environment.cartografiaUrl}` + '/data/js/DATA_MX.js');
  }
}
