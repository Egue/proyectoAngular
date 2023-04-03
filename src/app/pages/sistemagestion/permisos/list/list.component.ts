import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import Swal from 'sweetalert2';
import { PermisoService } from '../services/permiso.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ListComponent implements OnInit {

  public loading:boolean = false;
  public listPermisos:any[] = [];

  //addnew
  public modalEstado:boolean = true;
  public pipe:DatePipe = new DatePipe('en-US');
  //list tipo de trabajo
  public listTipoTrabajo:any[] = [];


  public formPermiso = this.fb.group({
    fecha_inicio:['' , [Validators.required]],
    hora_inicio:'',
    lugar_de_trabajo:['' , [Validators.required]],
    id_usuario:this.authService.usuario.id,
    id_empresa:this.authService.usuario.id_empresa,
    id_permiso_trabajo:['' , [Validators.required]]
  });
  public lugar:any = [
    {'name':'Interno'},
    {'name':'Urbano'},
    {'name':'Rural'},
    {'name':'Urbano y Rural'}
  ];



  constructor(private authService:AuthService , 
    private permisoService:PermisoService , 
    private fb:FormBuilder ,
    private sistemaGestionService:SistemaGestionService , 
    private _messageService:MessageService) { }


  ngOnInit(): void {
     this.getListPermisos();
     this.getListTipoTrabajo();
  }

  getListPermisos()
  {
  //if(this.authService.usuario.role == 'ADMIN_ADMIN' || this.authService.usuario.role =='ADMIN_ST')
  this.loading = true;
  if(this.authService.usuario.role == 'ADMIN_ADMIN')
    {
      this.permisoService.findByIdEmpresa(this.authService.usuario.id_empresa).subscribe((resp:any) => {
        this.listPermisos = resp.response;
        this.loading = false;
      })
      
    }else{
      //consultar por id de usuario
      this.permisoService.findByIdUsuarioActive(this.authService.usuario.id).subscribe((resp:any) => {
        this.listPermisos = resp.response;
         
        this.loading = false;
      })
    }
  }



  //addnew
  addPermiso(){ this.modalEstado = false; }
  cerrarModal(){ this.modalEstado = true; }


  saveClasificacion()
  {
    let fecha = this.pipe.transform(this.formPermiso.get('fecha_inicio')?.value , 'yyy-MM-dd');
    let hora = this.pipe.transform(this.formPermiso.get('fecha_inicio')?.value , 'H:mm:ss');
    this.formPermiso.get('fecha_inicio')?.setValue(fecha);
    this.formPermiso.get('hora_inicio')?.setValue(hora);
    this.formPermiso.get('lugar_de_trabajo')?.setValue(this.formPermiso.get('lugar_de_trabajo')?.value.name); 
    if(this.formPermiso.valid)
    {  
      
      this.sistemaGestionService.savePermiso(this.formPermiso.value)
        .subscribe((resp:any) => {
          if(resp){ 
            this.formPermiso.reset();
            this.modalEstado = true;
            this._messageService.add({severity:'success' , summary:'Permiso' , detail:'Creado con éxito'})
             
            //this.getListPermisos();
            setTimeout(() => {
              this.createEmpleadoPermiso(resp.response);
            }, 2000);
          }
        } , error => {
          this.modalEstado = true;
          console.log(error)
          this._messageService.add({severity:'error' , summary:'Error' , detail:error.error.response})
        })
    }
  }

  /**CREAR USUARIO COMO EMPLEADO_permiso retornado */
  createEmpleadoPermiso(id:any)
  {
      if(id)
      {
        const data = {
          id_permiso_trabajo : id,
          id_user : this.authService.usuario.id,
          id_empresa : this.authService.usuario.id_empresa
        }
        this.sistemaGestionService.savePermisoEmpleado(data).subscribe((resp:any) => {
                    this._messageService.add({severity:'success' , summary:'Empleado' , detail:'Empleado adicionado'});
                    this.getListPermisos();

        } , error => {
                  this._messageService.add({severity:'error' , summary:'Error' , detail:error.error.response})
        })
      }
  }


  selectedTipo(event:any)
  {
    this.formPermiso.get("id_permiso_trabajo")?.setValue(event.value.id_tipo);
     
  }

  getListTipoTrabajo()
  {
    this.sistemaGestionService.getListTipoTrabajo(this.authService.usuario.id_empresa)
                          .subscribe((resp:any) => {
                            this.listTipoTrabajo = resp.response;
                          })
  }

  public inactive(item:any)
  {
    Swal.fire({
      title: 'Eliminar permiso?',
      text: "Esta seguro de eliminar el permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        item.estado = 0;
        this.permisoService.inactive(item.id_permiso).subscribe((resp:any) => {
          Swal.fire(
            'Inactivado',
            'El permiso fue inactivado con éxito',
            'success'
          )
        }, error => {

          Swal.fire(
            'Error inesperado',
            `${error.error.response}`,
            'error'
          )

        })
       
      }
    })
  }



}
