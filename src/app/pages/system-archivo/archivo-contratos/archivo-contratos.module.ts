import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoInicioComponent } from './archivo-inicio/archivo-inicio.component';
import { ArchivoContratosRoutingModule } from './archivo-contratos-routing.module';



@NgModule({
  declarations: [
    ArchivoInicioComponent
  ],
  imports: [
    CommonModule,
    ArchivoContratosRoutingModule
  ]
})
export class ArchivoContratosModule { }
