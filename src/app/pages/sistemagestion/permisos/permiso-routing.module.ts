import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router"; 
import { ListComponent } from "./list/list.component";
import { PermisosComponent } from "./permisos.component";
import { PermisoRoutingResolveService } from "./services/permiso-routing-resolve.service";


const permisoRouter:Routes = [
    {
        path:'', 
        component:ListComponent   , data:{titulo: 'Lista de Permisos'}

    },
    {
        path:':id/permiso',
        component: PermisosComponent,
        resolve: {
            permiso: PermisoRoutingResolveService
        },
        data: {titulo:'Permiso Trabajo'}
    }
     
];

@NgModule({
    imports:[RouterModule.forChild(permisoRouter)],
    exports:[RouterModule],
})
export class PermisoRoutingModule {}