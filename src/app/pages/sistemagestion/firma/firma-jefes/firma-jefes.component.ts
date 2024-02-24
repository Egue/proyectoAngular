import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { interval, map, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';

@Component({
  selector: 'app-firma-jefes',
  templateUrl: './firma-jefes.component.html',
  styles: [
    `.selected-ul{
      background-color: yellow;
    }
    .hidden-ul {
      display: none;
    }
    `
  ],
  providers: [MessageService]
})
export class FirmaJefesComponent implements OnInit {
 

  public listFirmas:any[] =[];

  public selectedPreoperacional:any;

  public infoPermiso:any;

  public token:String = '';

  public firmar: boolean = false;

  public intervalSusb: Subscription | undefined;

  public timeLeft: number = 120;

  public id_permiso: any;

  public selectedPeligro:number | undefined;
  

  public step:any;

  public formToken = this.fb.group({
    token : ['' ,  [Validators.required , Validators.minLength(4)]]
  })
  constructor(private _activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,
    private _sistemaGestionService: SistemaGestionService , private fb:FormBuilder , private erroHandlerService:ErrorHandlingService) {
    const id = this._activatedRoute.data.subscribe(({ id }) => {
      this.id_permiso = id;
    })
  }

  ngOnInit(): void {
    this.getInfoForFirma();
    this.getListDetalleFirma();

    this.step = { step_1:true, step_2:false , step_3:false}
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSusb?.unsubscribe();
  }

  get timeLeftString() {
    const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    return `00:${minutes}:${seconds}`;
  }

  generateToken() {
    
    this.timeLeft = 120;
    const data = {
      id_user: this.authService.usuario.id,
      email: this.authService.usuario.email,
      user: this.authService.usuario.user,
      id_permiso: this.id_permiso,
      id_empresa: this.authService.usuario.id_empresa
    }
   this._sistemaGestionService.generateTokenFirma(data).subscribe(() => {

      //mensage
      this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Correo enviado con éxito' });
      //intervalor 2 minutos
      this.intervalSusb = this.returnConteo().subscribe(() => {

        this.timeLeft--;
        if (this.timeLeft === 0) {
           this.intervalSusb?.unsubscribe();
           this.step.step_2  = false;
           this.step.step_1 = true;
        }
            })
       
    }, error => {
      this.step.step_2  = false;
      this.step.step_1 = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error generando token' });
    })

  }

  returnConteo(): Observable<number> {
    return interval(1000).pipe(
      take(120),
      map(valor => { return valor + 1 }))
  }

  /***validacion de token enviado a corre electrónico */
  validarToken()
  {
    if(this.formToken.valid)
    {
      const data = {
        token : this.formToken.get("token")?.value,
        id_user : this.authService.usuario.id
      }
      //console.log(data);
      this._sistemaGestionService.validarTokenMail(data).subscribe(() => {
         
          this.intervalSusb?.unsubscribe();

             //firmar Permiso
             this.firmarJefe();

      } , error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: this.erroHandlerService.error.error.response});
      }) 
    }
  }

  firmarJefe()
  {
    const data = {
      id_permiso : this.id_permiso,
      id_user : this.authService.usuario.id
    }

   this._sistemaGestionService.firmarPermisoJefes(data).subscribe(() => {
      this.getListDetalleFirma();
            this.step.step_1 = false;
            this.step.step_2 = false;
            this.step.step_3 = true;
            
            setTimeout(() => {
              this.step.step_1 = true;
              this.step.step_2 = false;
              this.step.step_3 = false;

            } , 2000)
            
    }, (error) => {
      this.step.step_1 = true;
      this.step.step_2 = false;
      this.step.step_3 = false;
       
      this.messageService.add({severity:'error', summary: 'Error', detail: this.erroHandlerService.error.error.response});
    }) 

  }


  /***informacion de permiso */
  getInfoForFirma()
  {
    this._sistemaGestionService.getInforForFirma(this.id_permiso).subscribe((resp:any) => {
      this.infoPermiso = resp.response[0]; 
       
    })
  }
 

  //**/desplegar item peligros */
  selectedOptionPeligro(index:number)
  {
    this.selectedPeligro = index;
  }


  /*********** */
  verPreoperacional(index:any)
  {
      this.selectedPreoperacional = index;
      //console.log(this._selectedPreoperacional);
  }

  back() {
     window.history.back();
    }

  actualizar() {
     this.getInfoForFirma();
     this.getListDetalleFirma();
    }


    getListDetalleFirma()
    {
      this._sistemaGestionService.getListDetalleFirma(this.id_permiso).subscribe((resp:any) => {
        //console.log(resp.response);
        this.listFirmas = resp.response;
        this.listFirmas.forEach(element => {
          element.url_img = `https://apps.internetinalambrico.com.co/Files/profile/${element.url_img}`
        })
        
      })
    }

    createDetalleFirmaEmpresa()
    {
      const data = {
        id_empresa : this.authService.usuario.id_empresa,
        id_permiso : this.id_permiso
      }
      this._sistemaGestionService.createDetalleFirmaEmpresa(data).subscribe(() => {
        this.getListDetalleFirma();
      })
    }


    beningFirmar(item: any) {
        if(item.id_user != this.authService.usuario.id)
        {
          this.messageService.add({severity:'warn' , summary:'Firma' , detail:'no puedes firmar este permiso'})
        }else{
          
          this.step.step_1 = false;
          this.step.step_2 = true;

          this.generateToken();
        }
      }
      
}
