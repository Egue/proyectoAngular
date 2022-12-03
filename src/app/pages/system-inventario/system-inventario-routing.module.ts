import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventarioArticuloListComponent } from "./inventario/inventario-articulo-list/inventario-articulo-list.component";

const inventarioRoutes:Routes = [
    {path:'listarticulos', component:InventarioArticuloListComponent ,data:{titulo: 'Lista de articulos'}},


    {path:'ingresos' , loadChildren:() => import('./inventario-cargas/inventario-cargas.module').then(m=>m.InventarioCargasModule)},

     
]
@NgModule({
    imports: [RouterModule.forChild(inventarioRoutes)],
    exports: [RouterModule]
})

export class SystemInventarioRoutingModule {}