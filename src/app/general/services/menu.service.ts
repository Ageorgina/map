import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { Emocion } from '../model/emocion';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  getOpts() {
    return this.http.get<Menu[]>('/assets/menu/menu.js');
  }
  getEmociones() {
    return this.http.get<Emocion[]>('/assets/mock_info/grafica.js');
  }
  getInfo() {
    return this.http.get<any[]>('/assets/mock_info/base.js');
  }
  getDistritos() {
    return this.http.get<any[]>('/assets/mock_info/distritos.js');
  }
  getPartidos() {
    return this.http.get<any[]>('/assets/mock_info/partidos.js');
  }
}
