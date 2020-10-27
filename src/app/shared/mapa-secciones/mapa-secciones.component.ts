import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import {ActivatedRoute} from '@angular/router';
import { MapasService } from '../../general/services/mapas.service';

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
export class MapaSeccionesComponent implements OnInit, OnDestroy {
  loading = true;
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
  cookies: any;
  seccionInf = [];
  cvsInfo: any;
  estadoValue: string;
  distValue: string;
  partidoValue: string;
  estado = localStorage.getItem('estado');
  logo: string;
  mapa: any = {
    chart: {
      backgroundColor: '#3F3F3F',
    },
    title: {text: ''},
    mapNavigation: {
      enabled: true
    },
    colorAxis: {
      tickPixelInterval: 100,
      showInLegend: false,
      dataClasses: this.infoSecciones()
    },plotOptions: {
      map: {
        point: {
          events: {
            click: (e) => {
              /* tslint:disable:no-string-literal */
              window['angularComponentRef'].zone.run(() => {
                if (e.point && e.point.value) {
                  window['angularComponentRef'].component.seccionClicked(e.point.value);
                  }
              });
              /* tslint:enable:no-string-literal */
            }
          }
        }
      }
    },
    tooltip: {
      headerFormat: 'Sección  ',
      pointFormat: ' {point.properties.seccion}'
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

  constructor(private mapaSrv: MapasService, private route: ActivatedRoute, private ngZone: NgZone) {
    this.logoPartido(localStorage.getItem('partido'));
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length < 3) {
      const completar = 3 - this.id.length;
      for (let i = 0; i < completar; i++) {
        this.id = '0' + this.id.toString();
      }
    }
    this.traerData(this.id).finally(() => {
      this.mapaSrv.getCoordenadasSecciones(this.id, this.estado).subscribe(cvsInfo => {
        this.construirMapa(cvsInfo).finally(() => this.loading = false);
      });
    });
    // tslint:disable-next-line: no-string-literal
    window['angularComponentRef'] = {component: this, zone: this.ngZone};
  }

  ngOnInit() {

  }

  async construirMapa(seccionesJSON) {
    this.mapa.series[0].data = this.seccionInf;
    this.mapa.chart.map = seccionesJSON;

    Highcharts.mapChart('secciones', this.mapa);
  }

  infoSecciones() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length < 3) {
      const completar = 3 - this.id.length;
      for (let i = 0; i < completar; i++) {
        this.id = '0' + this.id.toString();
      }
    }
    this.mapaSrv.getCSV(this.id, this.estado).subscribe(info => {
      const match = info.match(/\n+[0-9]{1,4}/g);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < match.length; i++) {
        info = info.replace(match[i], '|' + match[i].substring(1, match[i].length));
      }
      this.datosSecciones = info.split('|');
      this.headers = this.datosSecciones[0].split(',');
      this.generarColores(info.split('|')).finally(() => {
        this.mapa.colorAxis.dataClasses = this.coloresHxd;
      });
    });
  }

  async generarColores(datosSecciones) {
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
      case 'Naranja':
        return '#fc7f25';
      case 'Rojo':
        return '#af0d0d';
      case 'Amarillo':
        return '#fade07';
      case 'Marino' :
        return '#365283';
      case 'Azul' :
        return '#4c6a9b';
      case 'Cielo' :
        return '#8894b8';
      case 'Morado' :
        return '#7b4b83';
      case 'Magenta' :
        return '#bb3373';
      case 'Rosa' :
        return '#c4638b';
      case 'Enebro' :
        return '#3c6e3c';
      case 'Olivo' :
        return '#2c9354';
      case 'Verde' :
        return '#5b9a52';
      default:
        return '#ffffff';
    }
  }

  seccionClicked(click) {
    const lineBreak = '\n';
    this.seccionID = click;
    if (this.seccionID === null) {
      return;
    }
    for (let i = 1; i < this.datosSecciones.length; i++) {
      const datos = this.datosSecciones[i].split(',');
      if (datos[0].includes(this.seccionID.toString())) {
        this.selectedSeccion = datos;
        this.seccionID = this.seccionID;
        this.temas = datos[2].replace(/[/]/g, lineBreak);
        this.emociones = datos[3].replace(/[/]/g, lineBreak);
        this.mujeres = datos[4].replace(/[/]/g, lineBreak);
        this.hombres = datos[5].replace(/[/]/g, lineBreak);
        this.impactos = datos[6].replace(/[/]/g, lineBreak) + lineBreak + datos[7];
      }
    }

  }

  async traerData(id) {
    this.mapaSrv.getInfoMapaSecciones(id, this.estado).subscribe(secciones => {
      this.seccionInf = secciones;
    });
  }

  logoPartido(partido) {
    if (partido === 'PAN') {
      this.logo = 'assets/logos/PANL.png';
    } else if (partido === 'MOR') {
      this.logo = 'assets/logos/MORL.png';
    } else if (partido === 'PRI') {
      this.logo = 'assets/logos/PRIL.png';
    } else if (partido === 'MOC') {
      this.logo = 'assets/logos/MCL.png';
    }
  }
  ngOnDestroy() {
    /* tslint:disable:no-string-literal */
    window['angularComponentRef'] = null;
  }
}
