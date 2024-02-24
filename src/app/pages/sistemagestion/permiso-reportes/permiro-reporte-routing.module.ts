import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermisoGraficosComponent } from "./permiso-graficos/permiso-graficos.component";

const reportes:Routes = [
    {
        path:'' ,
        component:PermisoGraficosComponent,
        data:{titulo:'Reportes'}
    }
]
@NgModule({
    imports:[RouterModule.forChild(reportes)],
    exports:[RouterModule]
}) export class PermisoReportesRoutingModule {}