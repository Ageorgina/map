import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';
import { Menu } from '../../general/model/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  constructor(private menuSrv: MenuService) {
    this.menuSrv.getOpts().subscribe((main: Menu[]) => {
      this.menu = main;
    });
  }

  ngOnInit() {
  }

}
