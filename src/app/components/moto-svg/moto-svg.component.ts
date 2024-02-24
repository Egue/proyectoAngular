import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { PermisoVehiculoService } from 'src/app/pages/sistemagestion/permisos/services/permiso-vehiculo.service';
import { VehiculoServiceService } from 'src/app/pages/sistemagestion/vehiculos/services/vehiculo-service.service'; 
import { IVehiculoDrop } from './vehiculoQuery.model';
import { MessageService } from 'primeng/api';

 

@Component({
  selector: 'app-moto-svg',
  templateUrl: './moto-svg.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class MotoSvgComponent implements OnInit {


 @Input() public lugarTrabajo:string = "";
 @Input() public permiso:any = 0;
 
 public vehiculoSelect:any;

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
    private messageService:MessageService) { 
   
  }

  ngOnInit(): void {  
    this.searchPermisoVehiculo();
  }

  searchPermisoVehiculo()
  {
    //console.log(this.permiso)
    this.permisoVehiculoService.findByPermiso(this.permiso).subscribe((resp:any) => {
          this.listPermisoVehiculo = resp.response;
          
    } , () => {
      this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
    })
  }

  openDialog()
  {
      this.dialog = true;
      this.searchConductor();
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
    //console.log(this.editForm.value)
    this.permisoVehiculoService.permisoVehiculoSave(this.editForm.value).subscribe((resp:any) => {
      this.closeDialog();
      this.searchPermisoVehiculo();
    }, error => {
      this.closeDialog();
      this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
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
  this.vehiculoSelect = item;
  //console.log(item);
  this.vehiculoService.disctGeneralidades(item.permiso_vehiculo_id).subscribe((resp:any) => {
        this.listDict = resp.response; 
  } , () => {
    this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
  })
}

addgeneralidad(item:any)
{ 
   //console.log(item);
   item.id_vehiculo = this.vehiculoSelect.permiso_vehiculo_id
   //console.log(item);
   this.vehiculoService.findByNameGeneralidadesVehiculos(item).subscribe((resp:any) => {
   // console.log(resp.response);
    this.listInspeccion = resp.response;  
   } , () => {
    this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
   })
}

onInspeccion(item:any ,estado:any)
{
     
  this.modalgeneralidades = false; 
  item.inspeccion = estado;

      this.vehiculoService.editVehiculoGeneralides(item).subscribe((resp:any)=> {
        this.modalgeneralidades = true;

      } , () => {
        this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
      })
}

//eliminando permiso_vehiculo
delete(item:any):void
{
    this.vehiculoService.deletePermisosVehiculos(item).subscribe((resp:any) => {
      this.searchPermisoVehiculo();
      this.listDict = [];
      this.listInspeccion = [];
    } , () => {
      this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
    })
}

 
//buscar conductor
searchConductor()
{
  /*this.usuariosService.findByName(string.query).subscribe((resp:any) => {
    this.listConductor = resp;
    console.log(resp);
  })*/
  this.permisoVehiculoService.getListEmpleadoActivePermiso(this.permiso).subscribe((resp:any) => {
      this.listConductor = resp.response;
  } , () => {
    this.messageService.add({severity:'error' , summary:'Error inesperado' , detail:'Consulte con administración'})
  })
}

onChangeCoductor(event:any)
{ 
  this.editForm.get('conductor_id')?.setValue(event.value);
}

toback()
{
  history.back();
}


refresh() {
 this.searchPermisoVehiculo();
  }
   


}