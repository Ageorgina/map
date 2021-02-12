import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers:  new HttpHeaders({'Content-Type': 'application/json'})
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
};

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }

  getEdoTool(edo) {
    console.log('srv ruta T ', '/data/js/'+edo+'/'+edo+'_TOOLTIP.js')
    return this.http.get( '/data/js/'+edo+'/'+edo+'_TOOLTIP.js')
    //return this.http.get(`${environment.cartografiaUrl}`+edo+'_TOOLTIP.js');
  }

  getDistTool(edo, dist) {
    //return this.http.get(`${environment.cartografiaUrl}`+'/'+ edo + '/DIS'+dist+'_TOOLTIP.js');
  }

  setEdoTool(infoEdo) {
   // return this.http.post(`${environment.cartografiaBack}` +'/entropia/tooltipEstadosJS', infoEdo , httpOptions);
  }
  
  setDisTool(infoDis) {
    //return this.http.post(`${environment.cartografiaBack}` +'/entropia/tooltipDistritosJS', infoDis , httpOptions);
  }

/* *********************************************************************************************************************** */

  getEdoChart(edo) {
    console.log('srv ruta G', '/data/js/'+edo+'/'+edo+'_GRAFICA.js')
    return this.http.get( '/data/js/'+edo+'/'+edo+'_GRAFICA.js')
    //return this.http.get(`${environment.cartografiaUrl}`+ edo+'_TOOLTIP.js');
  }

  getDistChart(edo, dist) {
   //return this.http.get(`${environment.cartografiaUrl}`+ edo +'_DIS'+dist+'_TOOLTIP.js');
  }

  setEdoChart(infoEdo) {
    //return this.http.post(`${environment.cartografiaBack}` +'/entropia/graficaEstadosJS', infoEdo , httpOptions );
  }

  setDisChart(infoDis) {
    //return this.http.post(`${environment.cartografiaBack}` +'/entropia/graficaDistritosJS', infoDis , httpOptions );
  }


}
