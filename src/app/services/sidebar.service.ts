import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title : 'Dashboard',
      icono : 'mdi mdi-gauge',
      submenu:[
        {title:'main' , url:'/'},
        {title:'ProgressBard' , url:'progress'},
        {title:'Graficas' , url:'grafica1'},
        {title:'Promesas' , url:'promesa'},
        {title:'Rxjs' , url:'rxjs'},
      ]

    },
    {
      title:'Sistema Gestión',
      icono:'mdi mdi-bullseye',
      submenu:[
        {title:'Permiso Trabajo' , url:'permisoTrabajo'},
        {title:'Registro Personal' , url:'registroPersona'},
        
      ]
    },
    {
      title:'Supergiros',
      icono:'mdi mdi-bullseye',
      submenu:[
        {title:'Permiso Trabajo' , url:'permisoTrabajo'},
        {title:'aprobar' , url:'aprobarPermisos'},
      ]
    }
  ];

  constructor() { }
}
