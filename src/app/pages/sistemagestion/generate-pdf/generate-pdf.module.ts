import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfPermidoComponent } from './pdf-permido/pdf-permido.component';
import { GeneratePdfRouterModule } from './generate-routing.module';
import { ButtonModule } from 'primeng/button'; 
import {  ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    PdfPermidoComponent
  ],
  imports: [
    CommonModule,
    GeneratePdfRouterModule,
    ButtonModule, 
    ToastModule
  ]
})
export class GeneratePdfModule { }
