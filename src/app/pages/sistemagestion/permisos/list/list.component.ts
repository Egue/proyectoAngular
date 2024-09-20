import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  providers: [MessageService , ConfirmationService]
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
    private errorhandlingService : ErrorHandlingService ,
    private confirmationService:ConfirmationService) { }


  ngOnInit(): void {
     this.getListPermisos();
     
  }

  getListPermisos()
  {
  
    const filter = {
      id_user : this.authService.usuario.id,
      estado : "",
      fecha: ""
    }
    this.permisoService.findByIdUsuarioActive(filter).subscribe((resp:any) => {
      this.listPermisos = resp.response;
      //console.log(resp.response)
       
    } , error => {
        //console.log(this.errorhandlingService.error);
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
       
        this.sistemaGestionService.savePermiso(this.formPermiso.value).subscribe({
          next:(resp:any) => {
            this.formPermiso.reset();
            this.modalEstado = true;
            this._messageService.add({severity:'success' , summary:'Permiso' , detail:'Creado con éxito'})
            this.getListPermisos();
          },
          error:(error) => {
            this.modalEstado = true;
          
            this._messageService.add({severity:'error' , summary:'Error' , detail:this.errorhandlingService.error.error.response});
          }
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
                            this._messageService.add({severity:'error' , summary:'Error' , detail:this.errorhandlingService.error.error.response})
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

          this._messageService.add({severity:'error' , summary:'Error' , detail:this.errorhandlingService.error.error.response})

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
          this._messageService.add({severity:'error' , summary:'Error' , detail:this.errorhandlingService.error.error.response})
          this.closeFilter();
          this.formSearch.reset();
        })
           
      }
      
    }

    validarLlenado(permiso: any) {

          const empleados:any[] = permiso.empleados;

          let deshabilitar = true;

          empleados.forEach(element => {

              if(element.id_user == this.authService.usuario.id)
              {
                deshabilitar = false;
              }
          });

          return deshabilitar;
      }


      actualizar() {
        this.getListPermisos();
        }
      

        cerrarPermiso(permiso: any) {
          console.log(permiso);
            this.confirmationService.confirm({
              message: 'Desea cerrar el permiso de trabajo?',
              header:'Eliminar Permiso' , 
              acceptLabel: 'Si' ,
              accept: () => {
                  this.cerrar(permiso.id_permiso);

              }
            })
          }

          cerrar(id:any)
          { 
              this.permisoService.cerrarPermiso(id).subscribe(() => {
                this.actualizar();
              } , () => {
                console.log(this.errorhandlingService.error.error)
              })
          }


}
