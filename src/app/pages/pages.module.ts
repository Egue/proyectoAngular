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
import { AccountSetthingsComponent } from './account-setthings/account-setthings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PermisosComponent } from './sistemagestion/permisos/permisos.component';
import { RegistroEmpleadosComponent } from './sistemagestion/registro-empleados/registro-empleados.component';
 
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { GeolocalizacionComponent } from './contratos/geolocalizacion/geolocalizacion.component';
import { PeligrosComponent } from './sistemagestion/peligros/peligros.component'; 
import { CalendarModule } from 'primeng/calendar';
import { RolesComponent } from './usuarios/roles/roles.component';

//primeng
import { AccordionModule } from 'primeng/accordion';  
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import { SpRecaudoComponent } from './supergiros/sp-recaudo/sp-recaudo.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { RcControlComponent } from './merkas/rc-control/rc-control.component';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GeneralidadesComponent } from './sistemagestion/generalidades/generalidades.component';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset'; 
import { EmpresaComponent } from './sistemagestion/empresa/empresa.component';
import { GeolocalizarComponent } from './contratos/geolocalizar/geolocalizar.component'; 
import { MessageModule } from 'primeng/message';
import {CardModule} from 'primeng/card'; 

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
    GeolocalizacionComponent,
    PeligrosComponent, 
    SpRecaudoComponent,
    PerfilComponent,
    RcControlComponent,
    GeneralidadesComponent, 
    EmpresaComponent,
    GeolocalizarComponent,  

  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSetthingsComponent,
    PromesasComponent,
    RxjsComponent,
    PermisosComponent,
    RegistroEmpleadosComponent,  
    GeolocalizacionComponent,
    PeligrosComponent, 
    SpRecaudoComponent,
    PerfilComponent,
    RcControlComponent,
    GeneralidadesComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponetsModule,
    ReactiveFormsModule,
    CalendarModule,
    AccordionModule, 
    TableModule,
    ButtonModule,
    PaginatorModule,
    ToolbarModule,
    FileUploadModule,
    AutoCompleteModule,
    TabViewModule,
    FieldsetModule, 
    MessageModule, 
    CardModule
  ]
})
export class PagesModule { }
