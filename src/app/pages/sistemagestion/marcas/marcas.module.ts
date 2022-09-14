import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasNewComponent } from './marcas-new/marcas-new.component';
import { MarcasRoutingModule } from './marcas-routing.module';



@NgModule({
  declarations: [
    MarcasNewComponent
  ],
  imports: [
    MarcasRoutingModule
  ],
  exports:[MarcasNewComponent]
})
export class MarcasModule { }
