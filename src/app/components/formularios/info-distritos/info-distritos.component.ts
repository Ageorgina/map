import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../../general/services/menu.service';
import { MapasService } from '../../../general/services/mapas.service';
import { Utils } from '../../../general/utils/utils';
import { AlertsService } from '../../../general/services/alerts.service';
import { InfoEstado } from 'src/app/general/model/info-estado';
import { InfoDistrito } from '../../../general/model/info-distrito';
import { FilesService } from '../../../general/services/files.service';

@Component({
  selector: 'app-info-distritos',
  templateUrl: './info-distritos.component.html',
  styleUrls: ['./info-distritos.component.scss']
})
export class InfoDistritosComponent implements OnInit {
  titulo = 'Agregar';
  date = Date().toString();
  distritos: any[] = [];
  estados: any[] = [];
  distritoForm: FormGroup;
  submitted = false;
  error = 'Campo Obligatorio';
  loading = true;
  disabledDist = false;
  estado: string;
  numDistrito: string;
  nombre: string;
  distritoInfo = new InfoDistrito();
  gentilicio: string;
  constructor( private mapaSrv: MapasService, private menu: MenuService, private formBuilder: FormBuilder, private fileSrv: FilesService,
               public utils: Utils, private alert: AlertsService ) {
    this.distritoForm = this.formBuilder.group({
      clave_entidad: ['', Validators.required],
      base: ['', Validators.required],
      distrito: ['', Validators.required],
      indecisos: ['', Validators.required],
      arrepentidos: ['', Validators.required],
      proOposicion: ['', Validators.required],
      audienciaDigital: ['', Validators.required],
      competencia: ['', Validators.required],
      afiliados: ['', Validators.required],
      activosDigitales: ['', Validators.required],
      alcance: ['', Validators.required],
      influencia: ['', Validators.required],
      tracking: ['', Validators.required],
      mhoraini: ['', Validators.required],
      fhoraini: ['', Validators.required],
      mhorafin: ['', Validators.required],
      fhorafin: ['', Validators.required],
    });
    this.mapaSrv.getCoordenadasDistritos().subscribe(distritos => this.distritos = distritos);
    this.menu.getinfoMx().subscribe(estados =>  this.estados = estados );
  }
  get fval() { return this.distritoForm.controls;  }

  ngOnInit() { this.loading = false; }
  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.distritoForm.invalid) {
      this.errorOperacion().finally(() => this.loading = false);
      return;
    }
    this.distritoInfo.base = this.distritoForm.value.base + '\xa0' + this.gentilicio;
    this.distritoInfo.indecisos = this.distritoForm.value.indecisos;
    this.distritoInfo.arrepentidos = this.distritoForm.value.arrepentidos;
    this.distritoInfo.proOposicion = this.distritoForm.value.proOposicion;
    this.distritoInfo.audienciaDigital = this.distritoForm.value.audienciaDigital;
    this.distritoInfo.hombres = this.distritoForm.value.mhoraini + '\xa0' + this.distritoForm.value.mhorafin ;
    this.distritoInfo.mujeres = this.distritoForm.value.mhoraini + '\xa0' + this.distritoForm.value.mhorafin ;
    this.distritoInfo.competencia = this.distritoForm.value.competencia;
    this.distritoInfo.afiliados = this.distritoForm.value.afiliados;
    this.distritoInfo.activosDigitales = this.distritoForm.value.activosDigitales;
    this.distritoInfo.tracking = this.distritoForm.value.tracking;
    this.distritoInfo.alcance = this.distritoForm.value.alcance;
    this.distritoInfo.influencia = this.distritoForm.value.influencia;
    this.fileSrv.postInfoDistrito(this.nombre, this.distritoInfo).subscribe( () => {
			this.loading = false;
			this.success().finally(() => {
        this.submitted = false;
        this.disabledDist = false;
        this.distritoForm.reset();
			});
		}, () => {
			this.loading = false;
			this.errorOperacion().finally(() => {});
		});

  }
	 capturarNombre(event) {
     let dist: string;
     dist = event.srcElement.value;
	 	if (dist.length === 2) {
	 		this.numDistrito = '0' + dist;
	 	} else {
	 		this.numDistrito = '00' + dist;
	 	}
     this.nombre = this.estado + '_DIS' + this.numDistrito + '_INFO.js';
     console.log(this.nombre);
	}

  checkNumeros($event: KeyboardEvent) { this.utils.numeros($event); }

  selected(event) {
    this.estado = event.srcElement.value;
    this.disabledDist = true;
    this.estados.filter( estado => {
      if (estado.clave_entidad === event.srcElement.value ) {
        this.gentilicio = estado.gentilicio;
        console.log(this.gentilicio)
        this.distritos = estado.distritos;
      }
    });
  }

  async success() { this.alert.showSaveSuccess(); }
  async errorOperacion() { this.alert.showError(); }
}
