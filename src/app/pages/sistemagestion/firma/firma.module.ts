import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmaEmpleadoComponent } from './firma-empleado/firma-empleado.component';
import { FirmaRoutingModule } from './firm-routing.module';

import {MessagesModule} from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import { FirmaConfiguracionComponent } from './firma-configuracion/firma-configuracion.component';
import {DropdownModule} from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import {AccordionModule} from 'primeng/accordion';
import {TreeModule} from 'primeng/tree';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FirmaJefesComponent } from './firma-jefes/firma-jefes.component';
@NgModule({
  declarations: [
    FirmaEmpleadoComponent,
    FirmaConfiguracionComponent,
    FirmaJefesComponent
  ],
  imports: [
    FirmaRoutingModule,
    CommonModule,
    MessagesModule, 
    InputTextareaModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    AccordionModule,
    TreeModule
  ]
})
export class FirmaModule { }
