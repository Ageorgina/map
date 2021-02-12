import { Component, OnInit } from '@angular/core';
import { Chart } from '../../general/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService, MenuService } from '../../general/services';
import { Utils } from '../../general/utils/utils';

@Component({
  selector: 'app-info-charts',
  templateUrl: './info-charts.component.html',
  styleUrls: ['./info-charts.component.scss']
})
export class InfoChartsComponent implements OnInit {
  loading = true;
  titulo = "Gráfica";
  chart = new Chart;
  chartForm: FormGroup;
  distritos: any[] = [];
  estados: any[] = [];
  submitted = false;
  error = 'Campo Obligatorio';
  disabledDist = false;
  estado: string;
  numDistrito: string;
  nombre: string;
  gentilicio: string;
  toolForm: FormGroup;
  preocupaciones = [];
  sum = 0;

  constructor(private formBuilder: FormBuilder,private menu: MenuService,
                private alert: AlertsService, public utils: Utils) {
                  //this.menu.getPartidos().subscribe(partidos => this.partidos = partidos );
                  this.menu.getinfoMx().subscribe(estados => this.estados = estados );
                  this.chartForm = this.formBuilder.group({
                    clave_entidad: ['', Validators.required],
                    distrito: [''],
                    base: ['', Validators.required],
                    miedo: ['', Validators.required],
                    introspeccion: ['', Validators.required],
                    orgullo: ['', Validators.required],
                    asertividad: ['', Validators.required],
                    incertidumbre: ['', Validators.required],
                    decepcion: ['', Validators.required],
                  });
                 // this.chartForm.get(['clave_estado']).setValue('Estado')
                 }
                 get fval() { return this.chartForm.controls;  }

  ngOnInit() {
    this.loading = false;
  }
  checked(event){
    console.log(event)
    if(event === true){
      this.disabledDist = true;
    } else {
      this.disabledDist = false;
    }
  }
  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if (this.chartForm.invalid) {
      this.loading = false;
      return;
    }
    this.chart.miedoSalud = Number(this.fval.miedo.value);
    this.chart.introspeccion = Number(this.fval.introspeccion.value);
    this.chart.orgullo = Number(this.fval.orgullo.value);
    this.chart.asertividad = Number(this.fval.asertividad.value);
    this.chart.incertidumbre = Number(this.fval.incertidumbre.value);
    this.chart.decepcion = Number(this.fval.decepcion.value);
    this.sum = this.chart.miedoSalud +
    this.chart.introspeccion +
    this.chart.orgullo +
    this.chart.asertividad +
    this.chart.incertidumbre +
    this.chart.decepcion;
    console.log(this.sum)
    if(this.sum > 100 || this.sum < 100){
      this.sum = 0;
      this.alert.sumError();
      this.loading = false;
      return;
    }
    console.log(this.disabledDist)
    if(this.disabledDist === false ){
    this.chart.clave_entidad = this.fval.clave_entidad.value;
    }
    this.chart.base = this.fval.base.value;

    this.nombre = this.estado + '_GRAFICA.js';
    if(this.disabledDist === true ){
      this.chart.distrito = this.fval.distrito.value;
      this.capturarNombre(this.chart.distrito );
    }
    this.loading = false;
    this.alert.showSuccess();
    this.clear();

    console.log(this.nombre,this.chart)
  }
  capturarNombre(dist) {
    if (dist.length === 2) {
      this.numDistrito = '0' + dist;
    } else {
      this.numDistrito = '00' + dist;
    }
    this.nombre = 'GRAFICA_'+'DIS' + this.numDistrito +'.js';
 }

 checkNumeros($event: KeyboardEvent) { this.utils.numeros($event); }
 checkPorcentaje($event: KeyboardEvent) { this.utils.porcentaje($event); }

 selected(event) {
   this.estado = event.srcElement.value;
   this.gentilicio = this.estados.find(estado => estado.clave_entidad === this.estado).gentilicio;
   this.distritos = this.estados.find(estado => estado.clave_entidad === this.estado).distritos;
 }
 clear(){
   this.submitted = false;
   this.loading = false;
   this.chartForm.reset();

 }
}
