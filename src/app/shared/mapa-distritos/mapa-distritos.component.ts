import { Component, NgZone, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MapasService } from '../../general/services/mapas.service';
import {ActivatedRoute} from '@angular/router';
import { AlertsService } from '../../general/services/alerts.service';


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
  distritos: any;
  distritosMapas: any = [];
  estado: string;
  distValue: any = [];
  loading = true;
  color = sessionStorage.getItem('color');
  @Output()  dis: EventEmitter<string> = new EventEmitter<string>();
  mapa: any = {
    chart: {
      backgroundColor: '#3F3F3F',
      events: {
        load: function() {
        this.series[0].data.forEach(function(point) {
           //console.log(point)
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
          }
        },
        
      },
    },
    tooltip: {
      enabled: true,
    },
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
    
  };
  constructor( private mapaSrv: MapasService, private ngZone: NgZone, private route: ActivatedRoute, 
               private alert: AlertsService) {
                 
      this.estado = sessionStorage.getItem('estado');
      sessionStorage.setItem('dis', this.route.snapshot.params.id)
      this.inicializarVariables();
      this.mapaSrv.getCoordenadasDistritos(this.estado).subscribe(entidades => {
        this.construirMapa(entidades).finally(() => {
        });
      }, () =>{
        this.loading = false;
        this.alert.serverError();
      });
  }
 
  inicializarVariables(){
    this.dis.emit(this.route.snapshot.params.id);
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = {component: this, zone: this.ngZone};
  }

  ngOnInit() {

  }

  async construirMapa(entidadesJSON) {
    this.mapaSrv.getInfoMapaDistritos(this.estado).subscribe((distArr: any) => {
      this.mapa.series[0].data = distArr;
      this.mapa.chart.map = entidadesJSON;
      Highcharts.mapChart('distrito', this.mapa);
      this.loading = false;
    });

  }


  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
  }
}
