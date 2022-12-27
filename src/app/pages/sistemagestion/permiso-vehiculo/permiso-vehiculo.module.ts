import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component'; 
import { PermisoVehiculoRoutingModule } from './permiso-vehiculo-routing.module';

import { ComponetsModule } from '../../../components/componets.module';

@NgModule({
  declarations: [
    AddComponent,
  ],
  imports: [
    CommonModule,
    PermisoVehiculoRoutingModule,
    ComponetsModule
  ]
})
export class PermisoVehiculoModule { }
