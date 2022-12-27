import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventarioService } from '../../inventario/service/inventario.service';
import { InventarioCargasService } from '../services/inventario-cargas.service';

@Component({
  selector: 'app-inv-cargas-detalle',
  templateUrl: './inv-cargas-detalle.component.html',
  styles: [
  ]
})
export class InvCargasDetalleComponent implements OnInit {

  @Input() public ingresoId:any = 0;
  @Input() public bodegaId:any = 0;
  public listArticulo:any[] =[];

  public dialog:boolean = false;

  public listDetalle:any[] = [];

  public totalVenta:number = 0;

  public totalCompra:number= 0;

  public formDetalle = this.fb.group({
    articulo_id:['' , Validators.required],
    ingreso_id:['' , Validators.required],
    bodega_id:['', Validators.required],
    ingreso_detalle_cantidad:['', Validators.required],
    ingreso_detalle_compra:['', Validators.required],
    ingreso_detalle_venta:['', Validators.required]
  });

  constructor(private fb:FormBuilder , 
    private inventarioService:InventarioService ,
    private inventarioCargaService:InventarioCargasService) { }

  ngOnInit(): void {
    this.getListDetalleByIngresoId();
   
  }

  openDialog()
  {
    this.dialog = true;
  }

  searchArticuloByName(event:any)
  {
    const data = {
      articulo_nombre : event.query
    };

      this.inventarioService.articuloFindByName(data).subscribe((resp:any) => {
          this.listArticulo = resp.response;
      })
  }

  onChangeSelect(event:any)
  {
    this.formDetalle.get('articulo_id')?.setValue(event.articulo_id);
    this.formDetalle.get('ingreso_id')?.setValue(this.ingresoId);
    this.formDetalle.get('bodega_id')?.setValue(this.bodegaId);
  }

  onSubmit()
  {
    if(this.formDetalle.valid)
    {

      this.inventarioCargaService.inventarioDetalleCargaSave(this.formDetalle.value).subscribe((resp:any) => {
        this.dialog = false;
        this.formDetalle.reset();
        this.getListDetalleByIngresoId();
        this.calcularTotalCompra();
        this.calcularTotalVenta();
      })

      
    }
  }

  getListDetalleByIngresoId()
  {

    this.inventarioCargaService.inventarioFindDetalleByIngresoId(this.ingresoId).subscribe((resp:any) => {
        this.listDetalle = resp.response; 
        this.calcularTotalCompra();
        this.calcularTotalVenta();
    })
  }

  calcularTotalCompra()
  {
    let total = 0;
    for(let compra of this.listDetalle){
      total += compra.compra
    }
    this.totalCompra = total;
  }

  calcularTotalVenta()
  {
    let total = 0;
    for(let venta of this.listDetalle){
      total += venta.venta
    }

    this.totalVenta = total;
  }

  delete(item:any)
  {
    console.log(item);
  }

}
