import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-moto-svg',
  templateUrl: './moto-svg.component.html',
  styles: [
  ]
})
export class MotoSvgComponent implements OnInit {

 @Input() public lugarTrabajo:string = "";
  public interno?:boolean;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
   if(this.lugarTrabajo==='Interno')
   {
    this.interno = true;
   }else{
    this.interno = false;
   }
  }

  open(tipo:string):void{
    console.log(tipo);
  }
  



}
