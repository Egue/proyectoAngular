import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";  
import { AddComponent } from "./add/add.component";
import { PermisoVehiculoRoutingResolveService } from "./services/permiso-vehiculo-routing-resolver.service";


const pvehiculo:Routes = [
     
    
    {
        path:':id/add',
        component:AddComponent , 
        resolve: {
            permiso: PermisoVehiculoRoutingResolveService,
        },
        data:{titulo: 'Inspección Vehiculos'},
    },
    
];

@NgModule({
    imports:[RouterModule.forChild(pvehiculo)],
    exports:[RouterModule],
})
export class PermisoVehiculoRoutingModule {}