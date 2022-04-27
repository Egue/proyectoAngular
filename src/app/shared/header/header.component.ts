import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public imgUrl:string = '';
  public nameUser:string = '';
  public emailUser:string = '';

  constructor(private authService:AuthService) { 
    this.imgUrl = authService.usuario?.imagenUrl;
    this.nameUser = authService.usuario?.user;
    this.emailUser = authService.usuario?.email;
  }

  logout()
  {
    this.authService.logout();
  }
}
