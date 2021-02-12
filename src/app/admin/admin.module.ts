import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { AdmonUsersComponent } from './admon-users/admon-users.component';
import { InfoChartsComponent } from './info-charts/info-charts.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [UsuariosComponent, AdmonUsersComponent, InfoChartsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TagInputModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[UsuariosComponent, AdmonUsersComponent, InfoChartsComponent]
})
export class AdminModule { }
