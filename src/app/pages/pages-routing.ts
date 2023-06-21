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
import { EmpresaComponent } from './sistemagestion/empresa/empresa.component';
import { GeolocalizarComponent } from './contratos/geolocalizar/geolocalizar.component'; 


const routes:Routes = [
    {path:'dashboard' , component:PagesComponent,
    canActivate:[AuthGuard],
    children: [      
    {path:'' , component: DashboardComponent , data:{titulo:'Dashboard'}},
    //{path:'progress' , component: ProgressComponent , data:{titulo:'Progress'}},
    //{path:'grafica1' , component: Grafica1Component , data:{titulo:'Grafica # 1'}},

    {path:'settings' , component: AccountSetthingsComponent, data:{titulo:'Ajustes de cuenta'}},
    {path:'myperfil'  , component: PerfilComponent, data:{titulo:'Perfil de usuario'} },
    
   // {path:'promesa' , component:  PromesasComponent , data:{titulo:'Promesas'}},
    //{path:'rxjs'    , component: RxjsComponent , data:{titulo:'Rxjs'}},

    {path:'permisoTrabajo'    , loadChildren:()=>import('./sistemagestion/permisos/permisos.module').then(m=>m.PermisosModule) },
    //{path:'registroPersona'    , component: RegistroEmpleadosComponent , data:{titulo:'Registro Personal'}},
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
    {path:'usuarios'    , loadChildren:() => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},     

    {path: 'geolocalizacion' , component: GeolocalizacionComponent , data:{titulo:'Geolocalizacion'}},
    {path: 'geolocalizar' , component: GeolocalizarComponent , data:{titulo: 'Geolocalizar contratos'}},

    {path: 'sprecaudo' , component: SpRecaudoComponent , data:{titulo:'Recaudo Supergiros'}},

    {path: 'merkasrc' , component:RcControlComponent , data:{titulo: 'Recibos Caja -> Merkas'}},
    
    //system de archivo

    {path:'Archivo' , loadChildren:() => import('./system-archivo/system-archivo.module').then(m => m.SystemArchivoModule)},

    
      //system de inventario
      {path:'inventario' , loadChildren:()=>import('./system-inventario/system-inventario.module').then(m=>m.SystemInventarioModule)},


      //generate odf

      //ticket
      {path:'tickets' , loadChildren:()=>import('./tikets/tikets.module').then(m=>m.TiketsModule)},

    ]
  
  },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModules {}