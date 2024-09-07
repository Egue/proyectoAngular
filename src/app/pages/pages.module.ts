import { ComponetsModule } from './../components/componets.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

import { SharedModule } from './../shared/shared.module';
import { PagesComponent } from './pages.component'; 
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { AccountSetthingsComponent } from './account-setthings/account-setthings.component'; 
import { PermisosComponent } from './sistemagestion/permisos/permisos.component';
import { RegistroEmpleadosComponent } from './sistemagestion/registro-empleados/registro-empleados.component';
  
import { PeligrosComponent } from './sistemagestion/peligros/peligros.component'; 
import { CalendarModule } from 'primeng/calendar'; 

//primeng
import { AccordionModule } from 'primeng/accordion';  
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'; 
import { PerfilComponent } from './usuarios/perfil/perfil.component'; 
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GeneralidadesComponent } from './sistemagestion/generalidades/generalidades.component';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset'; 
import { EmpresaComponent } from './sistemagestion/empresa/empresa.component'; 
import { MessageModule } from 'primeng/message';
import {CardModule} from 'primeng/card'; 
import { ToastModule } from 'primeng/toast'; 

@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent,
    AccountSetthingsComponent, 
    PermisosComponent,
    RegistroEmpleadosComponent,   
    PeligrosComponent,  
    PerfilComponent, 
    GeneralidadesComponent, 
    EmpresaComponent, 

  ],
  exports:[
    DashboardComponent,  
    PagesComponent,
    AccountSetthingsComponent,  
    PermisosComponent,
    RegistroEmpleadosComponent,   
    PeligrosComponent,  
    PerfilComponent, 
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
    CardModule,
    ToastModule
  ]
})
export class PagesModule { }
