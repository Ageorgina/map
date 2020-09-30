import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../general/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  emociones = [];
  ejemplo: any;
  distritos: any;

  constructor( private menuSrv: MenuService) {
    this.menuSrv.getEmociones().subscribe( emociones => this.emociones = emociones);
    this.menuSrv.getInfo().subscribe( info => this.ejemplo = info[0]);
    this.menuSrv.getDistritos().subscribe( distritos => this.distritos = distritos);
  }

  ngOnInit() {
  }

}
