import { Component, OnInit, NgZone } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { AlertsService } from '../../general/services/alerts.service';
import { MenuService } from '../../general/services/menu.service';
import { AdministradorService } from '../../general/services/administrador.service';
import { MapasService } from '../../general/services/mapas.service';
import { Router} from '@angular/router';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');
const highchartsCustomEvents = require('highcharts-custom-events');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
highchartsCustomEvents(Highcharts);


@Component({
  selector: 'app-distrito-admin',
  templateUrl: './distrito-admin.component.html',
  styleUrls: ['./distrito-admin.component.scss']
})
export class DistritoAdminComponent implements OnInit {
  partidos: any;
  distritos: any;
  estados: any;
  titulo = 'Revisión por Distrito';
  loading = true;
  disabledDist = true;
  disabledPartido = true;
  estado: string;
  distrito: string;
  partido: string;
  nombre = '';
  password: string;
  info: any;
  distritosMapas: any;
  distValue: string;
  textAlert = '';
  alertError: boolean;
  infoError: boolean;
  infoAlert = '';


  mapa: any = {
    chart: {
      backgroundColor: '#3F3F3F'
    },
    title: {text: ''},
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      tickPixelInterval: 300,
      min: 0,
      minColor: '#E6E7E8',
      maxColor: '#db6904'
    },
    plotOptions: {
      map: {
        point: {
          events: {
            click: (e) => {
              // console.log(e)
              /* tslint:disable:no-string-literal */
              window['angularComponentRef'].zone.run(() => {
                if (e.point && e.point.DISTRITO_L) {
                  window['angularComponentRef'].component.selected(e.point.DISTRITO_L);
                }
              });
              /* tslint:enable:no-string-literal */
            }
          }
        }
      }
    },
    tooltip: {
      pointFormat: '<br>' +
        '<b><b><br>' +
        '<b>Preocupaciones:<b><br>' +
        'Recuperación Económica<br>' +
        'Corrupción<br>' +
        'Brutalidad Policiaca<br>' +
        'Feminicidios<br>' +
        'Salud<br>'
    },
    series: [{

      keys: ['DISTRITO_L', 'value'],
      joinBy: ['DISTRITO_L'],
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        fill: '#f1f7ff',
        format: '{point.properties.DISTRITO_L}',
        formatter() {
          if (this.point.value) {
            return this.point.name;
          }
        }
      },
    }]
  };

  constructor( private menu: MenuService, private alert: AlertsService,
               private admin: AdministradorService, private mapaSrv: MapasService,
               private router: Router, private ngZone: NgZone) {
    this.menu.getPartidos().subscribe(partidos => this.partidos = partidos );
    this.menu.getinfoMx().subscribe(estados => this.estados = estados );
  }

  ngOnInit() { this.loading = false; }

  estadoSelected(event) {
    this.estados.filter( estado => {
      if (estado.clave_entidad === event) {
        if (estado.clave_entidad !== 'COA') {
          this.alertError = true;
          this.disabledDist = true;
          this.disabledPartido = true;
          this.infoError = false;
          this.textAlert = 'Por el momento no esta disponible este Estado ';
          return;
        }
        this.alertError = false;
        this.textAlert = '';
        this.estado = event;
        this.distritos = estado.distritos;
        this.disabledDist = false;
        this.disabledPartido = false;
      }
    });
  }

  distritoSelected(distrito) {
    this.info = undefined;
    this.distValue = distrito;
    if (distrito.length === 2) {
      this.distrito = '0' + distrito;
    } else {
      this.distrito = '00' + distrito;
    }
    this.disabledPartido = false;
  }
  partidoSelected(partido) {
    this.partido = partido;
  }

  buscar() {
    this.loading = true;
    localStorage.setItem('estadoView', this.estado);
    localStorage.setItem('distritoView', this.distrito);
    localStorage.setItem('partidoView', this.partido);
    this.mapaSrv.getInfoMapaDistritos(this.estado).subscribe(data => {
      data.filter(x => {
        if (x[0] === this.distValue) {
          data = [x];
          this.distritosMapas = data;
          this.traerMapa().finally(() => {
            this.menu.getInfoDistritos(this.distrito, this.estado).subscribe(info => {

              this.infoError = false;
              this.info = info[0];
            } , error => {
              this.infoError = true;
              // this.disabledDist = true;
              // this.disabledPartido = true;
              this.infoAlert = 'Por el momento no esta disponible esta información ';
              this.loading = false;
            });
            this.loading = false;
          });
        }
        });
      });
      /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = {component: this, zone: this.ngZone};
    }

    async traerMapa() {
      this.mapaSrv.getCoordenadasDistritos(this.estado).subscribe(entidades => {
        this.construirMapa(entidades).finally(() => {
        });
      });
    }


async construirMapa(entidadesJSON) {
  this.mapa.tooltip.headerFormat =  this.info['distrito'];
  this.mapa.chart.map = entidadesJSON;
  this.mapa.series[0].data = this.distritosMapas;
  Highcharts.mapChart('estado', this.mapa);
}

selected(id, $event) {
  if (id === null) { return; }
  if (this.distValue.toString() === id.toString()) {
    this.router.navigate(['secciones_admin', id]);
  }

}

ngOnDestroy() {
  /* tslint:disable:no-string-literal */
  window['angularComponentRef'] = null;
}


}
