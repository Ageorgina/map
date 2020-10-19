import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../general/services/menu.service';
import { MapasService } from '../../../general/services/mapas.service';
import { Utils } from '../../../general/utils/utils';
import { FilesService } from '../../../general/services/files.service';
import { AlertsService } from '../../../general/services/alerts.service';
import { InfoEstado } from '../../../general/model/info-estado';

@Component({
  selector: 'app-info-estados',
  templateUrl: './info-estados.component.html',
  styleUrls: ['./info-estados.component.scss']
})
export class InfoEstadosComponent implements OnInit {
  titulo = 'Agregar';
  date = Date().toString();
  tag = '+Tag';
  distritos: any[] = [];
  estados: any[] = [];
  estadoForm: FormGroup;
  submitted = false;
  error = 'Campo Obligatorio';
  loading = true;
  nombre: string;
  disabledDist = false;
  estadoInfo = new InfoEstado();
  username: string;
pass: string;
token: any;
gentilicio: string;

  constructor( private mapaSrv: MapasService, private menu: MenuService, private formBuilder: FormBuilder,
               private utils: Utils, private fileSrv: FilesService, private alert: AlertsService) {
   this.estadoForm = this.formBuilder.group({
     clave_entidad: ['', Validators.required],
      base: ['', Validators.required],
      indecisos: ['', Validators.required],
      arrepentidos: ['', Validators.required],
      proOposicion: ['', Validators.required],
      audienciaDigital: ['', Validators.required],
      competencia: ['', Validators.required],
      distritos: ['', Validators.required],
      afiliados: ['', Validators.required],
      activosDigitales: ['', Validators.required],
      tracking: ['', Validators.required]
    });
   this.menu.getinfoMx().subscribe(estados => this.estados = estados );
  }
  get fval() { return this.estadoForm.controls; }

  ngOnInit() { this.loading = false; }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.estadoForm.invalid) {
      this.errorOperacion().finally(   () => this.loading = false);
      return;
    }
    this.nombre = this.fval.clave_entidad.value + '_INFO.js';
    this.estadoInfo.clave_entidad = this.estadoForm.value.clave_entidad;
    this.estadoInfo.base = this.estadoForm.value.base;
    this.estadoInfo.gentilicio = this.gentilicio;
    this.estadoInfo.distritos = this.estadoForm.value.distritos;
    this.estadoInfo.indecisos = this.estadoForm.value.indecisos;
    this.estadoInfo.arrepentidos = this.estadoForm.value.arrepentidos;
    this.estadoInfo.proOposicion = this.estadoForm.value.proOposicion;
    this.estadoInfo.audienciaDigital = this.estadoForm.value.audienciaDigital;
    this.estadoInfo.competencia = this.estadoForm.value.competencia;
    this.estadoInfo.afiliados = this.estadoForm.value.afiliados;
    this.estadoInfo.activosDigitales = this.estadoForm.value.activosDigitales;
    this.estadoInfo.tracking = this.estadoForm.value.tracking;
    this.loading = false;



    this.fileSrv.postInfoEstado(this.nombre, this.estadoInfo).subscribe( () => {
			this.loading = false;
			this.success().finally(() => {
        this.submitted = false;
        this.disabledDist = false;
        this.estadoForm.reset();
			});
		}, error => {
			this.loading = false;
			this.errorOperacion().finally(() => {});
		});
  }


  checkNumeros($event: KeyboardEvent) { this.utils.numeros($event); }
  selected( event ) {
    this.disabledDist = true;
    this.estados.filter(estado => {
      if (estado.clave_entidad === event.srcElement.value ) {
        this.gentilicio = estado.gentilicio;
          estado.distritos.filter(distrito => {
            this.distritos.push(distrito.toString());
          });
        }
    });
  }
  async success() { this.alert.showSaveSuccess(); }
  async errorOperacion() { this.alert.showError(); }
}
