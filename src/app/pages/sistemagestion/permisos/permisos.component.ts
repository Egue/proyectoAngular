import { Component, OnInit } from '@angular/core';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { AuthService } from 'src/app/auth/auth.service';
import {PeligrosService} from 'src/app/services/peligros.service';

import {FieldsetModule} from 'primeng/fieldset';
import { SGEmpleado } from 'src/app/models/sgEmpleado.model';
import Swal from 'sweetalert2';
import { SGPermisoActivo } from 'src/app/models/sgPermisoActivo.model';
import {ProgressBarModule} from 'primeng/progressbar';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: [

  ]
})
export class PermisosComponent implements OnInit {
  //componente app-moto-svg 
  public lugarTrabajo:string = '';

  public  sinPermisos:boolean = false;

  public index:number = 0; //inicio del accordion 
  public cargando:boolean = false;

  public loadingInModal:boolean = false;

  public permisosActivos:SGPermisoActivo[] = [] ;
  public modalEstado:boolean = true;
  public pipe:DatePipe = new DatePipe('en-US');
  
  public listEmpleadoPermiso:any[] = [];

  //tabla empleados
  public modalEmpleados:boolean = true;
  public loading:boolean = false;
  public first:number = 0;
  public rows:number = 10;
  public listEmpleados:any[] = [];
 
  //list tipo de trabajo
  public listTipoTrabajo:any[] = [];

  public lugar:any = [
    {'name':'Interno'},
    {'name':'Urbano'},
    {'name':'Rural'},
    {'name':'Urbano y Rural'}
  ];

  public formPermiso = this.fb.group({
    fecha_inicio:['' , [Validators.required]],
    hora_inicio:'',
    lugar_de_trabajo:['' , [Validators.required]],
    id_usuario:this.authService.usuario.id,
    id_empresa:this.authService.usuario.id_empresa,
    id_permiso_trabajo:['' , [Validators.required]]
  });

  //PELIGROS list
  public listPermisoPeligro:any[] = [];
  public modalPeligros:boolean = true;
  public listCategorias:any[] = [];
  public listPeligros:any[] = [];
  public categoriaOculta:boolean = true;
  public peligrosOculta:boolean = false;

  constructor(private fb:FormBuilder , private sistemaGestionService:SistemaGestionService , private authService:AuthService , private peligrosService:PeligrosService) { }

  ngOnInit(): void {
    this.getListPermisoOpen();
    this.getListTipoTrabajo();
  }

  addPermiso(){ this.modalEstado = false; }
  cerrarModal(){ this.modalEstado = true; }

  //consultar si existe un permiso activo
  getListPermisoOpen()
  {
    this.cargando = true; //un modal de true
    //consulta por id de usuario
    this.sistemaGestionService.getListPermisoOpen(this.authService.usuario.id)
              .subscribe((resp) => {
                //asignamos respuesta a permisosActivos
                  this.permisosActivos = resp;
                  this.cargando = false;//quitamos el false
                  if(this.permisosActivos.length > 0)
                  { 
                    console.log(this.permisosActivos);
                    //this.getlistEmpleadoPermiso();
                    //this.getListPermisoPeligro();
                    this.lugarTrabajo =  this.permisosActivos[0].lugar_de_trabajo;
                    this.sinPermisos = false;//desaárece el boton
                  }else{
                    //la respuesta es q no tiene permisos se activa boton
                    this.sinPermisos = true;
                  }
              })
  }

  saveClasificacion()
  {
    let fecha = this.pipe.transform(this.formPermiso.get('fecha_inicio')?.value , 'yyy-MM-dd');
    let hora = this.pipe.transform(this.formPermiso.get('fecha_inicio')?.value , 'H:mm:ss');
    this.formPermiso.get('fecha_inicio')?.setValue(fecha);
    this.formPermiso.get('hora_inicio')?.setValue(hora);
    this.formPermiso.get('lugar_de_trabajo')?.setValue(this.formPermiso.get('lugar_de_trabajo')?.value.name);

    if(this.formPermiso.valid)
    { console.log(this.formPermiso.value);
      
      this.sistemaGestionService.savePermiso(this.formPermiso.value)
        .subscribe((resp:any) => {
          if(resp){ 
            this.formPermiso.reset();
            this.modalEstado = true;
            this.getListPermisoOpen();
          }
        })
    }
  }

  getListTipoTrabajo()
  {
    this.sistemaGestionService.getListTipoTrabajo(this.authService.usuario.id_empresa)
                          .subscribe((resp:any) => {
                            this.listTipoTrabajo = resp.response;
                          })
  }

  selectedTipo(event:any)
  {
    this.formPermiso.get("id_permiso_trabajo")?.setValue(event.value.id_tipo);
     
  }

  openModalEmpleados()
  {
    this.modalEmpleados =  false;
    this.sistemaGestionService.getListEmpleados(this.authService.usuario.id_empresa)
                              .subscribe((resp) => {
                                this.listEmpleados = resp;
                              })
  }
  cerrarModalEmpleado()
  {
    this.modalEmpleados = true;
  }

  //functiojn primeng
  next()
  {
    this.first = this.first + this.rows;
  }
  prev()
  {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage():boolean{
    return this.listEmpleados ? this.first === (this.listEmpleados.length - this.rows):true;
  }
  isFirstPage():boolean{
    return this.listEmpleados ? this.first === 0 : true;
  }
  clear(table:any)
  {
    table.clear();
  }

  seleccionarEmpleado(empleado:SGEmpleado)
  {
    
    this.modalEmpleados = true;
    const seleccionarEmpleado = {
      "id_permiso_trabajo" : this.permisosActivos[0].id_permiso,
      "id_user": empleado.id,
      "id_empresa": empleado.id_empresa
    }
    this.sistemaGestionService.savePermisoEmpleado(seleccionarEmpleado)
              .subscribe((resp) => {
                this.getListPermisoOpen();
              } ,  (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.response
                })
              })

  }

  getlistEmpleadoPermiso()
  {
    if(this.permisosActivos.length > 0)
    {
       
      this.sistemaGestionService.getListPermisoEmpleado(this.permisosActivos[0].id_permiso)
                .subscribe(resp => {
                 
                  this.listEmpleadoPermiso = resp;
                })
    }
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
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al intentar eliminar'
            })
        })
      }
    })

   
  }

  getListPermisoPeligro()
  {
    this.sistemaGestionService.getListPermisoPeligro(this.permisosActivos[0].id_permiso)
                              .subscribe((resp:any) => {
                                this.listPermisoPeligro = resp.response; 
                                this.cargando = false;
                              })
  }
  deletePermisoPeligro(item:any)
  {
    this.sistemaGestionService.deletePermisoPeligro(item.permiso_peligro_id)
                            .subscribe((resp:any) => {
                              this.getListPermisoPeligro();
                            })
  }
  openModalPeligros()
  {
    this.modalPeligros = false;
    this.loadingInModal = true;
    this.getListCategorias();
  }
  closeModalPeligros()
  {
    this.modalPeligros = true;
    this.peligrosOculta = false;
    this.categoriaOculta = true;
  }

  getListCategorias()
  {
    this.peligrosService.listClasificacion()
                        .subscribe((resp:any) => {
                          this.listCategorias = resp.response;
                          this.loadingInModal = false;
                        })
  }
  getListPeligros(item:any)
  {
    this.categoriaOculta = false;
    this.loadingInModal = true;
    const data = {
      id_clasificacion:item.id_clasificacion,
      id_empresa: this.authService.usuario.id_empresa
    }

    this.peligrosService.listPeligros(data)
                          .subscribe((resp:any) => {
                            this.listPeligros = resp;
                            this.peligrosOculta = true;
                            this.loadingInModal = false;
                          })
    
  }
  
  modalAtrasPeligros()
  {
    this.categoriaOculta = true;
    this.peligrosOculta = false;
  }
  savePermisoPeligro(item:any)
  {
    const data = {
      usuario_id: this.authService.usuario.id,
      permiso_id: this.permisosActivos[0].id_permiso,
      peligro_id: item.id_peligro
    }
    this.sistemaGestionService.savePermisoPeligro(data)
                        .subscribe((resp) => {
                          this.getListPermisoPeligro();
                          this.closeModalPeligros();

                        })

  }


  

}
