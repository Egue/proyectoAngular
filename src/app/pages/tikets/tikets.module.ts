import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiketsListComponent } from './tikets-list/tikets-list.component';
import { TicketsRoutingModule } from './tikets-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';

import {InputTextareaModule} from 'primeng/inputtextarea';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketSeguimientoComponent } from './ticket-seguimiento/ticket-seguimiento.component'; 
import { NgxSpeechRecognitionModule } from 'ngx-speech-recognition';
@NgModule({
  declarations: [
    TiketsListComponent,
    TicketDetailComponent,
    TicketSeguimientoComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    FormsModule, 
  ]
})
export class TiketsModule { }
