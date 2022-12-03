import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvCargasListComponent } from "./inv-cargas-list/inv-cargas-list.component";
import { InvCargasUpdatedComponent } from "./inv-cargas-updated/inv-cargas-updated.component";
import { InvCargasRoutingResolveService } from "./services/inv-cargas-routing-resolve.service";

const routescargas:Routes= [
    {path: 'list' , component:InvCargasListComponent , data:{titulo:'Lista Ingresos'}} , 
    {path: 'new' , component:InvCargasUpdatedComponent , data:{titulo: 'Nuevo ingreso'}},
    {path: ':id/edit' ,
        component:InvCargasUpdatedComponent,
        resolve: {
            carga: InvCargasRoutingResolveService,
        },
        data: {titulo:'Editar cargas'}
    }
]

@NgModule({
    imports:[RouterModule.forChild(routescargas)],
    exports:[RouterModule]
})export class InventarioCargasRoutingModule{}