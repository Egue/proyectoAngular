import { Component, OnInit } from '@angular/core';
import { MerkasService } from '../../../services/merkas.service';
import {DatePipe} from '@angular/common';

import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-rc-control',
  templateUrl: './rc-control.component.html',
  styles: [
  ]
})
export class RcControlComponent implements OnInit {

  public rangeDates:Date[]  = [];
  
  public pipe:DatePipe = new DatePipe('en-US');

  public cargandoReporte:boolean = false;

  public listRc:any[] = [];

  public modalCargando:boolean = true;

  constructor(private merkasservice:MerkasService) { }

  ngOnInit(): void {

  }

  getListBetween()
  { 
    const range = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyyMMdd') ,
      valor2: this.pipe.transform(this.rangeDates[1] , 'yyyyMMdd')
    };

    this.merkasservice.getRecibosCaja(range)
                        .subscribe((resp:any)=> {
                          this.listRc = resp.response;
                          this.cargandoReporte = true; 
                        });
  }

}
