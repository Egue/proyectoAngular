import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router"; 
import { EmpleadosComponent } from "./empleados.component";
import { EmpleadosRoutingResolveService } from "./services/empleadosRoutingResolve.service";


const empleados:Routes = [
     
    
    {
        path:':id/add',
        component:EmpleadosComponent , 
        resolve: {
            permiso: EmpleadosRoutingResolveService,
        },
        data:{titulo: 'Integrantes'},
    },
    
];

@NgModule({
    imports:[RouterModule.forChild(empleados)],
    exports:[RouterModule],
})
export class EmpleadosRoutingModule {}