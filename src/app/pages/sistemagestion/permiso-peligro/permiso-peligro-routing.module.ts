import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";  
import { AddComponent } from "./add/add.component";
import { PermisoPeligroRoutingIdResolveService } from "./services/permiso-peligro-routing-id-resolve.service";


const peligro:Routes = [
     
    
    {
        path:':id/add',
        component:AddComponent , 
        resolve: {
            permiso: PermisoPeligroRoutingIdResolveService,
        },
        data:{titulo: 'Peligros'},
    },
    
];

@NgModule({
    imports:[RouterModule.forChild(peligro)],
    exports:[RouterModule],
})
export class PermisoPeligroRoutingModule {}