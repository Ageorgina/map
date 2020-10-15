import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';
import * as Highcharts from 'highcharts';
import { Emocion } from '../../general/model/emocion';
declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-emociones',
  templateUrl: './emociones.component.html',
  styleUrls: ['./emociones.component.scss']
})
export class EmocionesComponent implements OnInit {
  emociones: Emocion[] = [];
  people = '452,812';
  constructor( private menuSrv: MenuService) {

    this.menuSrv.getEmociones().toPromise().then( emociones =>  {
      this.emociones = emociones;
      this.options.series[0].data[0] = {
        name: this.emociones[0].nombre,
        y: this.emociones[0].dato
      };
      this.options.series[0].data[1] = {
        name: this.emociones[1].nombre,
        y: this.emociones[1].dato
      };
      this.options.series[0].data[2] = {
        name: this.emociones[2].nombre,
        y: this.emociones[2].dato
      };
      this.options.series[0].data[3] = {
        name: this.emociones[3].nombre,
        y: this.emociones[3].dato
      };
      this.options.series[0].data[4] = {
        name: this.emociones[4].nombre,
        y: this.emociones[4].dato
      };
      this.options.series[0].data[5] = {
        name: this.emociones[5].nombre,
        y: this.emociones[5].dato
      };
    }).finally(() => this.inicializarChart());
  }


 options: any = {
    chart: {
        type: 'pie',
        backgroundColor: '#3F3F3F'
    },
    title: {
        text: 'Emociones',
        style: {
            color: '#FFFFFF',
            fontSize: '20px'
        }
    },
    subtitle: {
        text: this.people + ' Coahuilenses',
        style: {
            color: '#FFFFFF',
            fontSize: '16px'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        },
        series: [{
            events: {
                legendItemClick: function() {
                    return false;
                }
            }
        }]

    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{}],
        dataLabels: {
            enabled: false,
            inside: false,
            format: '{y} %'
        }
    }],
    legend: {
        layout: 'vertical',
        floating: false,
        align: 'center',
        verticalAlign: 'bottom',
        labelFormatter: function() {
            return this.name + '<br>' + this.y + '%';
        },
        itemStyle: {
            color: '#FFFFFF',
            fontSize: '18px'
        },
    }
  };


  ngOnInit() {

  }

  inicializarChart() {

    Highcharts.setOptions({
      colors: ['#fabc07', '#f88304', '#ed6706', '#d01f08', '#871a0a', '#4d0b08'],
    });
    Highcharts.chart('containerEmotionsChart', this.options);
  }

}

