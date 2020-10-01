import { Component, OnInit } from '@angular/core';
import { Menu } from '../../general/model/menu';
import { MenuService } from '../../general/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: Menu[] = [];
  constructor(private menuSrv: MenuService) {
    this.menuSrv.getOpts().subscribe((main: Menu[]) => {
      this.menu = main;
    });
  }

  ngOnInit() {
  }

}