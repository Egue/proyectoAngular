import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IInventario } from '../inventario.model';
import { InventarioService } from '../service/inventario.service';

@Component({
  selector: 'app-inventario-articulo-list',
  templateUrl: './inventario-articulo-list.component.html',
  styles: [
  ]
})
export class InventarioArticuloListComponent implements OnInit {

  public listUnitario:any[] = [];
  public listArticulos:IInventario[] = [];
  public tempList:any[] = [];
  public dialognew:boolean = false;

  public editform = this.fb.group({
    nombre:['' , Validators.required],
    codigo:['' ,  Validators.required],
    valor:0,
    unitario:['' , Validators.required],
    cantidad:0,
    categoria:['TELEVISIÓN' , Validators.required]
  })
  constructor(private fb:FormBuilder , private inventarioService:InventarioService) { }

  ngOnInit(): void {
    this.listUnitario = [
      {name:'No' , value:'No'},
      {name:'Si' , value:'Si'},
      ]

      this.getListArticulos();
   
  }

  getListArticulos()
  {
    this.inventarioService.articuloList().subscribe((resp)=>{
        this.listArticulos = resp;
        this.tableTransform();
         
    })
  }
  tableTransform()
  {
    for(let item of this.listArticulos)
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

  openDialog()
  {
    this.dialognew = true;
  }
  closeDialog()
  {
    this.dialognew = false;
  }

  onSubmit()
  {
    if(this.editform.valid)
    {
      this.inventarioService.articuloSave(this.editform.value).subscribe((resp:any) => {
        
        this.closeDialog();
        this.getListArticulos();
      })
    }
  }
 
}
