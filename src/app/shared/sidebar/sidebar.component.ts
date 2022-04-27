import { AuthService } from './../../auth/auth.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public imgUser:string = '';
  public nameUser:string = '';
  menuItems: any[];

  constructor(private sidebarService: SidebarService,
              private authService: AuthService) {
    this.imgUser = authService.usuario?.imagenUrl;
    this.nameUser = authService.usuario?.user;
    this.menuItems = sidebarService.menu; 
   }

  ngOnInit(): void {
  }

}
