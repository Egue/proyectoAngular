import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { PdfPermidoComponent } from "./pdf-permido/pdf-permido.component";

const routepdf:Routes = [
    {
        path:':id/pdf',
        component:PdfPermidoComponent,
        data:{titulo:'PDF permiso de trabajo'}
    }
];

@NgModule({

imports:[RouterModule.forChild(routepdf)],
exports:[RouterModule],

})
export class GeneratePdfRouterModule{}