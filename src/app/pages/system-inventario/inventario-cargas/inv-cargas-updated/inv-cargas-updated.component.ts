import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { InventarioProveedoresService } from '../../inventario-proveedores/service/inventario-proveedores.service';
import { InventarioBodegaService } from '../../inventarioBodega/service/inventario-bodega.service';
import { InventarioCargasService } from '../services/inventario-cargas.service';

@Component({
  selector: 'app-inv-cargas-updated',
  templateUrl: './inv-cargas-updated.component.html',
  styles: [
  ]
})
export class InvCargasUpdatedComponent implements OnInit {

  public proveedorList:any[] = [];
  public bodegaList:any[] = [];
  public tipoPago:any[] = [];

  public detalleIngreso:boolean = false;

  public editForm = this.fb.group({
    ingreso_id:'',
    proveedor_id:['' , Validators.required],
    bodega_id:['' , Validators.required],
    usuario_id: this.authService.usuario.id,
    ingreso_factura:['' , Validators.required],
    ingreso_tipo:['', Validators.required]
  });
  constructor(private fb:FormBuilder , 
    private authService:AuthService , 
    private inventarioBodegaService:InventarioBodegaService ,
    private inventarioProveedoresService:InventarioProveedoresService,
    private inventarioCargaService: InventarioCargasService ,
    private activedRoute:ActivatedRoute , 
    private route:Router) { }

  ngOnInit(): void {
    

    this.getListProveedor();
    this.getListBodegas();
    this.tipoPago=[
      {name:'--Seleccione--' , valor:''},
      {name:'Contado' , valor:'contado'},
      {name:'Crédito' , valor:'credito'},     
      {name:'Otro' , valor:'otro'},
    ]

    this.activedRoute.data.subscribe(({carga}) => { 
      
      if(carga[0].ingreso_id)
      {
         this.detalleIngreso = true;
        this.updatedForm(carga[0]);
      }
    })
  }

  updatedForm(carga:any)
  {
    if(carga)
    {
      this.editForm.reset({...carga} , {emitEvent:false, onlySelf:true})
    }
  }
  onSubmit()
  {
    if(this.editForm.valid)
    {
      
      this.inventarioCargaService.inventarioCargaSave(this.editForm.value).subscribe((resp:any) => {
                console.log(resp.response);
      })
    }
  }

  getListBodegas()
  {
    this.inventarioBodegaService.inventarioBodegaList().subscribe((resp:any) => {
              this.bodegaList = resp.response;
    })
  }

  getListProveedor()
  {
    this.inventarioProveedoresService.inventarioProveedoresList().subscribe((resp:any) => {
      this.proveedorList = resp.response;
    })
  }

}
