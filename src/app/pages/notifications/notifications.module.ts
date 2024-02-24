import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListnotificationsComponent } from './listnotifications/listnotifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';



@NgModule({
  declarations: [
    
    ListnotificationsComponent
  ],
  imports: [
    NotificationsRoutingModule,
    CommonModule
  ]
})
export class NotificationsModule { }
