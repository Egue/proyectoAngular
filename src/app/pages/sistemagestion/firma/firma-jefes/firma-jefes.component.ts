import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { interval, map, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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

  public selectedPreoperacional:any;

  public infoPermiso:any;

  public token:String = '';

  public firmar: boolean = false;

  public intervalSusb: Subscription | undefined;

  public timeLeft: number = 120;

  public id_permiso: any;

  public selectedPeligro:number | undefined;
  

  constructor(private _activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,
    private _sistemaGestionService: SistemaGestionService) {
    const id = this._activatedRoute.data.subscribe(({ id }) => {
      this.id_permiso = id;
    })
  }

  ngOnInit(): void {
    this.getInfoForFirma();
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
    this.firmar = true;
    this.timeLeft = 120;
    const data = {
      id_user: this.authService.usuario.id,
      email: this.authService.usuario.email,
      user: this.authService.usuario.user,
      id_permiso: this.id_permiso,
      id_empresa: this.authService.usuario.id_empresa
    }
   this._sistemaGestionService.generateTokenFirma(data).subscribe((resp: any) => {



      //mensage
      this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: 'Correo enviado con éxito' });
      //intervalor 2 minutos
      this.intervalSusb = this.returnConteo().subscribe((valor) => {

        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.firmar = false;

          this.intervalSusb?.unsubscribe();
        }
      })
       
    }, error => {
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
    const data = {
      token : this.token,
      id_user : this.authService.usuario.id
    }
    console.log(data);
     this._sistemaGestionService.validarTokenMail(data).subscribe((resp:any) => {
      this.firmar = false;
        this.intervalSusb?.unsubscribe();
          setTimeout(() => {
            
             console.log('proceder a firmar');
          }, 2000);
    } , error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.error.response});
    }) 
  }


  /***informacion de permiso */
  getInfoForFirma()
  {
    this._sistemaGestionService.getInforForFirma(this.id_permiso).subscribe((resp:any) => {
      this.infoPermiso = resp.response[0];
      console.log(resp.response[0]);
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
}
