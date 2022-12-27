import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PermisoRoutingModule } from './permiso-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    CardModule
  ]
})
export class PermisosModule { }
