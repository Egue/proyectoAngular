import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../models/sidebar.model';
import { SidebarService } from '../services/sidebar.service';
declare function custonInitFunction():any; 
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService , 
                private sidebarService: SidebarService) { }

  ngOnInit(): void {
    custonInitFunction(); 
    this.sidebarService.loadingMenu();
  }
 


}
