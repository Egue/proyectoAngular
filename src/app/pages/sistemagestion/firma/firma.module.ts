import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmaEmpleadoComponent } from './firma-empleado/firma-empleado.component';
import { FirmaRoutingModule } from './firm-routing.module';

import {MessagesModule} from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  declarations: [
    FirmaEmpleadoComponent
  ],
  imports: [
    FirmaRoutingModule,
    CommonModule,
    MessagesModule,
    FormsModule,
    InputTextareaModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule
  ]
})
export class FirmaModule { }
