import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moto-svg',
  templateUrl: './svg.component.svg',
  styles: [
  ]
})
export class MotoSvgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  seleccion(item:string)
  {
    console.log(item);
  }

}
