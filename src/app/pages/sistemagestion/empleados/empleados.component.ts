import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SGEmpleado } from 'src/app/models/sgEmpleado.model';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { Location } from '@angular/common'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [
  ]
})
export class EmpleadosComponent implements OnInit {

  public listEmpleadoPermiso:any[] = [];
  public listEmpleados:any[] = [];

  public modalEmpleados:boolean = true;
  public loading:boolean = false;
  
  public permiso:number = 0;
  constructor(
    private authService:AuthService,
    private activateRoute:ActivatedRoute , private sistemaGestionService:SistemaGestionService,
    private location:Location) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(({permiso}) => {
       
       this.permiso = permiso;

       this.getlistEmpleadoPermiso();
    })
  }

  openModalEmpleados()
  {
    this.modalEmpleados =  false;
    this.sistemaGestionService.getListEmpleados(this.authService.usuario.id_empresa)
                              .subscribe((resp) => {
                                this.listEmpleados = resp;
                              })
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
        this.loading = true;
        this.sistemaGestionService.deletePermisoEmpleado(empleado.id_permisos_empleado)
        .subscribe((resp:any) => {           
            this.getlistEmpleadoPermiso();
            this.loading = false;
            Swal.fire(
              'Eliminado!',
              `El usuario ${empleado.user} fue eliminado`,
              'success'
            )
        }, (err) => {
          this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al intentar eliminar'
            })
        })
      }
    })

   
  }

  seleccionarEmpleado(empleado:SGEmpleado)
  {
    
    this.modalEmpleados = true;
    const seleccionarEmpleado = {
      "id_permiso_trabajo" : this.permiso,
      "id_user": empleado.id,
      "id_empresa": empleado.id_empresa
    }
    this.loading = true;
     this.sistemaGestionService.savePermisoEmpleado(seleccionarEmpleado)
              .subscribe((resp) => {
                this.getlistEmpleadoPermiso();
                this.loading = false;
              } ,  (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.response
                })
              })

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
      this.loading = true;
      this.sistemaGestionService.getListPermisoEmpleado(this.permiso)
                .subscribe(resp => {
                  this.loading = false;
                  this.listEmpleadoPermiso = resp;
                })
    }
  }

back():void
{
  this.location.back();
}

}
