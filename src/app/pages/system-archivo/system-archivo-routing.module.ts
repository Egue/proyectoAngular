import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const archivoRoutes:Routes = [
    {
        path:'contratos',
        loadChildren:() => import('./archivo-contratos/archivo-contratos.module').then(m => m.ArchivoContratosModule)
    }
]
@NgModule({
    imports: [RouterModule.forChild(archivoRoutes)],
    exports: [RouterModule]
})

export class SystemArchivoRoutingModule {}