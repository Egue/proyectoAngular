import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component'; 


import { NgChartsModule } from 'ng2-charts';
import { SgControlesComponent } from './sg-controles/sg-controles.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class ComponetsModule { }
