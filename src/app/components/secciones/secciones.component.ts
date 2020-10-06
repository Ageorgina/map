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
    this.menuSrv.getEmociones().subscribe( emociones => this.emociones = emociones);
    this.menuSrv.getInfo().subscribe( info => this.ejemplo = info[0]);

    this.menuSrv.getPartidos().subscribe( partidos => {
      this.partido1 = partidos[0];
    });
  }

  ngOnInit() {
  }


}
