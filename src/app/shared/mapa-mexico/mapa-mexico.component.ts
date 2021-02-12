import {Component, OnInit, NgZone, OnDestroy , Output} from '@angular/core';
import {Router} from '@angular/router';
import * as Highcharts from 'highcharts/highmaps';

import customEvents from 'highcharts-custom-events';
import {FilesService} from '../../general/services';
import {User} from "../../general/model";
import { AlertsService } from '../../general/services/alerts.service';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';
import { EventEmitter } from '@angular/core';

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
  color: any;
  estadoID: any;
  infoEstado: any;
  ciudades: any;
  cookies: any;
  loading = true;
  mapData: any[];
  usuario: User;
  options: any;
  @Output()  edo: EventEmitter<string> = new EventEmitter<string>();

  llavesEstado: any[] = [
    {"value":"AGS","id": "mx-ag"},
    {"value":"BCN","id": "mx-bc"},
    {"value":"BCS","id": "mx-bs"},
    {"value":"CAM","id": "mx-cm"},
    {"value":"COA","id": "mx-co"},
    {"value":"COL","id": "mx-cl"},
    {"value":"CHS","id": "mx-cs"},
    {"value":"CHI","id": "mx-ch"},
    {"value":"CMX","id": "mx-df"},
    {"value":"DUR","id": "mx-dg"},
    {"value":"GTO","id": "mx-gj"},
    {"value":"GRO","id": "mx-gr"},
    {"value":"HGO","id": "mx-hg"},
    {"value":"JAL","id": "mx-ja"},
    {"value":"MEX","id": "mx-mx"},
    {"value":"MIC","id": "mx-mi"},
    {"value":"MOR","id": "mx-mo"},
    {"value":"NAY","id": "mx-na"},
    {"value":"NVL","id": "mx-nl"},
    {"value":"OAX","id": "mx-oa"},
    {"value":"PUE","id": "mx-pu"},
    {"value":"QRO","id": "mx-qt"},
    {"value":"QOO","id": "mx-qr"},
    {"value":"SLP","id": "mx-sl"},
    {"value":"SIN","id": "mx-si"},
    {"value":"SON","id": "mx-so"},
    {"value":"TAB","id": "mx-tb"},
    {"value":"TAM","id": "mx-tm"},
    {"value":"VER","id": "mx-ve"},
    {"value":"TLX","id": "mx-tl"},
    {"value":"YUC","id": "mx-yu"},
    {"value":"ZAC","id": "mx-za"}
]



  constructor(private router: Router, private ngZone: NgZone, 
    private fileSrv: FilesService, private alert : AlertsService) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if (this.usuario['partido'] === 'PAN') {
      this.color = '#4c6a9b';
    } else if (this.usuario['partido'] === 'MOR') {
      this.color = '#af0d0d';
    } else if (this.usuario['partido'] === 'PRI') {
      this.color = '#5b9a52';
    } else if (this.usuario['partido'] === 'MOC') {
      this.color =  '#fc7f25';
    } else{
      this.color =  '#bf429b';
    }
    sessionStorage.setItem('color', this.color)
   // console.log(this.color)
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
                brightness: -0.15,
                borderColor: 'gray'
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
    console.log(this.usuario['partido'],this.color)
    this.options.series[0].color = this.color;
  Highcharts.mapChart('mexico', this.options);
  }

  selected(id) {
    this.edo.emit(id);
    sessionStorage.setItem('estado',id); 

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
