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

@NgModule({
    imports:[
        VehiculoRoutingModule , 
        TableModule , 
        ButtonModule , 
        FormsModule, 
        CommonModule , 
        ReactiveFormsModule,
        AutoCompleteModule,
        DropdownModule],
    declarations: [ListComponent, VehiculoNewComponent],
    exports:[ListComponent , VehiculoNewComponent]
})
export class VehiculoModule{}