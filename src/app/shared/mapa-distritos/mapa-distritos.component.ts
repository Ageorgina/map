import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import {EstadosService} from '../../general/services/estados.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../general/services/menu.service';
import {AuthenticationService} from '../../general/services/authentication.service';
//const datas = [['16', 16],['8', 8],['9',9],['10',10],['15',15]];
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
  ejemplo: any;
  distritos: any;
  distritosMapas: any;
  estado = 'COA';
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
              console.log('click ', e, this);
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
      headerFormat: '<br><b>Saltillo D XVI</b><br>',
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

  constructor(private estados: EstadosService, private menuSrv: MenuService, private router: Router, private ngZone: NgZone,
              private authService: AuthenticationService) {
    this.distValue = this.authService.getCOOKIE().match(regex).toString();
    this.menuSrv.getInfoDistritos(this.distValue).subscribe(info => this.ejemplo = info[0]);
    this.distValue = this.distValue.replace(/\b0+/g, '');

    this.menuSrv.getDistritos().subscribe(distritos => {
      this.distritos = distritos;
    });
    this.estados.getMapaDistritos(this.estado).subscribe(data => {
      data.filter(x => {
        if (x[0] === this.distValue) {
          data = [x];
          this.distritosMapas = data;
        }
      });
    });
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = {component: this, zone: ngZone};
    /* tslint:enable:no-string-literal */
  }

  ngOnInit() {
    this.estados.getDistritos().subscribe(entidades => {
      this.construirMapa(entidades).finally(() => {
        this.loading = false;
      });
    });
  }

  async construirMapa(entidadesJSON) {
    this.mapa.chart.map = entidadesJSON;
    this.mapa.series[0].data = this.distritosMapas;
    Highcharts.mapChart('estado', this.mapa);
  }

  selected(id, $event) {

    console.log('id ', id, this.distValue == id, this.distValue);
    const cook = this.authService.getCOOKIE();
    if (id === null) {
      return;
    }
    if (this.distValue == id) {
      this.router.navigate(['secciones', id]);
    }

  }

  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
    /* tslint:enable:no-string-literal */
  }
}
