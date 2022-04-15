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
      ]

    }
  ];

  constructor() { }
}
