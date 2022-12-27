import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemArchivoRoutingModule } from '../system-archivo/system-archivo-routing.module';  
import { SystemInventarioRoutingModule } from './system-inventario-routing.module'; 
import { InventarioModule } from './inventario/inventario.module';
import { ListBodegaComponent } from './inventarioBodega/list-bodega/list-bodega.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [  
  
    ListBodegaComponent
  ],
  imports: [
    CommonModule,
    SystemInventarioRoutingModule, 
    InventarioModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    CalendarModule,
    FormsModule,
    ButtonModule
  ]
})
export class SystemInventarioModule { }
