import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementosProteccionRoutingModule } from './elementos-proteccion-routing.module';
import { ElementosProteccionComponent } from './elementos-proteccion.component';
import { ComponetsModule } from "../../../components/componets.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {SlideMenuModule} from 'primeng/slidemenu';

@NgModule({
    declarations: [
        ElementosProteccionComponent
    ],
    imports: [
        ElementosProteccionRoutingModule,
        CommonModule,
        ComponetsModule,
        ReactiveFormsModule,
        FormsModule,
        AccordionModule,
        TableModule,
        ButtonModule,
        ToastModule, 
        SlideMenuModule, 
    ]
})
export class ElementosProteccionModule { }
