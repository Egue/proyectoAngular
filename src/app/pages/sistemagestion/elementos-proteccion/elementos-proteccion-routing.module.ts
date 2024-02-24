import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ElementosProteccionComponent } from "./elementos-proteccion.component";
import { ProteccionRoutingResolveService } from "./service/proteccion-routing-resolve.service";


const elementosRoute:Routes = [
    {
        path:':id/add',
        component:ElementosProteccionComponent, 
        resolve: {
            permiso: ProteccionRoutingResolveService,
        },
        data:{titulo: 'Preoperacional'}

    }
];

@NgModule({
    imports:[RouterModule.forChild(elementosRoute)],
    exports:[RouterModule]
})
export class ElementosProteccionRoutingModule {}