import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent  implements OnInit{

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  
  @Input('valor') progress:number = 50;
  @Input() btnClass:string = 'btn-primary';
 
  @Output('valor') valorSalida:EventEmitter<number> = new EventEmitter();

  cambiarvalor(valor:number)
  {
    if(this.progress >= 100 && valor >= 0)
    {
      this.valorSalida.emit(100);
      return this.progress = 100;
    }
    if(this.progress <= 0 && valor < 0)
    {
      this.valorSalida.emit(0);
      return this.progress = 0;
    }
    
    return this.progress = this.progress + valor , this.valorSalida.emit(this.progress);
    
  }

  onChange(valor:any)
  { 
    if(valor >= 100)
    {
      this.progress = 100;
    }else if(valor <=0)
    {
      this.progress = 0;
    }
    else{
      this.progress = valor;
    }

    this.valorSalida.emit(this.progress);
  }

}
