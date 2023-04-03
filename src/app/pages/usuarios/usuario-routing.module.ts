import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { CrearUsuariosComponent } from "./crear-usuarios/crear-usuarios.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { RolesComponent } from "./roles/roles.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const user:Routes = [

    {
        path:'list',
        component:UsuariosComponent,
        data:{titulo:'Lista usuarios'}
    },

    {
        path:'crearuser',
        component:CrearUsuariosComponent,
        data:{titulo:'Registro de Usuarios'},
    },
    {
        path:'roles',
        component:RolesComponent , 
        data:{titulo:'Vistas y roles de usuarios'}
    },
    {
        path:':id/datos',
        component:DatosPersonalesComponent,
        data:{titulo:'Datos Personales'}
    }
];

@NgModule({
    imports:[RouterModule.forChild(user)],
    exports:[RouterModule]

})export class UsuariosRoutingModule{}