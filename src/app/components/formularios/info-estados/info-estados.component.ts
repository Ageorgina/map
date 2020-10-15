import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from '../../../general/services/menu.service';
import { MapasService } from '../../../general/services/mapas.service';

@Component({
  selector: 'app-info-estados',
  templateUrl: './info-estados.component.html',
  styleUrls: ['./info-estados.component.scss']
})
export class InfoEstadosComponent implements OnInit {
  titulo = 'Agregar';
  date = Date().toString();
  distritos: any[] = [];
  estados: any[] = [];
  estadoForm: FormGroup;
  constructor(private mapaSrv: MapasService, private menu: MenuService, private formBuilder: FormBuilder) {
   this.estadoForm = this.formBuilder.group({
     clave_entidad: [''],
      base: [''],
      indecisos: [''],
      arrepentidos: [''],
      proOposicion: [''],
      audienciaDigital: [''],
      competencia: [''],
      distritos: [''],
      afiliados: [''],
      activosDigitales: [''],
      tracking: ['']
    });

   this.distritos = [ 'Saltillo', 'Torreón', 'Piedras Negras', 'San Juan', 'Sabinas', 'Acuña', 'Matamoros', 'Monclova', 'San Pedro'];

   this.menu.getinfoMx().subscribe(estados => this.estados = estados );
  }
  get fval() { return this.estadoForm.controls; }

  ngOnInit() { }
  onSubmit() {
    console.log(this.fval);
  }
}
