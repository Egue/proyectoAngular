import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api'; 
import { PermisoService } from '../services/permiso.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { AuthService } from 'src/app/auth/auth.service';

export interface IValidate{
  preguntas:boolean,
  validate:boolean
}

@Component({
  selector: 'app-permiso-preguntas',
  templateUrl: './permiso-preguntas.component.html',
  styleUrls: ['./permiso-preguntas.component.css'],
  providers:[MessageService]
})
export class PermisoPreguntasComponent implements OnInit {

  listPreguntas:any[] = [];
  permiso:any ;

  permisoAptitud:any;
   
  
  display:boolean = true;

  constructor(private activatedRouter:ActivatedRoute , 
    private _messageService:MessageService , 
    private _permisoService:PermisoService, 
    private _errorHandleService:ErrorHandlingService , 
    private _router:Router , private _authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRouter.data.subscribe(({permiso})=>{
      this.permiso = permiso;

      this.find_by_permiso_aptitud();
    })
     
  }

  find_by_permiso_aptitud()
  {
    const data = {
      id_permiso : this.permiso.id_permiso,
      id_user : this._authService.usuario.id
    }
    this._permisoService.permisoAptitud(data).subscribe({
      next:(resp:any) =>{
        //console.log(resp)
        if(resp.response.count)
        {
            this.permisoAptitud = resp.response.permiso_aptitud;

            switch (resp.response.permiso_aptitud.estado) {
            case "CREATE":
              this.listPreguntas = resp.response.empleado_aptitud; 
              break;
            case "PENDING":
              this.display = false;
            break;
            case "APROVED":
              this._router.navigate(["/dashboard/permisoTrabajo" , this.permiso.id_permiso , "permiso" ])
              break;
            }
        }else{
          this.create_list_aptitud()

        }
         
        
      }
    })
  }

  create_list_aptitud()
  {
    const data = {
      id_permiso : this.permiso.id_permiso,
      id_user : this._authService.usuario.id
    }
    this._permisoService.create_list_aptitud(data).subscribe({
      next:(resp:any) => {

        setTimeout(() => {
          this.find_by_permiso_aptitud();
        }, 1000)

      }
    })
  }

  respuesta(item:any , respuesta:string)
  {
    

    const data = {
      id_empleado_aptitud : item.id_empleado_aptitud,
      respuesta : respuesta
    }
    //console.log(data)
    this._permisoService.updated_aptitud(data).subscribe({
      next:(resp:any)=> { 
        item.respuesta = respuesta;
      },
      error:(error) => {
        this._messageService.add({severity:'error' , summary:'Error de conexión' , detail:'Valide con el administrador'})
      }
    })
  }

  next()
  {
    var error:number = 0;
     for(let item of this.listPreguntas)
     {
      

        if(item.respuesta == null)
        {
          error +=  1;
          this._messageService.add({severity:'error' , summary:'Datos obligatorios' , detail:'Agregue una respuesta'})
          break;
        }
     }

     if(error == 0)
     {
       
         this._permisoService.preguntas_validate(this.permisoAptitud.id_permiso_aptitud).subscribe({
          next:(resp:any) => {            
            
            switch (resp.response) {
              case "PENDING":
                this.display = false;
                break;
            
              case "APROVED":
                this._router.navigate(["/dashboard/permisoTrabajo" , this.permiso.id_permiso , "permiso" ])
                break;
            }
            
          },
          error:(error)=> {
            //(console.log(this._errorHandleService.error));
          }
         })
     }
  }

   

}
