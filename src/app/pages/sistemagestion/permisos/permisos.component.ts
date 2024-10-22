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
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisoService } from './services/permiso.service';
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            padding: 0 1em;
            overflow: visible;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    `],
})
export class PermisosComponent implements OnInit {
  //componente app-moto-svg 
  public lugarTrabajo:string = '';

  public  sinPermisos:boolean = false;

  public index:number = 0; //inicio del accordion 
  public cargando:boolean = false;

 

  public permisosActivos:SGPermisoActivo = {
    id_permiso: '',
    fecha_inicio: '',
    hora_inicio: '',
    fecha_cierre: '',
    hora_cierre: '',
    lugar_de_trabajo: '',
    estado: '',
    prefijo: '',
    indicativo: 0,
    id_usuario: 0,
    id_empresa: 0,
    id_permiso_trabajo: 0,
    created_at: '',
    updated_at: ''
  } ;
  
  public pipe:DatePipe = new DatePipe('en-US');
  
  public listEmpleadoPermiso:any[] = [];

  //tabla empleados
  public modalEmpleados:boolean = true;
  public loading:boolean = false;
  public first:number = 0;
  public rows:number = 10;
  public listEmpleados:any[] = [];
 
   
  

   //public items card
   public items:any[] = [];

  constructor(private fb:FormBuilder , 
    private sistemaGestionService:SistemaGestionService , 
    private authService:AuthService ,  
    private permisoService:PermisoService,
    private route:Router , 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
     this.activatedRoute.data.subscribe(({permiso}) => {
      if(permiso)
      {
        this.permisosActivos = permiso;
        this.validarQueinCreoPermiso(permiso.id_usuario);
      }
     })
    //this.getListPermisoOpen(); 
    
  }

  //consultarpermiso para realizar ajuste
  public validarQueinCreoPermiso(usuario:any)
  {
    if(this.authService.usuario.id === usuario)
    {
      this.items = [
        {label :'Integrantes' , icon:'pi pi-users' , url:'./assets/images/seguridad/add.png' , status:'true', link:'/dashboard/integrantes',idpermiso:this.permisosActivos.id_permiso , router:'add'},
        {label:'Peligros' , icon:'pi pi-bolt' , url:'./assets/images/seguridad/peligro.png', status:'true', link:'/dashboard/permisoPeligros',idpermiso:this.permisosActivos.id_permiso , router:'add'},
        {label:'Preoperacional' , icon:'pi pi-bookmark-fill' , url:'./assets/images/seguridad/preoperacionl.png', status:'false', link:'/dashboard/elementos-epp' , idpermiso:this.permisosActivos.id_permiso ,router:'add'},
        {label:'Inspección' , icon:'pi pi-check-circle' , url:'./assets/images/seguridad/inspeccion.png',status:'false', link:'/dashboard/permisoInspeccion', idpermiso:this.permisosActivos.id_permiso , router:'add'},
        {label:'Procedimientos' , url:'./assets/images/seguridad/engineering.png', status:false , link:'/dashboard/permisoTrabajo' , idpermiso:this.permisosActivos.id_permiso, router : 'procedimiento'},
        {label:'Firmar' , icon:'pi pi-pencil' , url:'./assets/images/seguridad/firma.png',status:'false', link:'/dashboard/firmas' , idpermiso:this.permisosActivos.id_permiso, router:'empleado'},
      ];
    }else{
      this.items = [
           {label:'Preoperacional' , icon:'pi pi-bookmark-fill' , url:'./assets/images/seguridad/preoperacionl.png', status:'false', link:'/dashboard/elementos-epp' , idpermiso:this.permisosActivos.id_permiso ,router:'add'},
        {label:'Procedimientos' , url:'./assets/images/seguridad/engineering.png', status:false , link:'/dashboard/permisoTrabajo' , idpermiso:this.permisosActivos.id_permiso, router : 'procedimiento'},
           {label:'firmar' , icon:'pi pi-pencil' , url:'./assets/images/seguridad/firma.png',status:'false', link:'/dashboard/firmas' , idpermiso:this.permisosActivos.id_permiso, router:'empleado'}
          ];
    }
  }
 
 
  getListPermisoOpen()
  {
    this.cargando = true;  
    this.sistemaGestionService.getListPermisoOpen(this.authService.usuario.id)
              .subscribe((resp) => { 
                  this.permisosActivos = resp;
                  this.cargando = false;
              })
  }

 
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
      "id_permiso_trabajo" : this.permisosActivos.id_permiso,
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
 
  
 
  


  handleClick(event:any){
    const url = `${event.link}/${event.idpermiso}/${event.router}`;
    //console.log(url);
    this.route.navigateByUrl(url);
  }


  

}
