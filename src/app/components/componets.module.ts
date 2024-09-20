import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component'; 


import { NgChartsModule } from 'ng2-charts';
import { SgControlesComponent } from './sg-controles/sg-controles.component';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';
import { AddBuenoMaloComponent } from './add-bueno-malo/add-bueno-malo.component';
import { MotoSvgComponent } from './moto-svg/moto-svg.component';
import { UploadsDocumentoComponent } from './uploads-documento/uploads-documento.component';
import { TableDocumentosComponent } from './table-documentos/table-documentos.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule} from 'primeng/dialog';
import {   AutoCompleteModule } from 'primeng/autocomplete';
import {SelectButtonModule} from 'primeng/selectbutton';

import {InputNumberModule} from 'primeng/inputnumber';
import {SpeedDialModule} from 'primeng/speeddial';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {ButtonModule} from 'primeng/button';
import {  RouterModule } from '@angular/router';
import { DrawComponent } from './draw/draw.component';  
import { DropdownModule } from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import { VehiculoGeneralidadComponent } from './vehiculo-generalidad/vehiculo-generalidad.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent,
    UploadsDocumentoComponent,
    TableDocumentosComponent,
    DrawComponent,
    VehiculoGeneralidadComponent,  
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent,
    UploadsDocumentoComponent,
    TableDocumentosComponent, 
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    TableModule,
    FileUploadModule,
    CalendarModule,
    InputTextModule, 
    DialogModule,
    AutoCompleteModule,
    SelectButtonModule,
    ButtonModule,
    RouterModule,
    DropdownModule,
    InputNumberModule,
    TabViewModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class ComponetsModule { }
