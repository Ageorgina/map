import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { EstadosService } from '../../general/services/estados.service';
declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

var $;
const data = [
  ["732",732],
  ["735",735],
  ["739",739],
  ["742",742],
  ["764",764],
  ["741",741],
  ["749",749],
  ["733",733],
  ["740",740],
  ["760",760],
  ["761",761],
  ["775",775],
  ["779",779],
  ["774",774],
  ["773",773],
  ["750",750],
  ["763",763],
  ["778",778],
  ["805",805],
  ["804",804],
  ["803",803],
  ["802",802],
  ["776",776],
  ["757",757],
  ["758",758],
  ["829",829],
  ["831",831],
  ["868",868],
  ["869",869],
  ["756",756],
  ["753",753],
  ["755",755],
  ["751",751],
  ["780",780],
  ["734",734],
  ["762",762],
  ["752",752],
  ["759",759],
  ["754",754],
  ["777",777],
  ["772",772],
  ["1614",1614],
  ["1613",1613],
  ["1612",1612],
  ["1611",1611],
  ["1616",1616],
  ["1615",1615],
  ["1617",1617],
  ["1620",1620],
  ["1619",1619],
  ["1621",1621],
  ["1631",1631],
  ["1629",1629],
  ["1623",1623],
  ["1627",1627],
  ["1630",1630],
  ["1635",1635],
  ["1634",1634],
  ["1633",1633],
  ["1636",1636],
  ["1638",1638],
  ["1637",1637],
  ["1639",1639],
  ["1641",1641],
  ["1625",1625],
  ["1640",1640],
  ["1622",1622],
  ["1624",1624],
  ["1628",1628],
  ["1626",1626],
  ["1632",1632],
  ["1618",1618],
  ["730",730],
  ["801",801],
  ["800",800],
  ["731",731]
  ];

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

  constructor(private estado: EstadosService) {
    this.estado.getSecciones().subscribe(cvsInfo => this.construirMapa(cvsInfo));
   }
   mapa: any = {
     chart: {
       backgroundColor: '#3F3F3F'
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
        data: data,
        keys: ['SECCION', 'value'],
        joinBy: 'SECCION',
        dataLabels: {
          enabled: true,
          format: '{point.properties.SECCION}'
        }
      }]
    };

   ngOnInit() {

    }

   construirMapa(seccionesJSON) {
    this.mapa.chart.map = seccionesJSON;
    Highcharts.mapChart('secciones', this.mapa);
  }

  infoSecciones() {
    this.estado.getCSV().subscribe(info => {
      const match = info.match(/\n+[0-9]{1,4}/g);
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
      case 'Naranja': return '#ed6706';
      case 'Rojo': return '#d01f08';
      case 'Amarillo': return '#fabc07';
      default: return '#ffffff';
    }
  }

  seccionClicked(click) {
    this.seccionID = click.point.SECCION;
    for (let i = 1; i < this.datosSecciones.length; i++) {
      const datos = this.datosSecciones[i].split(',');
     // console.log(datos[0])
      if (datos[0].includes(this.seccionID.toString())){
        this.selectedSeccion = datos;
      }
    }

  }

}
