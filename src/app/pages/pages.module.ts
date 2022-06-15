import { ComponetsModule } from './../components/componets.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 

import { SharedModule } from './../shared/shared.module';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonaComponent } from '../components/dona/dona.component';
import { AccountSetthingsComponent } from './account-setthings/account-setthings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PermisosComponent } from './sistemagestion/permisos/permisos.component';
import { RegistroEmpleadosComponent } from './sistemagestion/registro-empleados/registro-empleados.component';
import { EmpleadosComponent } from './sistemagestion/empleados/empleados.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { GeolocalizacionComponent } from './contratos/geolocalizacion/geolocalizacion.component';






@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSetthingsComponent,
    PromesasComponent,
    RxjsComponent,
    PermisosComponent,
    RegistroEmpleadosComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    GeolocalizacionComponent,
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSetthingsComponent,
    ProgressComponent,
    RxjsComponent,
    PermisosComponent,
    RegistroEmpleadosComponent,
    UsuariosComponent,
    CrearUsuariosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponetsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
