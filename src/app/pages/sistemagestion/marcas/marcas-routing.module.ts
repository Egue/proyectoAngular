import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { MarcasNewComponent } from "./marcas-new/marcas-new.component";



const marcasRoute:Routes = [

    {
        path:'new' , 
        component: MarcasNewComponent , data:{titulo:'Nueva Marca'},
    }
];

@NgModule({
    imports:[RouterModule.forChild(marcasRoute)],
    exports:[RouterModule],
})
export class MarcasRoutingModule{}