import { Component} from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  
   labels1:string[]= ['FTHH', 'EOC', 'Inalambrico' ];
   data1:number[] = [350 , 450 , 100];

   labels2:string[]= ['Activo', 'Cortado', 'Retirado' ];
   data2:number[] = [1200 , 400 , 950];

   labels3:string[]= ['Supergiros', 'TuCompra', 'Efectivo' ];
   data3:number[] = [87 , 120, 1200];

   labels4:string[]= ['Laura', 'Jeissson', 'Rocio' ];
   data4:number[] = [20 , 18 , 5];



 
}
 

