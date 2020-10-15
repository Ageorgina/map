import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuService } from '../../../general/services/menu.service';
import { MapasService } from '../../../general/services/mapas.service';

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
  constructor(private mapaSrv: MapasService, private menu: MenuService, private formBuilder: FormBuilder) {
    console.log('entro')
    this.distritoForm = this.formBuilder.group({
      base: [''],
      distrito: [''],
      indecisos: [''],
      arrepentidos: [''],
      proOposicion: [''],
      audienciaDigital: [''],
      competencia: [''],
      afiliados: [''],
      activosDigitales: [''],
      tracking: [''],
      mhoraini: [''],
      fhoraini: [''],
      mhorafin: [''],
      fhorafin: [''],
    });
    this.mapaSrv.getCoordenadasDistritos().subscribe(distritos => this.distritos = distritos);
    this.menu.getinfoMx().subscribe(estados => { console.log('estados', estados); this.estados = estados } );
  }
  get fval() { return this.distritoForm.controls;  }

  ngOnInit() {
  }
  onSubmit() {
    console.log( this.fval );
  }
}
