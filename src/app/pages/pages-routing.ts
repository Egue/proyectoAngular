import { AuthGuard } from './../guards/auth.guard'; 
import { AccountSetthingsComponent } from './account-setthings/account-setthings.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router'; 
import { PeligrosComponent } from './sistemagestion/peligros/peligros.component'; 
import { PerfilComponent } from './usuarios/perfil/perfil.component'; 
import { GeneralidadesComponent } from './sistemagestion/generalidades/generalidades.component'; 
import { EmpresaComponent } from './sistemagestion/empresa/empresa.component'; 


const routes:Routes = [
    {path:'dashboard' , component:PagesComponent,
    canActivate:[AuthGuard],
    children: [      
    {path:'' , component: DashboardComponent , data:{titulo:'Dashboard'}}, 

    {path:'settings' , component: AccountSetthingsComponent, data:{titulo:'Ajustes de cuenta'}},
    {path:'myperfil'  , component: PerfilComponent, data:{titulo:'Perfil de usuario'} },
     

    {path:'permisoTrabajo'    , loadChildren:()=>import('./sistemagestion/permisos/permisos.module').then(m=>m.PermisosModule) }, 
    {path: 'peligros' , component: PeligrosComponent , data:{titulo:'Peligros y Clasificación'}},
    {path:'generalidades' , component:GeneralidadesComponent , data:{titulo:'Generalidades del permiso de trabajo'}},
    {path: 'elementos-epp' , loadChildren:() =>import('./sistemagestion/elementos-proteccion/elementos-proteccion.module').then(m=>m.ElementosProteccionModule),},
    {path: 'config-empresa' , component:EmpresaComponent , data:{titulo:'Configuración empresa'}},
    {path: 'vehiculo' , loadChildren: () => import('./sistemagestion/vehiculos/vehiculo.module').then(m => m.VehiculoModule),},
    {path: 'marcas' , loadChildren: () => import('./sistemagestion/marcas/marcas.module').then(m => m.MarcasModule),},
    {path:'integrantes' , loadChildren:()=>import('./sistemagestion/empleados/empleados.module').then(m=>m.EmpleadosModule)},
    {path:'permisoPeligros', loadChildren:() =>import('./sistemagestion/permiso-peligro/permiso-peligro.module').then(m=>m.PermisoPeligroModule)},
    {path:'permisoInspeccion' , loadChildren:()=>import('./sistemagestion/permiso-vehiculo/permiso-vehiculo.module').then(m=>m.PermisoVehiculoModule)},
    {path:'generate-pdf' , loadChildren:()=>import('./sistemagestion/generate-pdf/generate-pdf.module').then(m=>m.GeneratePdfModule)},
    {path:'firmas' , loadChildren:()=>import('./sistemagestion/firma/firma.module').then(m=>m.FirmaModule)},
    {path:'permisoReportes' , loadChildren:()=>import('./sistemagestion/permiso-reportes/permiso-reportes.module').then(m=>m.PermisoReportesModule)},

    {path:'usuarios'    , loadChildren:() => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},   
    {path: 'notifications' , loadChildren:() => import('./notifications/notifications.module').then(m => m.NotificationsModule)},
    
     

    ]
  
  },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModules {}