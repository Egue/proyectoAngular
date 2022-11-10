import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Accordion, AccordionModule} from 'primeng/accordion';
import { VehiculoServiceService } from '../services/vehiculo-service.service';
@Component({
  selector: 'app-vehiculos-adjuntos',
  templateUrl: './vehiculos-adjuntos.component.html',
  styles: [
  ]
})
export class VehiculosAdjuntosComponent implements OnInit {

  public loading:boolean = true;
  
  public index:number = 0;

  public listItem:any[] = [];

  public referencia:number=0;

  public modal:boolean = true;

  public tipo:string = '';

  @ViewChild(Accordion) accordion?:Accordion;

 
 
  constructor(private activateRoute:ActivatedRoute , private vehiculoService:VehiculoServiceService) { }
 

  ngOnInit(): void {
    
    this.activateRoute.data.subscribe(({vehiculo_id}) => {
      if(vehiculo_id)
      {
        this.referencia = vehiculo_id; 
      }
    })

    if(this.index == 0)
    {
      this.getListDocumentoSOAT();
      this.tipo = 'SOAT';
    }

  }

  changeOculto($event:any)
  {
    this.modal = $event;
    if(this.index == 0)
    {       
      this.getListDocumentoSOAT();
      this.tipo = 'SOAT';
    }else if(this.index == 1)
    {
      this.getListDocumentoTecnomecanica();
      this.tipo = 'TECNOMECANICA';
    }else if( this.index ==2)
    {
      this.getListOtroDocumentos();
      this.tipo = 'OTROS';
    }
  }
  
  onChange($event:any)
  {
    this.listItem = [];
    this.index = $event

    if(this.index == 0)
    {       
      this.getListDocumentoSOAT();
      this.tipo = 'SOAT';
    }else if(this.index == 1)
    {
      this.getListDocumentoTecnomecanica();
      this.tipo = 'TECNOMECANICA';
    }else if( this.index ==2)
    {
      this.getListOtroDocumentos();
      this.tipo = 'OTROS';
    }

  }

  getListDocumentoSOAT()
  {
    this.loading  = true;
    const data = {
      documento_tipo: 'SOAT',
      referencia_id: this.referencia
    }
    this.vehiculoService.listDocumentoTipo(data).subscribe((resp:any) => {
      this.listItem = resp.response;
      this.loading = false;
    })
  }

  getListDocumentoTecnomecanica()
  {
    this.loading = true;
    const data = {
      documento_tipo:'TECNOMECANICA',
      referencia_id: this.referencia
    }
    this.vehiculoService.listDocumentoTipo(data).subscribe((resp:any) => {
      this.listItem = resp.response;
      this.loading = false;
    })
  }

  getListOtroDocumentos()
  {
    this.loading = true;
    const data = {
      documento_tipo:'OTROS',
      referencia_id: this.referencia
    }
    this.vehiculoService.listDocumentoTipo(data).subscribe((resp:any) => {
      this.listItem = resp.response;
      this.loading = false;
    })
  }


  openModal()
  {
    this.modal = false;
  }

}
