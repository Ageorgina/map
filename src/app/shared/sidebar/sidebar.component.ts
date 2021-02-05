import { Component, OnInit } from '@angular/core';
import { Menu } from '../../general/model/menu';
import { MenuService } from '../../general/services/menu.service';
import {AuthenticationService} from '../../general/services/authentication.service';
import { PartidosService } from '../../general/services/partidos.service';
import { User } from '../../general/model/user';
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
  user = new User;
  constructor(private menuSrv: MenuService) {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.rol === 'ADMINISTRADOR') {
      this.menuSrv.getOptsADM().subscribe((main: Menu[]) => {
        this.menu = main;
      });
    } else if (this.user.rol === 'INFLUENCER') {
      this.menuSrv.getOptsINF().subscribe((main: Menu[]) => {
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
