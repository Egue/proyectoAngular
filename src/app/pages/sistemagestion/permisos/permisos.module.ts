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
import { DialogModule } from 'primeng/dialog';
import { PermisoObservacionComponent } from './permiso-observacion/permiso-observacion.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {ImageModule} from 'primeng/image';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PermisoProcedimientoComponent } from './permiso-procedimiento/permiso-procedimiento.component';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
@NgModule({
  declarations: [
    ListComponent,
    PermisoObservacionComponent,
    PreguntasComponent,
    PermisoProcedimientoComponent
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
    DialogModule,
    InputTextareaModule,
    FileUploadModule,
    ImageModule,
    InputTextModule,
    ConfirmDialogModule,
    TagModule,
    ChipModule

  ]
})
export class PermisosModule { }
