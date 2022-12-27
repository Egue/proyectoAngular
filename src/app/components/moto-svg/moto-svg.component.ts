import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { PermisoVehiculoService } from 'src/app/pages/sistemagestion/permisos/services/permiso-vehiculo.service';
import { VehiculoServiceService } from 'src/app/pages/sistemagestion/vehiculos/services/vehiculo-service.service';
import {UsuariosService} from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { IVehiculoDrop } from './vehiculoQuery.model';

 

@Component({
  selector: 'app-moto-svg',
  templateUrl: './moto-svg.component.html',
  styles: [
  ]
})
export class MotoSvgComponent implements OnInit {
 

 @Input() public lugarTrabajo:string = "";
 @Input() public permiso:any = 0;
 
 public loading:boolean = false;
 public modalgeneralidades:boolean = true;

 public listPermisoVehiculo:any[] = [];

 //modal dialog
 public dialog:boolean = false;
 public conductor:boolean = false;
 //fomr
 public listVehiculos:IVehiculoDrop[] = []; 
//conductor
public listConductor:any[] = [];
 public editForm = this.fb.group({
    id_empresa:['' , Validators.required],
    permiso_id:['', Validators.required],
    vehiculo_id:['', Validators.required],
    tipo:['' , Validators.required],
    conductor_id:['', Validators.required]
 })

 //disctin item
 public listDict:any[] = [];
 public classText:string = '';
 //lista de preoperacional x item
 public listInspeccion:any[] = []; 



  constructor(
    private fb:FormBuilder, 
    private authService:AuthService, 
    private permisoVehiculoService:PermisoVehiculoService , 
    private vehiculoService:VehiculoServiceService,
    private usuariosService:UsuariosService) { 
   
  }

  ngOnInit(): void { 
    this.loading = true;
    this.searchPermisoVehiculo();
  }

  searchPermisoVehiculo()
  {
    this.permisoVehiculoService.findByPermiso(this.permiso).subscribe((resp:any) => {
          this.listPermisoVehiculo = resp.response;
          this.loading = false;
    })
  }

  openDialog()
  {
      this.dialog = true;
  }

  closeDialog()
  {
    this.dialog = false;
    this.editForm.reset();
  }
 
  search(event:any)
  {
    const data = {
      id_empresa : this.authService.usuario.id_empresa,
      placa: event.query
    }
    this.vehiculoService.findByEmpresaAndPlaca(data).subscribe((resp:any) => {
      this.listVehiculos = resp;
      
  } )
}

onSubmit()
{
  if(this.editForm.valid)
  {
    this.permisoVehiculoService.permisoVehiculoSave(this.editForm.value).subscribe((resp:any) => {
      this.closeDialog();
      this.searchPermisoVehiculo();
    }, error => {
      this.closeDialog();
      Swal.fire({
        title:'Oops..',
        text: error.error.response,
        icon:'error'
      })
  })
  }
}

onChangeSelect(event:any)
{
  this.editForm.get('vehiculo_id')?.setValue(event.id);
  this.editForm.get('tipo')?.setValue(event.tipo);
  this.editForm.get('permiso_id')?.setValue(this.permiso);
  this.editForm.get('id_empresa')?.setValue(this.authService.usuario.id_empresa);
  
}

editPreoperacion(item:any)
{
  this.listInspeccion = [];
  this.loading = true;
  console.log(item);
  this.vehiculoService.disctGeneralidades(item.permiso_vehiculo_id).subscribe((resp:any) => {
        this.listDict = resp.response;
        this.loading = false;
  })
}

addgeneralidad(item:any)
{
   this.loading = true;
   this.vehiculoService.findByNameGeneralidadesVehiculos(item).subscribe((resp:any) => {
    this.listInspeccion = resp.response; 
     this.loading = false;
   })
}

onInspeccion(item:any ,estado:any)
{
     
  this.modalgeneralidades = false;

  item.inspeccion = estado;

      this.vehiculoService.editVehiculoGeneralides(item).subscribe((resp:any)=> {
        this.modalgeneralidades = true;

      } , error => {
        Swal.fire({
          text:'Error inesperado',
          title:'Oops..',
          icon:'error'
        })
      })
}

//eliminando permiso_vehiculo
delete(item:any):void
{
    this.vehiculoService.deletePermisosVehiculos(item).subscribe((resp:any) => {
      this.searchPermisoVehiculo();
      this.listDict = [];
      this.listInspeccion = [];
    })
}

 
//buscar conductor
searchConductor(string:any)
{
  this.usuariosService.findByName(string.query).subscribe((resp:any) => {
    this.listConductor = resp;
  })
}

onChangeCoductor(event:any)
{

  this.editForm.get('conductor_id')?.setValue(event.id);
}


}