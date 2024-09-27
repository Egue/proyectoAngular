import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuariosService} from '../../../../services/usuarios.service';

import {Message, MessageService} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { PermisoService } from '../../permisos/services/permiso.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { interval, map, Observable, Subscription, take } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
@Component({
  selector: 'app-firma-empleado',
  templateUrl: './firma-empleado.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class FirmaEmpleadoComponent implements OnInit {

 

  public timeLeft:number = 120;
  public intervalSusb:Subscription | undefined;
///
public infoPermiso:any;
 
   
  private _idPermiso:any;
  private _permiso:any;
 
  public msgs:Message[] = [];

  public item:any = "" ;

  public listFirmas:any[] =[];

  public form = this.fb.group({
    token : ['' , [Validators.required , Validators.maxLength(4)]]
  })

  constructor(public _authService:AuthService , 
    private _usuariosService:UsuariosService ,
     private _route:ActivatedRoute ,
     private _permisoService:PermisoService,
     private _sistemaGestionService:SistemaGestionService ,
     private messageService:MessageService ,
     private fb:FormBuilder , private errorHandlingService:ErrorHandlingService) {
        this._idPermiso = this._route.snapshot.params["id"];
        //console.log(this._idPermiso);
     }

  ngOnInit(): void { 
    this.getPermiso();
    this.getListEmpleadoPermiso();
    this.item = {step_1 : true ,step_2: false , step_3 : false}
  }
  getInfoParaFirma() {
    const data = {
      id_user : this._authService.usuario.id,
      id_permiso : this._idPermiso
    }
     if(this._authService.usuario.id == this.permiso.id_usuario)
     {
      this._permisoService.infoParaFirmarCreadorEmpleado(data).subscribe((resp:any) => {
          this.infoPermiso = resp.response;  
        //console.log(resp.response);
      } , () => {
        //console.log(this.errorHandlingService.error);
      })  
     }else{

       this._permisoService.inforParaFirmaEmpleado(data).subscribe((resp:any) => {
        this.infoPermiso = resp.response;  
          //console.log(resp.response);
      } , () => {
        //console.log(this.errorHandlingService.error);
      })  
     }
  }
  

  get permiso()
  {
    return this._permiso;
  }

  set permiso(value:any) 
  {
    this._permiso = value;
  }

  ///////////////////////////
   

  getPermiso()
  {
      this._permisoService.findById(this._idPermiso).subscribe((resp:any) => {
        this.permiso = resp.response[0]; 
        this.getInfoParaFirma();
      })
  }

  getListEmpleadoPermiso(){
    this._sistemaGestionService.getListPermisoEmpleado(this._idPermiso).subscribe((resp:any) => {
        this.listFirmas = resp;
    })
  }
 
   
  generarToken()
  {  
    this.timeLeft = 120;
    const data = {
        id_user : this._authService.usuario.id,
        email : this._authService.usuario.email,
        user  : this._authService.usuario.user, 
        id_permiso: this._idPermiso,
        id_empresa: this._authService.usuario.id_empresa
    }

    this._sistemaGestionService.generateTokenFirma(data).subscribe({
      next:(resp:any)=>{

        this.item.step_1 = false;
        this.item.step_2 = true;         
          this.messageService.add({severity:'success' ,summary:'Confirmación' , detail:'Correo enviado con éxito' });
          
          this.intervalSusb = this.returnConteo().subscribe((valor) => {
            
             this.timeLeft--;

             if (this.timeLeft === 0) {
              this.intervalSusb?.unsubscribe();
              this.item.step_2  = false;
              this.item.step_1 = true;
           }
          })
      },
      error:(error)=>{
        //console.log(error);
        //console.log(this.errorHandlingService.error);
        if(this.errorHandlingService.error.status === 422)
        {          
             this.displayErrores(this.errorHandlingService.error.error.response);
        }else{

          this.messageService.add({severity:'error', summary: 'Error', detail: this.errorHandlingService.error.error.response});

        }
        
      }
    })
  }

  displayErrores(data:any)
  {
    data.forEach((element:any) => {
        this.messageService.add({
          severity:'error',
          summary:'Datos Pendientes',
          detail: `${element.tipo} : ${element.value}`
        })
    });
  }

  validarToken()
  {
    const data = {
      token : this.form.get('token')?.value,
      id_user : this._authService.usuario.id
    }
    this._sistemaGestionService.validarTokenMail(data).subscribe((resp:any) => {
        this.intervalSusb?.unsubscribe();
           
            
              this.firmarElectronicamente();
           
    } , error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: this.errorHandlingService.error.error.response});
    })
  }

  firmarElectronicamente()
  {
    const data = {
      id_permiso:this._idPermiso,
      id_empleado : this._authService.usuario.id
    }
    this._sistemaGestionService.firmarElectronicamente(data).subscribe((resp:any) => {

      this.messageService.add({severity:'success' ,summary:'Confirmación' , detail: resp.response });

      this.getListEmpleadoPermiso();
      this.item.step_1 = false;
      this.item.step_2 = false;
      this.item.step_3 = true;

      setTimeout(() => {
        this.item.step_1 = true;
        this.item.step_2 = false;
        this.item.step_3 = false;
      }, 2000)
     
    } , error => {
      this.item.step_1 = true;
      this.item.step_2 = false;
      this.item.step_3 = false;
      this.messageService.add({severity:'error', summary: 'Error', detail: this.errorHandlingService.error.error.response});
    })
  }
/////////////////////////
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSusb?.unsubscribe();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  get timeLeftString() {
    const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    return `00:${minutes}:${seconds}`;
  }


  returnConteo():Observable<number>
  {
    return interval(1000).pipe(
      take(120),
      map(valor => {return valor + 1}))
  }

  back() {
    window.history.back();
    }


    actualizar() {
      this.getPermiso();
      this.getListEmpleadoPermiso();
      this.item = {step_1 : true ,step_2: false , step_3 : false}
      }

    beningFirmar(_t52: any) {


      this.generarToken();
      }
      

}
