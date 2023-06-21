import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [EmpleadosComponent],
  exports:[EmpleadosComponent],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ButtonModule,
    TableModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule

  ]
})
export class EmpleadosModule { }
