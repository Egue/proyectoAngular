import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component'; 


import { NgChartsModule } from 'ng2-charts';
import { SgControlesComponent } from './sg-controles/sg-controles.component';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';
import { AddBuenoMaloComponent } from './add-bueno-malo/add-bueno-malo.component';
import { MotoSvgComponent } from './moto-svg/moto-svg.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    SgControlesComponent,
    AddVehiculoComponent,
    AddBuenoMaloComponent,
    MotoSvgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class ComponetsModule { }
