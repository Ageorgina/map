import { Component, NgZone, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MapasService } from '../../general/services/mapas.service';
import {ActivatedRoute,  Router} from '@angular/router';
import {MenuService} from '../../general/services/menu.service';
import {User} from "../../general/model/user";
import { AlertsService } from '../../general/services/alerts.service';
import { InfoDistrito } from '../../general/model/info-distrito';

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
  selector: 'app-mapa-distritos',
  templateUrl: './mapa-distritos.component.html',
  styleUrls: ['./mapa-distritos.component.scss']
})
export class MapaDistritosComponent implements OnInit, OnDestroy {
  distritoID: any;
  info = new InfoDistrito();
  distritos: any;
  distritosMapas: any;
  estado: string;
  distValue: string;
  loading = true;
  usuario: User;
  color = sessionStorage.getItem('color');
  @Output()  dis: EventEmitter<string> = new EventEmitter<string>();
  mapOpts: any = {};
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
      showInLegend: false,
      //tickPixelInterval: 300,
      //min: 0,
      // minColor: '#E6E7E8',
      maxColor: this.color
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
 /* mapa: any = {
    chart: {
      backgroundColor: '#3F3F3F',
      events: {
        load: function() {
        this.series[0].data.forEach(function(point) {
            console.log(point)
            point.update({
              properties:{
                "hc-middle-x":point.dataLabel.bBox.x,
                "hc-middle-y":point.dataLabel.bBox.y
              },
              dataLabels: {
                x: point.dataLabel.bBox.x,
                y: point.dataLabel.bBox.y,
                align: 'left',
                verticalAlign: 'top',
                options:{
                  align: 'left',
                  verticalAlign: 'top'
                },

              }
            })
          })
        }
      }
    },
    
    title: '',
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0,
      maxColor: '#db6904',
    },
    plotOptions: {
      map: {
        point: {
          events: {
            click: (e) => {
              window['angularComponentRef'].zone.run(() => {
                if (e.point && e.point.DISTRITO_L) {
                  window['angularComponentRef'].component.selected(e.point.DISTRITO_L);
                }
              });
            }
          }
        },
        
      },
    },
    tooltip: {
      enabled: true,
       pointFormat: '<br>' +
         '<b><b><br>' +
         '<b>Preocupaciones:<b><br>' +
         'Recuperación Económica<br>' +
         'Corrupción<br>' +
         'Brutalidad Policiaca<br>' +
         'Feminicidios<br>' +
         'Salud<br>'
    },
    // series: [{
    //   // keys: ['DISTRITO_L', 'value'],
    //   joinBy: ['DISTRITO_L'],
    //   dataLabels: {
    //     enabled: true,
    //     format: '{point.properties.DISTRITO_L}',
    //     // formatter() {
    //     //   if (this.point.value) {
    //     //     return this.point.name;
    //     //   }
    //    // }
    //   }
    // }]
    series: [{
      keys: ['DISTRITO_L', 'value'],
      joinBy: ['DISTRITO_L'],
      color: '#ed6706',
      dataLabels: {
        enabled: true,
        format: '{point.properties.DISTRITO_L}',
         formatter() {
              if (this.point.value) {
                return this.point.name;
           }
        }
      }
    }]
    
  };*/

  constructor( private mapaSrv: MapasService, private menu: MenuService,
               private router: Router, private ngZone: NgZone, private route: ActivatedRoute, 
               private alert: AlertsService) {
                 
      this.estado = sessionStorage.getItem('estado');
      sessionStorage.setItem('dis', this.route.snapshot.params.id)
      this.usuario = JSON.parse(localStorage.getItem('user'));
      this.inicializarVariables();
      this.mapaSrv.getCoordenadasDistritos(this.estado).subscribe(entidades => {
        this.construirMapa(entidades).finally(() => {
          this.loading = false;
        });
      }, () =>{
        this.loading = false;
        this.alert.serverError();
      });
  }
 
  inicializarVariables(){
    this.dis.emit(this.route.snapshot.params.id);
      this.menu.getInfoDistritos(this.route.snapshot.params.id,this.estado).subscribe(info =>{ 
        if(info === null){
          this.loading = false;
        }else{
          this.info = info[0];
          this.loading = false;
        }
       }, () =>{
        this.loading = false;
        this.alert.serverError();
      } );
    

    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = {component: this, zone: this.ngZone};
  }

  ngOnInit() {

  }

  async construirMapa(entidadesJSON) {
    this.mapaSrv.getInfoMapaDistritos(this.estado).subscribe(distArr => {
      console.log(distArr)
       this.distValue = this.route.snapshot.params.id.replace(/\b0+/g, '') ;
       this.distValue = this.distValue.replace(/\b0+/g, '') ;
       this.mapaSrv.getInfoMapaDistritos(this.estado).subscribe(distArr => {
         distArr.filter(dist => {
           if (dist[0] === this.distValue) {
            console.log('dist',dist[0])
             distArr = [dist];
             this.distritosMapas = distArr;
             this.mapa.tooltip.headerFormat = 'Distrito:'+ '\xa0'+ this.route.snapshot.params.id;
             this.mapa.chart.map = entidadesJSON;
             this.mapa.series[0].data = this.distritosMapas;
             console.log(this.mapa.series[0].data)
             Highcharts.mapChart('estado', this.mapa);
           }
         });
       });
    });

  }

  selected(id) {
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
