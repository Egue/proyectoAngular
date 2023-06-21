import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadComponent } from './preload.component';



@NgModule({
  declarations: [
    PreloadComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PreloadComponent
  ]
})
export class PreloadModule { }
