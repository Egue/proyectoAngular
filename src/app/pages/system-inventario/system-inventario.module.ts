import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemArchivoRoutingModule } from '../system-archivo/system-archivo-routing.module';  
import { SystemInventarioRoutingModule } from './system-inventario-routing.module'; 
import { InventarioModule } from './inventario/inventario.module';



@NgModule({
  declarations: [  
  ],
  imports: [
    CommonModule,
    SystemInventarioRoutingModule, 
    InventarioModule
  ]
})
export class SystemInventarioModule { }
