import { Component, OnInit } from '@angular/core';
import { User } from '../../general/model/user';
import { UserService } from '../../general/services/user.service';

@Component({
  selector: 'app-admon-users',
  templateUrl: './admon-users.component.html',
  styleUrls: ['./admon-users.component.scss']
})
export class AdmonUsersComponent implements OnInit {
  usuarios: User[] = [];
  loading = true;

  constructor( private userSrv: UserService) { 
    this.userSrv.getUsers().subscribe(response =>{
      this.usuarios = response['data']
      this.loading = false;

    })
  }

  ngOnInit() {
  }

}
