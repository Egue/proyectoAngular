import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
 /* public imgUrl:string | null;
  public nameUser:string | null;
  public emailUser:string | null;*/
  public usuario:Usuario;

  constructor(private authService:AuthService) { 
    /*this.imgUrl = authService.usuario?.imagenUrl  || `https://apps.internetinalambrico.com.co/Files/usuarios/${sessionStorage.getItem('img')}`;
    this.nameUser = authService.usuario?.user     || sessionStorage.getItem('user');
    this.emailUser = authService.usuario?.email   || sessionStorage.getItem('mail');*/
    this.usuario = authService.usuario;
  }

  logout()
  {
    this.authService.logout();
  }
}
