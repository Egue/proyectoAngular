import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { PermisoPeligroRoutingModule } from './permiso-peligro-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    PermisoPeligroRoutingModule,
    ProgressBarModule,
    ButtonModule
  ]
})
export class PermisoPeligroModule { }
