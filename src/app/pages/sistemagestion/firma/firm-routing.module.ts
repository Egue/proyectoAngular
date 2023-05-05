import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirmaConfiguracionComponent } from "./firma-configuracion/firma-configuracion.component";
import { FirmaEmpleadoComponent } from "./firma-empleado/firma-empleado.component";
import { FirmaJefesComponent } from "./firma-jefes/firma-jefes.component";
import { FirmasIdRoutingResolveService } from "./services/firmas-id-routing-resolve.service";
const firma:Routes = [
    {path:':id/empleado', component:FirmaEmpleadoComponent, data:{titulo:'Firmar permiso'}},
    {path:'configuracion' , component:FirmaConfiguracionComponent , data:{titulo:'Configurar firmas de permiso'}},
    {path:':id/supervisor' , component: FirmaJefesComponent , resolve:{id: FirmasIdRoutingResolveService} , data:{titulo:'Firmas supervisor'}}
]

@NgModule({
    imports:[RouterModule.forChild(firma)],
    exports:[RouterModule]
}) export class FirmaRoutingModule {}