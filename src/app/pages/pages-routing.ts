import { AuthGuard } from './../guards/auth.guard';
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
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { GeolocalizacionComponent } from './contratos/geolocalizacion/geolocalizacion.component';
import { PeligrosComponent } from './sistemagestion/peligros/peligros.component';
import { RolesComponent } from './usuarios/roles/roles.component';
import { SpRecaudoComponent } from './supergiros/sp-recaudo/sp-recaudo.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { RcControlComponent } from './merkas/rc-control/rc-control.component';
import { GeneralidadesComponent } from './sistemagestion/generalidades/generalidades.component';


const routes:Routes = [
    {path:'dashboard' , component:PagesComponent,
    canActivate:[AuthGuard],
    children: [      
    {path:'' , component: DashboardComponent , data:{titulo:'Dashboard'}},
    {path:'progress' , component: ProgressComponent , data:{titulo:'Progress'}},
    {path:'grafica1' , component: Grafica1Component , data:{titulo:'Grafica # 1'}},

    {path:'settings' , component: AccountSetthingsComponent, data:{titulo:'Ajustes de cuenta'}},
    {path:'myperfil'  , component: PerfilComponent, data:{titulo:'Perfil de usuario'} },
    
    {path:'promesa' , component:  PromesasComponent , data:{titulo:'Promesas'}},
    {path:'rxjs'    , component: RxjsComponent , data:{titulo:'Rxjs'}},

    {path:'permisoTrabajo'    , component: PermisosComponent , data:{titulo:'Permisos de Trabaja'}},
    {path:'registroPersona'    , component: RegistroEmpleadosComponent , data:{titulo:'Registro Personal'}},
    {path: 'peligros' , component: PeligrosComponent , data:{titulo:'Peligros y Clasificación'}},
    {path:'generalidades' , component:GeneralidadesComponent , data:{titulo:'Generalidades del permiso de trabajo'}},

    {path:'usuarios'    , component: UsuariosComponent , data:{titulo:'Usuarios'}},
    {path:'crearuser'    , component: CrearUsuariosComponent , data:{titulo:'Registro de Usuarios'}},
    {path: 'roles' , component:RolesComponent , data:{titulo:'Vistas y roles de usuarios'}},

    {path: 'geolocalizacion' , component: GeolocalizacionComponent , data:{titulo:'Geolocalizacion'}},

    {path: 'sprecaudo' , component: SpRecaudoComponent , data:{titulo:'Recaudo Supergiros'}},

    {path: 'merkasrc' , component:RcControlComponent , data:{titulo: 'Recibos Caja -> Merkas'}},
    
    

    


    ]
  
  },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModules {}