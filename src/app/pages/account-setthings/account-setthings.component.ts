import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setthings',
  templateUrl: './account-setthings.component.html',
  styles: [
  ]
})
export class AccountSetthingsComponent implements OnInit {

  

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme : string)
  {
    this.settingsService.changeTheme(theme);
  }

  

}
