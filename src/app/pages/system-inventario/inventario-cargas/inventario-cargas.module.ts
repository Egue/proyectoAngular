import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvCargasListComponent } from './inv-cargas-list/inv-cargas-list.component';
import { InventarioCargasRoutingModule } from './inventario-cargas-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { InvCargasUpdatedComponent } from './inv-cargas-updated/inv-cargas-updated.component';
import {   DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvCargasDetalleComponent } from './inv-cargas-detalle/inv-cargas-detalle.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    InvCargasListComponent,
    InvCargasUpdatedComponent,
    InvCargasDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventarioCargasRoutingModule,
    CalendarModule,
    ToolbarModule,
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    AutoCompleteModule,
    InputNumberModule,
    
  ]
})
export class InventarioCargasModule { }
