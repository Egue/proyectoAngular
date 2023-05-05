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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {KnobModule} from 'primeng/knob';

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
    CardModule,
    ToastModule,
    ToolbarModule,
    RadioButtonModule,
    KnobModule,
  ]
})
export class PermisosModule { }
