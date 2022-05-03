import { AuthService } from './../../auth/auth.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //public imgUser:string | null;
  //public nameUser:string | null;
  public usuario:Usuario;
  menuItems: any[];

  constructor(private sidebarService: SidebarService,
              private authService: AuthService) {
    /*this.imgUser = authService.usuario?.imagenUrl || `https://apps.internetinalambrico.com.co/Files/usuarios/${sessionStorage.getItem('img')}`;
    this.nameUser = authService.usuario?.user || sessionStorage.getItem('user'); */
    this.usuario = authService.usuario;
    this.menuItems = sidebarService.menu; 

   }

  ngOnInit(): void {
  }

}
