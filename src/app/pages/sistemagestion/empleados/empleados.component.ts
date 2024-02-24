import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SGEmpleado } from 'src/app/models/sgEmpleado.model';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { Location } from '@angular/common'
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api'; 
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class EmpleadosComponent implements OnInit {

  public listEmpleadoPermiso:any[] = [];
  public listEmpleados:any[] = [];

  public modalEmpleados:boolean = true;
  public loading:boolean = false;
 

  public formEmpleado = this.fb.group({
      empleado: ''
  })

  
  public permiso:number = 0;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private activateRoute:ActivatedRoute , private sistemaGestionService:SistemaGestionService,
    private location:Location , 
    private messageService:MessageService , private errorHandlingService:ErrorHandlingService) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(({permiso}) => {
       
       this.permiso = permiso;

       this.getlistEmpleadoPermiso();
    })
  }

  openModalEmpleados(){this.modalEmpleados =  false}

  findEmpleadoQuery(string:any)
  {

    const find = {
      query : string.query,
      idEmpresa : this.authService.usuario.id_empresa,

    } 
    this.sistemaGestionService.getListEmpleados(find)
                              .subscribe((resp) => {
                                this.listEmpleados = resp;
                                 
                              } )
  }

  deletePermisoEmpleado(empleado:any)
  { 

    return Swal.fire({
      title: 'Eliminar Empleado del permiso?',
      text: `Quieres eliminar a ${empleado.user}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if(result.isConfirmed)
      {
         
        this.sistemaGestionService.deletePermisoEmpleado(empleado.id_permisos_empleado)
        .subscribe((resp:any) => {           
            this.getlistEmpleadoPermiso();
             
            Swal.fire(
              'Eliminado!',
              `El usuario ${empleado.user} fue eliminado`,
              'success'
            )
        }, (err) => {
           
          this.messageService.add({severity:'error' , summary:'Error eliminando empleado' , detail:this.errorHandlingService.error.error.response })
           
        })
      }
    })

   
  }

  seleccionarEmpleado()
  { 
    
    this.modalEmpleados = true;
    const seleccionarEmpleado = {
      "id_permiso_trabajo" : this.permiso,
      "id_user": this.formEmpleado.get("empleado")?.value.id,
      "id_empresa": this.formEmpleado.get("empleado")?.value.id_empresa,
    }
    //console.log(seleccionarEmpleado);

    
     this.sistemaGestionService.savePermisoEmpleado(seleccionarEmpleado)
     .subscribe((resp) => {
                this.getlistEmpleadoPermiso();
                this.formEmpleado.reset();
                this.loading = false;
              }, error => {
                this.formEmpleado.reset();
                this.messageService.add({severity:'error' , summary:'Error Asignado Empleado' , detail:this.errorHandlingService.error.error.response , })
              } )

  }

  cerrarModalEmpleado()
  {
    this.modalEmpleados = true;
  }
  clear(table:any)
  {
    table.clear();
  }

  getlistEmpleadoPermiso()
  {
    if(this.permiso > 0)
    {
      this.sistemaGestionService.getListPermisoEmpleado(this.permiso)
                .subscribe(resp => {
                  this.listEmpleadoPermiso = resp;
                })
    }
  }

back():void
{
  this.location.back();
}

}
