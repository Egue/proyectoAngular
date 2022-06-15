import { AuthService } from './../../auth/auth.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ISidebar } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit  {
  public usuario:Usuario;

  constructor(public sidebarService: SidebarService,
              private authService: AuthService) {
    
    this.usuario = authService.usuario;
   
    
   }
  ngOnInit(): void {
    
  }
  

}
