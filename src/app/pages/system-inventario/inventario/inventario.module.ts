import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioUpdatedComponent } from './inventario-updated/inventario-updated.component';
import { InventarioArticuloListComponent } from './inventario-articulo-list/inventario-articulo-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {  InputTextModule } from 'primeng/inputtext';
import {  DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InventarioUpdatedComponent,
    InventarioArticuloListComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class InventarioModule { }
