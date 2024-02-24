import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { InventarioBodegaService } from '../service/inventario-bodega.service';

@Component({
  selector: 'app-list-bodega',
  templateUrl: './list-bodega.component.html',
  styles: [
  ]
})
export class ListBodegaComponent implements OnInit {
//transferencias
  public transfer:boolean = false;
  public listTransferencia:any[] = [];

  public pipe:DatePipe = new DatePipe('en-US');
  public rangeDates:any[] = [];

  public buttonLoading:boolean = false;

//Listar bodegas
  public dialog:boolean = false;
  public loading:boolean = false;

  public listBodega:any[] = [];
  public listKardex:any[] =[];

  public editForm = this.fb.group({

    bodega_nombre:['', [Validators.required, Validators.minLength(4)]]
  });



  constructor(public authService:AuthService , 
    public fb:FormBuilder , 
    private inventarioBodegaService:InventarioBodegaService) { }

  ngOnInit(): void {

    this.getList();
  }

/***LISTA DE BODEGAS */
  getList()
  {
      this.inventarioBodegaService.inventarioBodegaList().subscribe((resp:any) => {
          this.listBodega = resp.response;
      })
  }

  onSubmit()
  {
    if(this.editForm.valid)
    {
      //console.log(this.editForm.value);
    }
  }

  viewDialog()
  {
    this.dialog = true;
  }

  handleBodega(item:any):void{
    this.loading = true;
    this.inventarioBodegaService.kardex(item.bodega_id).subscribe((resp:any) => {
       this.listKardex = resp.response;
       this.tableTransform();
       this.loading = false;
      
       
    }, error => {
      this.loading = false;
    })
  }

  tableTransform()
  {
    for(let item of this.listKardex)
    {
      if(item.cantidad != undefined)
      {
        if(item.cantidad > 0 && item.cantidad < 11)
        {
          item.estado = 'bajostock';
        }else if(item.cantidad  == 0)
        {
          item.estado = 'sinstock';
        }else{
          item.estado = 'enstock';
        }
      }
    }
  }

  /**PROCESOS DE TRANSFERENCIAS */

  openDialogTransfer()
  {
    this.transfer = true;
  }

  public getListTransferencia():void
  {
     this.buttonLoading = true;

     const data = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyy-MM-dd'),
      valor2: this.pipe.transform(this.rangeDates[1] , 'yyyy-MM-dd')
     }

     this.inventarioBodegaService.getListTransferencias(data).subscribe((resp:any) => {
        this.listTransferencia = resp.response;
     } , error => {
        this.buttonLoading = false;
     })
  }
}
