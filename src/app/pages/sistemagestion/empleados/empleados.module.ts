import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [EmpleadosComponent],
  exports:[EmpleadosComponent],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ButtonModule,
    TableModule

  ]
})
export class EmpleadosModule { }
