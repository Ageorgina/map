import { Component, OnInit } from '@angular/core';
import { Menu } from '../../general/model/menu';
import { MenuService } from '../../general/services/menu.service';
import { EstadosService } from '../../general/services/estados.service';
var regex = /(\d+)/g;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: Menu[] = [];
  distrito: any;
  constructor(private menuSrv: MenuService, private estado: EstadosService) {
    this.menuSrv.getOpts().subscribe((main: Menu[]) => {
      this.distrito = this.estado.getCOOKIE().match(regex).toString();
      main.filter( op => {
        if (this.distrito === '014') {
          this.menu = main;
        } else {
          if (op.nombre !== 'Partidos') {
            this.menu.push(op);
          }
        }
      });
    });
  }

  ngOnInit() {
  }
}
