import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { EstadosService } from '../../general/services/estados.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-mapa-secciones',
  templateUrl: './mapa-secciones.component.html',
  styleUrls: ['./mapa-secciones.component.scss']
})
export class MapaSeccionesComponent implements OnInit {
  datosSecciones = [];
  headers = [];
  secciones = [];
  datosSeccion: any;
  coloresHxd = [];
  seccionID: any;
  selectedSeccion: any;
  temas: any;
  selectedId: any;
  emociones: any;
  mujeres: any;
  hombres: any;
  impactos: any;
  id: any;
  idCVS: any;
  cookies: any
  seccionInf= [];
  cvsInfo: any

  constructor(private estado: EstadosService, private route: ActivatedRoute, private cookieService: CookieService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length < 3) {
      let completar  =  3 - this.id.length;
      for(let i = 0 ; i < completar; i ++ ) {
        this.id = '0' + this.id.toString();
      }
      }
      this.traerData(this.id).finally(()=>{
        console.log('termino 1')
        this.estado.getSecciones(this.id).subscribe( cvsInfo => {
       
          this.construirMapa(cvsInfo);
        })
      });
   }

   mapa: any = {
     chart: {
       backgroundColor: '#3F3F3F',
      },
      title: { text: '' },
      mapNavigation: { enabled: true
      },
      colorAxis: {
        tickPixelInterval: 100,
        showInLegend: false,
        dataClasses: this.infoSecciones()
      },
      series: [{
        borderColor: '#2e2c2c',
        states: {
          hover: {
            brightness: -0.15,
            borderColor: 'gray'
          }
      },
        keys: ['seccion', 'value'],
        joinBy: 'seccion',
        dataLabels: {
          enabled: true,
          format: '{point.properties.seccion}'
        }
      }]
    };

   ngOnInit() {

    }

  async construirMapa(seccionesJSON) {
    console.log('2 seccionesJSON', seccionesJSON)
    this.mapa.series[0].data = this.seccionInf;
    this.mapa.chart.map = seccionesJSON;
      
      Highcharts.mapChart('secciones', this.mapa);
  }

  infoSecciones() {
    console.log('3 inicia pintar el mapa')
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length < 3) {
      let completar  =  3 - this.id.length;
      for(let i = 0 ; i < completar; i ++ ) {
        this.id = '0' + this.id.toString();
      }
      }
    this.estado.getCSV(this.id).subscribe(info => {
      console.log('4 entro a recuperar el cvs info', info)
      const match = info.match(/\n+[0-9]{1,4}/g);
      for ( let i = 0; i < match.length; i++) {
        info = info.replace(match[i], '|' + match[i].substring(1, match[i].length));
      }
      this.datosSecciones = info.split('|');
      this.headers = this.datosSecciones[0].split(',');
      this.generarColores(info.split('|')).finally(() => {
        console.log('5 convirtio los colores a hxd y los asigna a el mapa this.coloresHxd', this.coloresHxd)
        this.mapa.colorAxis.dataClasses = this.coloresHxd;
      });
    });
  }

   async generarColores(datosSecciones) {
     console.log(datosSecciones)
     for (let i = 1; i < datosSecciones.length; i++) {
      const datos = datosSecciones[i].split(',');
      const selectColor = {
            color: this.cambiarColor(datos[1]),
            from: datos[0],
            to: datos[0]
        };
      this.coloresHxd.push(selectColor);
    }
  }

  cambiarColor(color) {
    switch (color) {
      case 'Naranja': return '#fc7f25';
      case 'Rojo': return '#af0d0d';
      case 'Amarillo': return '#fade07';
      case 'Marino' : return	'#365283';
      case 'Azul' : return	'#4c6a9b';
      case 'Cielo' : return	'#8894b8';
      case 'Morado' : return	'#7b4b83';
      case 'Magenta' : return	'#bb3373';
      case 'Rosa' : return	'#c4638b';
      case 'Enebro' : return	'#3c6e3c';
      case 'Olivo' : return	'#2c9354';
      case 'Verde' : return	'#5b9a52';
      default: return '#ffffff';
     }
  }

  seccionClicked(click) {
    const lineBreak = '\n';
    this.seccionID = click;
    if (this.seccionID === null) { return; }
    for (let i = 1; i < this.datosSecciones.length; i++) {
      const datos = this.datosSecciones[i].split(',');
      if (datos[0].includes(this.seccionID.toString())){
        this.selectedSeccion = datos;
        this.seccionID = this.seccionID;
        this.temas = datos[2].replace(/[/]/g, lineBreak);
        this.emociones = datos[3].replace(/'<br>', '[/]'/g, lineBreak);
        this.mujeres = datos[4].replace(/[<br/>, <br>, /]/g, lineBreak);
        this.hombres = datos[5].replace(/[<br/>, <br>, /]/g, lineBreak);
        this.impactos = datos[6].replace(/[/]/g, lineBreak) + lineBreak + datos[7];
      }
    }

  }

 async traerData(id) {
    this.estado.getSeccionesMapas(id).subscribe(secciones => {
      
      this.seccionInf = secciones;
      console.log('1 this.seccionInf', this.seccionInf)
    });
  }
}
