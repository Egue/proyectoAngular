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


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent,
    UploadsDocumentoComponent,
    TableDocumentosComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent,
    UploadsDocumentoComponent,
    TableDocumentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    TableModule,
    FileUploadModule,
    CalendarModule,
    InputTextModule
  ]
})
export class ComponetsModule { }
