import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  public error404 = false;

  constructor(private http: HttpClient, private router: Router) { }

  getInfoPartidos(estado, distrito) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/'
           + estado + '/'  + estado + '_DIS' + distrito + '_PARTIDOS.js').pipe(map(partidos => {
             return partidos;
           }), catchError ( error => {
            this.router.navigate(['404']);
            return error;
          }));
  }
  getInfoGral(estado, distrito) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/'
            + estado + '/'  + estado + '_DIS' + distrito + '_INFO.js').pipe(map(info => {
              return info;
            }), catchError ( error => {
            this.router.navigate(['404']);
            return error;
          }));
  }
  getError(estado, distrito) {
    return this.http.get<any[]>(`${environment.cartografiaUrl}/` + 'data/js/'
           + estado + '/'  + estado + '_DIS' + distrito + '_PARTIDOS.js').pipe(map(partidos => {
             this.error404 = false;
             return partidos;
           }), catchError ( error => {
             this.error404 = true;
             return error;
          }));
  }
}
