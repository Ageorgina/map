import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    EstadisticasComponent
  ]
})
export class InfluencerModule { }
