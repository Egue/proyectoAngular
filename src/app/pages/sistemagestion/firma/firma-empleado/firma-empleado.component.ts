import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuariosService} from '../../../../services/usuarios.service';

import {Message, MessageService} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { PermisoService } from '../../permisos/services/permiso.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { interval, map, Observable, Subscription, take } from 'rxjs';
@Component({
  selector: 'app-firma-empleado',
  templateUrl: './firma-empleado.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class FirmaEmpleadoComponent implements OnInit {

  public token?:string;

  public generateToken:boolean = false;

  public conteo:any = "Generar Token";

  public timeLeft:number = 120;
  public intervalSusb:Subscription | undefined;
///
public list:any[] = [];

public buttonFirma:boolean =  false;

  private _firma:any = {
    public_key:null,
    private_key:null
  };
  private _idPermiso:any;
  private _permiso:any;

  public sinFirma:boolean = false;
  public msgs:Message[] = [];
  constructor(private _authService:AuthService , 
    private _usuariosService:UsuariosService ,
     private _route:ActivatedRoute ,
     private _permisoService:PermisoService,
     private _sistemaGestionService:SistemaGestionService ,
     private messageService:MessageService) {
        this._idPermiso = this._route.snapshot.params["id"];
        //console.log(this._idPermiso);
     }

  ngOnInit(): void {
    this.getListFirma();
    this.getPermiso();
    this.getListElementos('EPP');
    this.getListElementos('EPCC');
    this.getListElementos('Herramientas');
    this.getPermisoEmpleado();
  }
  
  set firma(value:any)
  {
    this._firma = value
  }

  get firma()
  {
    return this._firma;
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
  getListFirma()
  {
    this._usuariosService.findKeyById(this._authService.usuario).subscribe((resp:any) => {
          this.firma = resp.response[0];
          if(!this.firma.public_key)
          {
            this.sinFirma = true; 
            this.msgs=[
              {severity:'error', summary:'Error', detail:`No se encontrato firma,  dirijase a su perfil y cree su firma digital`}
            ]
          }
    })
  }

  getPermiso()
  {
      this._permisoService.findById(this._idPermiso).subscribe((resp:any) => {
        this.permiso = resp.response[0];
        console.log(resp.response);
      })
  }

  getListElementos(tipo:any)
  {
    const data = {
      empleado_id : this._authService.usuario.id,
			permiso_id : this._idPermiso,
			tipo   : tipo
    }
    let listrenor =[];
    this._sistemaGestionService.getEmpleadoGeneralidadesFilterTypeIsNotNull(data).subscribe((resp:any) => {
      if(tipo === 'EPP')
      {
        listrenor = resp.response;
         listrenor.forEach((element: { nombre: any; inspeccion: any; }) => {
                    this.list.push({nombre: element.nombre , inspeccion: element.inspeccion})
         });
      }else if(tipo === 'EPCC')
      {
        listrenor = resp.response;
         listrenor.forEach((element: { nombre: any; inspeccion: any; }) => {
                    this.list.push({nombre: element.nombre , inspeccion: element.inspeccion})
         });
      }else if(tipo ==='Herramientas')
      {
        listrenor = resp.response;
         listrenor.forEach((element: { nombre: any; inspeccion: any; }) => {
                    this.list.push({nombre: element.nombre , inspeccion: element.inspeccion})
         });
      }
      
    })
  }

  getPermisoEmpleado()
  {
    const data = {
      id_permiso : this._idPermiso,
      id_user : this._authService.usuario.id
    }
    this._sistemaGestionService.getfirmaFindByIdPermisoAndIdUser(data).subscribe((resp:any) => {
      
      if(resp.response[0].firma === null && this.sinFirma != true)
      {
        this.buttonFirma = true;

      }
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
    this._sistemaGestionService.generateTokenFirma(data).subscribe((resp:any) => {
        this.generateToken = true; 


        //mensage
          this.messageService.add({severity:'success' ,summary:'Confirmación' , detail:'Correo enviado con éxito' });
          /**intervalor 2 minutos */
          this.intervalSusb = this.returnConteo().subscribe((valor) => {
            
             this.timeLeft--;
          })
          //
    } , error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error enviando token'});
    })
  }

  validarToken()
  {
    const data = {
      token : this.token,
      id_user : this._authService.usuario.id
    }
    this._sistemaGestionService.validarTokenMail(data).subscribe((resp:any) => {
        this.intervalSusb?.unsubscribe();
          setTimeout(() => {
            
              this.firmarElectronicamente();
          }, 2000);
    } , error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.error.response});
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
      this.getPermisoEmpleado();
    } , error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.error.response});
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

}
