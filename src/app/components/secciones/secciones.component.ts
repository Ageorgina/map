import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {
  emociones = [];
  ejemplo: any;
  partidos: any;
  partido1: any;

  constructor( private menuSrv: MenuService) {
  }

  ngOnInit() {
  }


}
