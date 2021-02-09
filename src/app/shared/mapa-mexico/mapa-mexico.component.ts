import {Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import * as Highcharts from 'highcharts/highmaps';

import customEvents from 'highcharts-custom-events';
import {FilesService} from '../../general/services';
import {User} from "../../general/model";
import { AlertsService } from '../../general/services/alerts.service';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
customEvents(Highcharts);


declare var require: any;
const usaMap = require("@highcharts/map-collection/countries/mx/mx-all.geo.json");

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

var $;
var regex = /(\d+)/g;

@Component({
  selector: 'app-mapa-mexico',
  templateUrl: './mapa-mexico.component.html',
  styleUrls: ['./mapa-mexico.component.scss']
})
export class MapaMexicoComponent implements OnInit, OnDestroy {
  estadoValue: string;
  distValue: string;
  partidoValue: string;
  estadoID: any;
  infoEstado: any;
  ciudades: any;
  cookies: any;
  loading = true;
  mapData: any[];
  usuario: User;
  options: any;
  

  llavesEstado: any[] = [{"value":"BCN","id": "mx-bc"},
    {"value":"BCS","id": "mx-bs"},
    {"value":"SON","id": "mx-so"},
    {"value":"COL","id": "mx-cl"},
    {"value":"NAY","id": "mx-na"},
    {"value":"CAM","id": "mx-cm"},
    {"value":"QOO","id": "mx-qr"},
    {"value":"MEX","id": "mx-mx"},
    {"value":"MOR","id": "mx-mo"},
    {"value":"CMX","id": "mx-df"},
    {"value":"QRO","id": "mx-qt"},
    {"value":"TAB","id": "mx-tb"},
    {"value":"CHS","id": "mx-cs"},
    {"value":"NVL","id": "mx-nl"},
    {"value":"SIN","id": "mx-si"},
    {"value":"CHI","id": "mx-ch"},
    {"value":"VER","id": "mx-ve"},
    {"value":"ZAC","id": "mx-za"},
    {"value":"AGS","id": "mx-ag"},
    {"value":"JAL","id": "mx-ja"},
    {"value":"MIC","id": "mx-mi"},
    {"value":"OAX","id": "mx-oa"},
    {"value":"PUE","id": "mx-pu"},
    {"value":"GRO","id": "mx-gr"},
    {"value":"TLX","id": "mx-tl"},
    {"value":"TAM","id": "mx-tm"},
    {"value":"COA","id": "mx-co"},
    {"value":"YUC","id": "mx-yu"},
    {"value":"DUR","id": "mx-dg"},
    {"value":"GTO","id": "mx-gj"},
    {"value":"SLP","id": "mx-sl"},
    {"value":"HGO","id": "mx-hg"}]



  constructor(private router: Router, private ngZone: NgZone, 
    private fileSrv: FilesService, private alert : AlertsService) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    const data = []
     this.usuario.distritos.filter(es =>{
       const dt = this.llavesEstado.find( t => t.value === es['estado']);
       data.push(dt);
    }, error =>{
      this.loading = false;
      this.alert.serverError();
    }
    );

    this.mapData = data;    
    window['angularComponentRef'] = {component: this, zone: this.ngZone};
  }





  ngOnInit() {
    this.chart().finally(() => {
      this.loading = false;
    });


  }

  async chart() {
    this.options = {
        chart: {
          backgroundColor: 'transparent',
        
        },
        title:'',
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          },
          enableDoubleClickZoomTo: false
        },
        plotOptions: {
          map: {
            states: {
              hover: {
                color: '#dba604'
              }
            },
            point: {
              events: {

                dblclick: (e)=> {
                  this.loading =true;
                  window['angularComponentRef'].zone.run(() => {
                    if (e.point && e.point.value) {
                      window['angularComponentRef'].component.navigate(e.point.value);

                    }else{
                      this.loading =false;
                    }
                  });
                },
                click: (e) => {
                  this.loading =true;
                  window['angularComponentRef'].zone.run(() => {

                    if (e.point && e.point.value) {
                      window['angularComponentRef'].component.selected(e.point.value);
                    } else{
                      this.loading =false;
                    }
                  });
                }
              }
            }
          }
        },
        tooltip: {
          useHTML: true,
          headerFormat: '<br><b>Padrón</b><br> ',
          pointFormat: '{series.data}',
          formatter: function ()  {
            return '<br><b>Padrón</b><br> ';
        },

          /*formatter: 
            function(e){
              console.log(e.chart.hoverPoint.value, this)
                  window['angularComponentRef'].component.tooltipFormatter(e.chart.hoverPoint.value);
                 // return '<br><b>Padrón</b><br> '
              
            }
          ,*/

//          headerFormat: '<br><b>Padrón</b><br> ',
/*          pointFormat: '1,827,129<br>' +
             '<b>Nominal<b><br>' +
             '1,821,124<br>' +
             '<br>' +
             '<b>__________________________________<b><br>' +
             '<b>Preocupaciones:<b><br>' +
             'Violencia<br>' +
             'Sequía<br>' +
             'Corrupción<br>' +
             'Ley Protección Animal<br>',
          footerFormat: 'Todos por Saltillo<br>' + 'Echado pa´delante<br>'*/
        },
        series: [{
          name: 'MX',
          color: '#ed6706',
          data: [...this.mapData],
          mapData: usaMap,
          showInLegend: false,
          joinBy: ["hc-key", "id"],
          dataLabels: {
            enabled: true,
            format: '{point.properties.name}'
          },
          allowPointSelect: false,
        }],
        responsive: {
          rules: [{
            condition: {
              maxHeight: '600px'
            },
            chartOptions: {
              xAxis: {
                labels: {
                  formatter() {
                    return this.value.charAt(0);
                  }
                }
              },
              yAxis: {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -2
                },
                title: {
                  text: ''
                }
              }
            }
          }]
        }
      };

    //options.series.data = [...this.mapData];
    //console.log('chart',this.options)
    //this.options.tooltip['footerFormat'] = this.infoEstado.base +'Nominal';
    //    '1,821,124<br>' +
    //    '<b>Preocupaciones:<b><br>' +
    //    'Violencia<br>' +
    //    'Sequía<br>' +
    //    'Corrupción<br>' +
    //    'Ley Protección Animal<br>';
  Highcharts.mapChart('mexico', this.options);
  }

  selected(id) {
    localStorage.setItem('estado',id); 

      this.fileSrv.getInfoEstado(id).subscribe(info => {
        if(info === null){
          this.infoEstado =[];
          this.loading = false;
        }else{

          this.infoEstado = info[0];
          this.loading = false;
        }
      }, () =>{
        this.loading = false;
        this.alert.serverError();
      });
  }

  navigate(edo){
    let id;
    this.usuario['distritos'].filter(es => {
      if(edo === es.estado) {
        id = es.distrito;
        this.loading = false;
        this.router.navigate(['distritos', id]);
      }
   })

  }


  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
  }

}
