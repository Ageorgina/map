import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthenticationService} from '../../general/services/authentication.service';
import { PartidosService } from '../../general/services/partidos.service';

var regex = /(\d+)/g;
@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {
  emociones = [];
  info: any;
  partidos: any;
  partido1: any;
  partido2: any;
  partido3: any;
  partido4: any;
  loading = true;
  distrito: any;
  estado: string;

  constructor( private partidoSrv: PartidosService, private authService: AuthenticationService) {
    this.estado = this.authService.getCOOKIE().substring(0, 3);
    this.distrito = this.authService.getCOOKIE().match(regex).toString();
    this.partidoSrv.getInfoGral(this.estado, this.distrito).subscribe(info => this.info = info[0]);
    this.partidoSrv.getInfoPartidos(this.estado, this.distrito).subscribe( partidos => {
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
