import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PermisoService } from '../services/permiso.service';
import { DatePipe } from '@angular/common';
import { stream } from 'xlsx';

@Component({
  selector: 'app-permiso-observacion',
  templateUrl: './permiso-observacion.component.html',
  styles: [
  ]
})
export class PermisoObservacionComponent implements OnInit {

  @ViewChild('videElement') videoElement:ElementRef | undefined;
  @ViewChild('canvasElement') canvasElement:ElementRef | undefined;


  public text:any = "";

  private _idPermiso:any;

  private pipe:DatePipe = new DatePipe('en-US');

  public listObservaciones:any[] = [];



  constructor(private authService:AuthService , private activateRoute:ActivatedRoute , private permisoService:PermisoService) { }

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

      console.log(this.listObservaciones);
    })
  }


  tomarFoto()
  {
    const video = this.videoElement?.nativeElement;
    
    const canvas = this.canvasElement?.nativeElement;

    navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
      video.srcObject = stream
      video.play();

      const context = canvas.getContext('2d');
      context.drawImage(video , 0 , 0 , canvas.width , canvas.height);
    })
    .catch((error) => {
      console.log('Error al acceder a la cámara' , error)
    })
  }

}
