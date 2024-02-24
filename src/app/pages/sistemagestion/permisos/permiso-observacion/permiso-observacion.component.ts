import { Component,  ElementRef,  OnInit,     } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PermisoService } from '../services/permiso.service';
import { DatePipe } from '@angular/common';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-permiso-observacion',
  templateUrl: './permiso-observacion.component.html',
  styles: [
  ]
})
export class PermisoObservacionComponent implements OnInit {




   

  public text:any = "";

  private _idPermiso:any;

  private pipe:DatePipe = new DatePipe('en-US');

  public listObservaciones:any[] = [];

  public error:any = "";
 

  constructor( 
    private authService:AuthService , private activateRoute:ActivatedRoute , private permisoService:PermisoService , private errorHandlingService:ErrorHandlingService) { }

  ngOnInit(): void {
      this.activateRoute.data.subscribe(({observacion}) => {
        this._idPermiso = observacion
      })

      this.getObservaciones();
  }


  validar()
  {
    if(this.text)
    {
      const obs = {
        observacion : this.text,
        id_usuario : this.authService.usuario.id,
        id_permiso: this._idPermiso
      }
      this.permisoService.observacionSave(obs).subscribe((resp:any) => {
        this.text = "";
        this.getObservaciones();
      })
    }
  }

  getObservaciones()
  {
    this.permisoService.observacionFind(this._idPermiso).subscribe((resp:any) => {
     

      this.listObservaciones = resp.response;

      this.listObservaciones.forEach(element => {
        element.created_at = this.pipe.transform(element.created_at , 'yyyy-MM-dd H:mm:ss');

      })

      
 
    })
  }


  onBasicUploadAuto(file:File , form:any) {
           
      form.clear();
      const data = {
        id_permiso : this._idPermiso,
        id_usuario : this.authService.usuario.id
      }
      this.permisoService.observacionImage(data ,file  ).subscribe((resp:any) => {
        this.getObservaciones();
      }, error => {
          //console.log(this.errorHandlingService.error.error.response)
      })
    }

  url(item:any):string
  {
    return `https://internetinalambrico.com.co/apps/Files/permisos/${item.id_permiso}/${item.url_img}`
  }

  class(item:any):string
  {
    if(item.observacion == null)
    {
      return `timeline-inverted`;
    }
    return "";
  }

  img(item:any):string
  {
    return `https://apps.internetinalambrico.com.co/Files/profile/${item.photo}`
  }

 
  back() {
   window.history.back();
    }

    actualizar() {
      this.getObservaciones();
      }
}
