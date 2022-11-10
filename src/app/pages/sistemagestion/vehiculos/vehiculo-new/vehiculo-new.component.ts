import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarcasService } from '../../marcas/services/marcas.service';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VehiculoServiceService } from '../services/vehiculo-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ISelect, Select } from '../../common/select-models';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-vehiculo-new',
  templateUrl: './vehiculo-new.component.html',
  styles: [
  ]
})
export class VehiculoNewComponent implements OnInit {

  
  public listMarca:ISelect[] = [];
  //public marcaSelected!:ISelect;

  public listUsuarios:ISelect[] = [];

  public selectUsuario:any[] = [];
  public filteredUsers:any[] = [];

  //public marcaSelect:any = [];

  public formEdit = this.fb.group({
    vehiculo_id:[],
    vehiculo_nombre_tarjeta: ['' , Validators.required],
    id_marca:['' , [Validators.required]],
    vehiculo_color:['' , Validators.required],
    vehiculo_placa:['' , Validators.required],
    vehiculo_cilindraje: [''  ,Validators.required],
    id_usuario:['' , Validators.required],
    vehiculo_modelo:['' , Validators.required],
    vehiculo_tipo:['' , Validators.required],
    id_empresa:['']
  });

  constructor(
    private marcasService:MarcasService , 
    private vehiculoService:VehiculoServiceService,
    private fb:FormBuilder , 
    private authService:AuthService ,
    private activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.geListMarcas();
    this.usuariosFindByIdempresa();

    this.activateRoute.data.subscribe(({vehiculo}) => {
      if(vehiculo)
      {
        this.updatedForm(vehiculo[0]);
         
      }
    })
  }
  updatedForm(vehiculo:any)
  {
    if(vehiculo)
    {
      this.formEdit.reset({...vehiculo} , {emitEvent:false , onlySelf:true});
      /*this.formEdit.get('id_marca')?.valueChanges.subscribe(id_marca => {
        console.log(id_marca);
      })*/
       
    }else{
      this.formEdit.reset({});
    }
  }

  geListMarcas()
  {
    this.marcasService.getListMarcas()
                    .subscribe(resp => {
                      this.listMarca = resp;
                    })
  }
  /*onChange(event:any , lugar:string)
  {
    if(lugar === 'marca')
    {
      this.formEdit.get('id_marca')?.setValue(event.value);
    }else if(lugar ==='usuario')
    {
      this.formEdit.get('id_usuario')?.setValue(event.value);
    }else if(lugar === 'tipo')
    {
      this.formEdit.get('vehiculo_tipo')?.setValue(event.value);
    }
  } */

  onSubmit(){ 
    
  this.formEdit.get('id_empresa')?.setValue(this.authService.usuario.id_empresa);
    
   if(this.formEdit.valid)
    { 
      if(this.formEdit.get('vehiculo_id')?.value)
      {
        this.updated();
      }else{
        this.save();
      }
    }
  }
  save()
  {
    this.vehiculoService.save(this.formEdit.value)
    .subscribe((resp:any) => {
      Swal.fire({ 
        icon: 'success',
        title: 'Creado',
        showConfirmButton: false,
        timer: 1500
      });
      this.formEdit.reset();
    })
  }
  updated()
  {
    this.vehiculoService.updated(this.formEdit.value).subscribe((resp:any) => {
                  Swal.fire({ 
                    icon: 'success',
                    title: 'Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                  });
                } , (error) => {
                  Swal.fire({
                    title:'Oops..',
                    icon:'error',
                    text:'Error actualizando'
                  })
                })
  }


  usuariosFindByIdempresa()
  {
    const id_empresa = this.authService.usuario.id_empresa;
    this.vehiculoService.usuarioSelect(id_empresa)
                          .subscribe(usuarioSelect => {
                              this.listUsuarios = usuarioSelect;
                          })
    
  }


 

previousState():void
{
  window.history.back();
}

}
