import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';
import { CookieService } from 'ngx-cookie-service';
import { EstadosService } from '../../general/services/estados.service';

var regex = /(\d+)/g;
@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {
  emociones = [];
  ejemplo: any;
  partidos: any;
  partido1: any;
  partido2: any;
  partido3: any;
  partido4: any;
  loading = true;
  distrito: any;

  constructor( private menuSrv: MenuService, private CookieService: CookieService, private estado: EstadosService) {
    this.distrito = this.estado.getCOOKIE().match(regex).toString();
    this.menuSrv.getEmociones().subscribe( emociones => this.emociones = emociones);
    this.menuSrv.getInfo().subscribe( info => this.ejemplo = info[0]);
    this.menuSrv.getPartidos().subscribe( partidos => {
      this.partido1 = partidos[0];
      this.partido2 = partidos[1];
      this.partido3 = partidos[2];
      this.partido4 = partidos[3];
    });
  }

  ngOnInit() {
    this.loading = false;
  }

}
