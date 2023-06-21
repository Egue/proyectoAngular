import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import Swal from 'sweetalert2';
import { PermisoService } from '../services/permiso.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ListComponent implements OnInit {


  public value2:number = 50;
 
  public dialogFilter:boolean = true;

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

  public estado:any = [
    {id : 0 , estado:'Anulado'},
    {id : 1 , estado:'Activo'},
    {id : 2 , estado:'Cerrado'}
  ]

  public formSearch = this.fb.group({
    id_user : '' ,
      estado : ['' , Validators.required],
      fecha: ['' , Validators.required]
  })
  constructor(public authService:AuthService , 
    private permisoService:PermisoService , 
    private fb:FormBuilder ,
    private sistemaGestionService:SistemaGestionService , 
    private _messageService:MessageService ,
    private errorhandlingService : ErrorHandlingService) { }


  ngOnInit(): void {
     this.getListPermisos();
     
  }

  getListPermisos()
  {
  //if(this.authService.usuario.role == 'ADMIN_ADMIN' || this.authService.usuario.role =='ADMIN_ST')
   
  /*if(this.authService.usuario.role == 'ADMIN_ADMIN')
    {
      this.permisoService.findByIdEmpresa(this.authService.usuario.id_empresa).subscribe((resp:any) => {
        this.listPermisos = resp.response;
         
        //console.log(resp);
      } , error => {
        console.log(error);
      })
      
    }else{
      //consultar por id de usuario
      this.permisoService.findByIdUsuarioActive(this.authService.usuario.id).subscribe((resp:any) => {
        this.listPermisos = resp.response;
         
         
      })
    }*/
    const filter = {
      id_user : this.authService.usuario.id,
      estado : "",
      fecha: ""
    }
    this.permisoService.findByIdUsuarioActive(filter).subscribe((resp:any) => {
      this.listPermisos = resp.response;
      console.log(resp.response)
    } , error => {
        console.log(this.errorhandlingService.error);
    })


  }



  //addnew
  addPermiso(){ 
    this.modalEstado = false; 
    this.getListTipoTrabajo();
  }
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
          
          this._messageService.add({severity:'error' , summary:'Error' , detail:this.errorhandlingService.error.error.response})
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
                          } , error => {
                            Swal.fire(
                              
                              'Error inesperado',
                              `${error.error.response}`,
                              'error'
                            )
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



   ///////////////////dialog
   openFilter()
   {
    this.dialogFilter = false;
   }

   closeFilter() {
    this.dialogFilter = true;
    }

    searchPermiso() {
       
      let fecha = this.pipe.transform(this.formSearch.get('fecha')?.value , 'yyy-MM-dd');
      this.formSearch.get('fecha')?.setValue(fecha);
      this.formSearch.get('id_user')?.setValue(this.authService.usuario.id)
      if(this.formSearch.valid)
      {
        this.permisoService.findByIdUsuarioActive(this.formSearch.value).subscribe((resp:any) => {
          this.listPermisos = resp.response;
          this.closeFilter();
          this.formSearch.reset();
        } , error => {
            console.log(this.errorhandlingService.error);
          this.closeFilter();
          this.formSearch.reset();
        })
           
      }
      
    }
      

}
