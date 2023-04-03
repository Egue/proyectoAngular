import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirmaEmpleadoComponent } from "./firma-empleado/firma-empleado.component";
const firma:Routes = [
    {path:':id/empleado', component:FirmaEmpleadoComponent, data:{titulo:'Firmar permiso'}}
]

@NgModule({
    imports:[RouterModule.forChild(firma)],
    exports:[RouterModule]
}) export class FirmaRoutingModule {}