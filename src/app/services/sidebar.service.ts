import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import {map} from 'rxjs/operators';  
const base_url = environment.base_url;

export interface ISubmenu {
  title: string,
  url: string
}

export interface IMenu {
  title:string,
  icono:string,
  submenu:ISubmenu[]
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:IMenu[] = [];
  
  loadingMenu()
  { 
    this.menu = JSON.parse(localStorage.getItem('abc') || '{}');
  }


 /* menu: any[] = [
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
    },
    {
      title:'Contratos',
      icono:'mdi mdi-folder-multiple',
      submenu:[
        {title:'Geolocalización' , url:'geolocalizacion'},
      ]
    },
    {
      title:'Configuracion',
      icono:'icon-wrench',
      submenu:[
        {title:'Usuarios' , url: 'usuarios'},
        {title:'Crear Usuario'  , url: 'crearuser'}
      ]
    }
  ];*/


}
