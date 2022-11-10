import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { VehiculoIdRoutingResolveService } from "./services/vehiculo-id-routing-resolve.service";
import { VehiculoRoutingResolveService } from "./services/vehiculo-routing-resolve.service";
import { VehiculoNewComponent } from "./vehiculo-new/vehiculo-new.component";
import { VehiculosAdjuntosComponent } from "./vehiculos-adjuntos/vehiculos-adjuntos.component";



const vehiculoRoute:Routes = [
    {
        path:'list', 
        component:ListComponent   , data:{titulo: 'Lista de Vehiculos'}
    },
    {
        path:'new',
        component:VehiculoNewComponent , data:{titulo:'Nuevo Vehiculo'}
    },
    {
        path:':id/edit',
        component:VehiculoNewComponent , 
        resolve: {
            vehiculo: VehiculoRoutingResolveService,
        },
        data:{titulo: 'Editar Vehiculo'},
    },
    {
        path:':id/adjuntar',
        component:VehiculosAdjuntosComponent,
        resolve: {
            vehiculo_id:VehiculoIdRoutingResolveService,
        },
        data:{titulo:'Adjuntar documentos'}
    }
];

@NgModule({
    imports:[RouterModule.forChild(vehiculoRoute)],
    exports:[RouterModule],
})
export class VehiculoRoutingModule {}