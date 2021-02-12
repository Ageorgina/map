import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html',
  styleUrls: ['./distritos.component.scss']
})
export class DistritosComponent implements OnInit {
  constructor(  ) {
  }


  ngOnInit() {

  }





}
