import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MapasService } from '../../general/services/mapas.service';
import { Router} from '@angular/router';
import {MenuService} from '../../general/services/menu.service';

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
let $;
var regex = /(\d+)/g;

@Component({
  selector: 'app-mapa-distritos',
  templateUrl: './mapa-distritos.component.html',
  styleUrls: ['./mapa-distritos.component.scss']
})
export class MapaDistritosComponent implements OnInit, OnDestroy {
  distritoID: any;
  info: any;
  distritos: any;
  distritosMapas: any;
  estado: string;
  estadoValue: string;
  distValue: string;
  partidoValue: string;
  loading = true;
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

  constructor( private mapaSrv: MapasService, private menu: MenuService,
               private router: Router, private ngZone: NgZone ) {
                this.estado = localStorage.getItem('estado').replace(/[""]/g, '');
                this.distValue = localStorage.getItem('distrito').replace(/[""]/g, '');
                this.menu.getInfoDistritos(this.distValue, this.estado).subscribe(info => this.info = info[0]);
                this.distValue = this.distValue.replace(/\b0+/g, '') ;
                // this.menuSrv.getDistritosCOA().subscribe(distritos => { console.log('distritos', distritos);this.distritos = distritos});
                this.mapaSrv.getInfoMapaDistritos(this.estado).subscribe(distArr => {
                  distArr.filter(dist => {
                    if (dist[0] === this.distValue) {
                      distArr = [dist];
                      this.distritosMapas = distArr;
                    }
                  });
                });
                /* tslint:disable:no-string-literal */
                window['angularComponentRef'] = {component: this, zone: ngZone};
  }

  ngOnInit() {
    this.mapaSrv.getCoordenadasDistritos(this.estado).subscribe(entidades => {
      this.construirMapa(entidades).finally(() => {
        this.loading = false;
      });
    });
  }

  async construirMapa(entidadesJSON) {
    this.mapa.tooltip.headerFormat =  this.info['distrito'];
    this.mapa.chart.map = entidadesJSON;
    this.mapa.series[0].data = this.distritosMapas;
    Highcharts.mapChart('estado', this.mapa);
  }

  selected(id) {
    console.log(id)
    if (id === null) { return; }
    if (String(this.distValue) === String(id)) {
      this.router.navigate(['secciones', id]);
    }

  }

  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
  }
}
