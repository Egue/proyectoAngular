import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoGraficosComponent } from './permiso-graficos/permiso-graficos.component';
import { PermisoReportesRoutingModule } from './permiro-reporte-routing.module';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PermisoGraficosComponent
  ],
  imports: [
    CommonModule,
    PermisoReportesRoutingModule,
    OrganizationChartModule,
    CalendarModule,
    FormsModule
  ]
})
export class PermisoReportesModule { }
