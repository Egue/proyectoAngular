import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import {DropdownModule} from 'primeng/dropdown';

import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUsuariosComponent,
    RolesComponent,
    DatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    ButtonModule,
    AccordionModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    ToastModule

  ]
})
export class UsuariosModule { }
