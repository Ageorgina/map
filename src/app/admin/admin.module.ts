import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { AdmonUsersComponent } from './admon-users/admon-users.component';



@NgModule({
  declarations: [UsuariosComponent, AdmonUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TagInputModule,
  ],
  exports:[UsuariosComponent, AdmonUsersComponent]
})
export class AdminModule { }
