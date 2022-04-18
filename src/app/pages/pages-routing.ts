import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSetthingsComponent } from './account-setthings/account-setthings.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PermisosComponent } from './sistemagestion/permisos/permisos.component';
import { RegistroEmpleadosComponent } from './sistemagestion/registro-empleados/registro-empleados.component';


const routes:Routes = [
    {path:'dashboard' , component:PagesComponent,

    children: [      
    {path:'' , component: DashboardComponent , data:{titulo:'Dashboard'}},
    {path:'progress' , component: ProgressComponent , data:{titulo:'Progress'}},
    {path:'grafica1' , component: Grafica1Component , data:{titulo:'Grafica # 1'}},
    {path:'settings' , component: AccountSetthingsComponent, data:{titulo:'Ajustes de cuenta'}},
    {path:'promesa' , component:  PromesasComponent , data:{titulo:'Promesas'}},
    {path:'rxjs'    , component: RxjsComponent , data:{titulo:'Rxjs'}},
    {path:'permisoTrabajo'    , component: PermisosComponent , data:{titulo:'Permisos de Trabaja'}},
    {path:'registroPersona'    , component: RegistroEmpleadosComponent , data:{titulo:'Registro Personal'}},


    ]
  
  },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModules {}