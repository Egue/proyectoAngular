import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchivoInicioComponent } from "./archivo-inicio/archivo-inicio.component";

const contratoRoutes:Routes = [
    {
        path:'search',
        component: ArchivoInicioComponent,
        data:{titulo: 'Buscar Contratos'}
    }
]
@NgModule({
    imports: [RouterModule.forChild(contratoRoutes)],
    exports: [RouterModule]
})

export class ArchivoContratosRoutingModule {}