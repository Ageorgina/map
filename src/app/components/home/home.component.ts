import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuService, FilesService, InfoService } from '../../general/services';
import * as Highcharts from 'highcharts';
import { Emocion } from '../../general/model/emocion';
import { Chart } from '../../general/model/chart';
declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emociones: Emocion[] = [];
  chart = new Chart;
  estado = sessionStorage.getItem('estado');
  sinInfo = false;




  constructor( private menuSrv: MenuService, private fileSrv: FilesService, private infoSrv: InfoService  ) {
   




  }


 options: any = {
    chart: {
        type: 'pie',
        backgroundColor: 'transparent'
    },
    title: {
        text: 'Emociones',
        style: {
            color: '#FFFFFF',
            fontSize: '20px'
        }
    },
    subtitle: {
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
            fontSize: '16px'
        },
    }
  };



  ngOnInit() {}

  inicializarChart() {
    this.sinInfo = false;
    Highcharts.setOptions({
      colors: ['#fabc07', '#f88304', '#ed6706', '#d01f08', '#871a0a', '#4d0b08'],
    });
    this.options.series[0].data[0] = {
      name: 'Miedo/Salud',
      y: this.chart.miedoSalud
    }
    this.options.series[0].data[1] = {
      name: 'Introspeccion',
      y:  this.chart.introspeccion
    }

    this.options.series[0].data[2] = {
      name: 'Orgullo',
      y: this.chart.orgullo
    }
    this.options.series[0].data[3] = {
      name: 'Asertividad',
      y: this.chart.asertividad
    }
    this.options.series[0].data[4] = {
      name: 'Incertidumbre',
      y: this.chart.incertidumbre
    }
    this.options.series[0].data[5] = {
      name: 'Decepcion',
      y: this.chart.decepcion
    }
    this.options.subtitle.text = this.chart.base;
    Highcharts.chart('containerEmotionsChart', this.options);
    
  }


  recibiRespuesta(event){
    this.infoSrv.getEdoChart(event).subscribe( response => {
      if(response === [] || response === undefined){
     
        this.sinInfo = true;
        return;
      }
      this.chart.base = response[0].contenido.base +' '+ String(response[0].contenido.gentilicio).toUpperCase();
      this.chart.miedoSalud = response[0].contenido.miedoSalud;
      this.chart.introspeccion = response[0].contenido.introspeccion;
      this.chart.orgullo = response[0].contenido.orgullo;
      this.chart.asertividad = response[0].contenido.asertividad;
      this.chart.incertidumbre = response[0].contenido.incertidumbre;
      this.chart.decepcion = response[0].contenido.decepcion;
      this.chart.clave_entidad = response[0].contenido.clave_entidad;
this.inicializarChart();

    });
  }
}

