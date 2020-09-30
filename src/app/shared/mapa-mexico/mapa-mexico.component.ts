import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-mapa-mexico',
  templateUrl: './mapa-mexico.component.html',
  styleUrls: ['./mapa-mexico.component.scss']
})
export class MapaMexicoComponent implements OnInit {

  constructor() {
   }



  ngOnInit() {

  }


  /*    var data = Highcharts.geojson(Highcharts.maps['countries/mx/mx-all']),
  small = $('#mexico').width() < 400;

  // Mexico
  Highcharts.mapChart('mexico', {
      chart: {
          events: {
              drilldown: function(e) {
                  if (!e.seriesOptions) {
                      var chart = this,
                          mapKey = 'countries/mx/' + e.point.drilldown + '-all',
                          // Handle error, the timeout is cleared on success
                          fail = setTimeout(function() {
                              if (!Highcharts.maps[mapKey]) {
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
          text: 'Mapa de la República Mexicana'
      },

      subtitle: {
          text: '',
          floating: true,
          align: 'right',
          y: 50,
          style: {
              fontSize: '16px'
          }
      },

      legend: small ? {} : {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      colorAxis: {
          min: 0,
          minColor: '#E6E7E8',
          maxColor: '#db6904'
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


      series: [{

          data: [{
              id: "mx-co",

              value: 100
          }],
          mapData: data,
          allowPointSelect: false,
          joinBy: ["hc-key", "id"],
          name: 'MX',
          drilldown: {
              series: [{
                  name: "mx-co",
                  id: "mx-co",
                  data: [
                      ['mx-co-27', 58]
                  ]
              }]


          },

          dataLabels: {
              enabled: true,
              format: '{point.properties.name}'
          }
      }, {
          type: 'mapline',

          color: 'silver',
          enableMouseTracking: false,
          animation: {
              duration: 500
          }
      }],

      drilldown: {
          activeDataLabelStyle: {
              color: '#FFFFFF',
              textDecoration: 'none',
              textOutline: '1px #000000'
          },
          drillUpButton: {
              relativeTo: 'spacingBox',
              position: {
                  x: 0,
                  y: 60
              }
          },


      }
  });*/
}
