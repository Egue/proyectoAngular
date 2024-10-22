import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PermisoService } from '../services/permiso.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  public permiso:any;

  public preguntas:any;

  public selectedItem:any;

  public title:string = "";

  public display:boolean = false;

  public observacion:string = "";

  constructor(private _activatedRouter:ActivatedRoute , private _authService:AuthService , private _permisoService:PermisoService , private _route:Router) { }
  ngOnInit(): void {
    this._activatedRouter.data.subscribe(({permiso})=>{
      this.permiso = permiso;
      this.find_by_permiso_aptitud();
    })
  }

  find_by_permiso_aptitud()
  {
    const data = {
      id_permiso : this.permiso,
      id_user : this._authService.usuario.id

    }

    this._permisoService.permisoAptitud(data).subscribe({
      next:(resp:any) => {
      //console.log(resp)
      this.preguntas = resp.response;
    },
    error:(error) => {
      //console.log(error)
    }
  })
  }

  respuesta(item:any , resp:any)
  {
    item.respuesta = resp
  }

  openDialog(item:any , title:string)
  {
    this.selectedItem = item;
    this.title = title;
    this.observacion = item.Observacion || '';
    this.display = true
  }

  addObservacion()
  {
    if(this.selectedItem)
    {
      this.selectedItem.Observacion = this.observacion;
      this.display = false;
    }
  }

  validar()
  {
    this._permisoService.updated_permiso_aptitud(this.preguntas).subscribe({
      next:(resp:any)=>{
          this._route.navigate(["dashboard/permisoTrabajo" , this.permiso , "permiso"]);
      }
    })
  }

}
