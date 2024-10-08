import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ListComponent } from "./list/list.component";
import { VehiculoRoutingModule } from "./vehiculo-routing.module";
import { VehiculoNewComponent } from './vehiculo-new/vehiculo-new.component'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AutoCompleteModule } from "primeng/autocomplete";
import { DropdownModule } from "primeng/dropdown";
import { VehiculosAdjuntosComponent } from './vehiculos-adjuntos/vehiculos-adjuntos.component';
import { AccordionModule } from "primeng/accordion";
import { ProgressBarModule } from "primeng/progressbar";
import { ComponetsModule } from "src/app/components/componets.module";

import {ToolbarModule} from 'primeng/toolbar';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import { ReportexdiaComponent } from './reportexdia/reportexdia.component';

@NgModule({
    imports:[
        VehiculoRoutingModule , 
        TableModule , 
        ButtonModule , 
        FormsModule, 
        CommonModule , 
        ReactiveFormsModule,
        AutoCompleteModule,
        DropdownModule,
        AccordionModule,
        ProgressBarModule,
        ComponetsModule    ,
        ToolbarModule,
        ChartModule,
        CalendarModule
    ],
    declarations: [ListComponent, VehiculoNewComponent, VehiculosAdjuntosComponent, ReportexdiaComponent],
    exports:[ListComponent , VehiculoNewComponent]
})
export class VehiculoModule{}