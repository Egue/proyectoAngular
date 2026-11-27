import {  NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router"; 
import { ListComponent } from "./list/list.component";
import { PermisosComponent } from "./permisos.component";
import { PermisoRoutingResolveService } from "./services/permiso-routing-resolve.service";
import { PermisoObservacionComponent } from "./permiso-observacion/permiso-observacion.component";
import { ObservacionRoutingResolveService } from "./services/observacion-routing-resolve.service";
import { PermisoPreguntasComponent } from "./permiso-preguntas/permiso-preguntas.component"; 


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
    },
    {
        path:':id/preguntas',
        component: PermisoPreguntasComponent,
        resolve:{
            permiso:PermisoRoutingResolveService
        },
        data:{titulo:'Preguntas'}
    },
    {
        path:':id/observacion',
        component: PermisoObservacionComponent,
        resolve: {
            observacion : ObservacionRoutingResolveService
        },
        data: {titulo: 'Observaciones'}
    }
     
];

@NgModule({
    imports:[RouterModule.forChild(permisoRouter)],
    exports:[RouterModule],
})
export class PermisoRoutingModule {}