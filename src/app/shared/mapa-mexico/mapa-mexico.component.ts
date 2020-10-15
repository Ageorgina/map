import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts/highmaps';
import { MenuService } from '../../general/services/menu.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthenticationService} from '../../general/services/authentication.service';
import { FilesService } from '../../general/services/files.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

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
    distritos: any;
    cookies: any;
    loading = true;

  constructor(  private menuSrv: MenuService,  private router: Router, private ngZone: NgZone,
                private authService: AuthenticationService, private fileSrv: FilesService) {
    this.fileSrv.getInfoEstado().subscribe( info => this.infoEstado = info[0] );
    this.menuSrv.getDistritosCOA().subscribe(distritos => this.distritos = distritos );
        // tslint:disable-next-line: align
        window['angularComponentRef'] = { component: this, zone: ngZone } ;
   }

   options: any = {
    chart: {
        backgroundColor: '#3F3F3F',
        events: {
            drilldown(e) {
                if (!e.seriesOptions) {
                    var chart = this,
                        mapKey = 'countries/mx/' + e.point.drilldown + '-all',
                        fail = setTimeout(function() {
                            if (!Highcharts.maps[mapKey]) {
                                this.estadoID = e.point.name;
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                fail = setTimeout(function() {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);
                }
            },
        }
    },
    title: {
        text: ''
    },
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },
    plotOptions: {
        map: {
            states: {
                hover: {
                    color: '#dba604'
                }
            }
        }
    },
    tooltip: {
        headerFormat: '<br><b>Padrón</b><br> ',
        pointFormat: '1,827,129<br>' +
            '<b>Nominal<b><br>' +
            '1,821,124<br>' +
            '<br>' +
            '<b>__________________________________<b><br>' +
            '<b>Preocupaciones:<b><br>' +
            'Violencia<br>' +
            'Sequía<br>' +
            'Corrupción<br>' +
            'Ley Protección Animal<br>',
        footerFormat: 'Todos por Saltillo<br>' + 'Echado pa´delante<br>'
    },
    series: [{
        name: 'MX',
        color: '#ed6706',
        data: [{
            id: "mx-co",
            value: '5'
        }],
        mapData:  usaMap,
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


  ngOnInit() {
      this.chart().finally(()=> {
        this.estadoValue = this.authService.getCOOKIE().substring(0, 3);
        // this.distValue = this.estado.getCOOKIE().match(regex).toString();
        // this.distValue= this.distValue.replace(/[0+]/g, "");
        //this.partidoValue = this.estado.getCOOKIE().slice(6);

        this.loading = false;
      });



  }

  async chart() {
    Highcharts.mapChart('mexico', this.options);
  }

  selected(id) {
      console.log(id)
      this.router.navigate(['distritos', id]);

  }
  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
    /* tslint:enable:no-string-literal */
  }

}
