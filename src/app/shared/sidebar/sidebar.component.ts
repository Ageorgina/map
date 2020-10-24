import { Component, OnInit } from '@angular/core';
import { Menu } from '../../general/model/menu';
import { MenuService } from '../../general/services/menu.service';
import {AuthenticationService} from '../../general/services/authentication.service';
import { PartidosService } from '../../general/services/partidos.service';
var regex = /(\d+)/g;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: Menu[] = [];
  distrito: any;
  info: any;
  estado: any;
  error: boolean;
  constructor(private menuSrv: MenuService) {
    this.estado = localStorage.getItem('estado').replace(/[""]/g, '');
    this.distrito = localStorage.getItem('distrito').replace(/[""]/g, '');
    if (localStorage.getItem('distrito') === '000' && localStorage.getItem('estado') === 'ADM') {
      this.menuSrv.getOptsADM().subscribe((main: Menu[]) => {
        this.menu = main;
      });
    } else {
      this.menuSrv.getOpts().subscribe((main: Menu[]) => {
        main.filter( op => {
          if (this.error === false) {
            this.menu = main;
          } else {
            if (op.nombre !== 'Partidos') {
              this.menu.push(op);
            }
          }
        });
      });
    }

  }

  ngOnInit() {
  }
}
