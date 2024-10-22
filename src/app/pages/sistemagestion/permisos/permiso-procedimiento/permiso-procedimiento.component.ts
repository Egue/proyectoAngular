import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermisoService } from '../services/permiso.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-permiso-procedimiento',
  templateUrl: './permiso-procedimiento.component.html',
  styleUrls: ['./permiso-procedimiento.component.css'],
  providers:[MessageService]
})
export class PermisoProcedimientoComponent implements OnInit {

  public listProcedimientos:any[] =[];
  public listSelected:any[] = [];

  public id_permiso:any;

  constructor(private location:Location , private _activatedRoute:ActivatedRoute , private _permiso:PermisoService , 
    private _authService:AuthService , private _messageService:MessageService) {
    this._activatedRoute.data.subscribe(({procedimiento})=>{
      this.id_permiso = procedimiento;
    })
   }

  ngOnInit(): void {
    this.get_procedimientos();
    this.get_procedimientos_by_user_permiso();
  }

  back():void
  {
    this.location.back();
  }

  add(item:any){
    this.listSelected.push(item);
  }

  get_procedimientos()
  {
    this._permiso.search_procedimientos_generalidades().subscribe({
      next:(resp:any) => {
        this.listProcedimientos = resp.response;
      }
    })
  }

  get_procedimientos_by_user_permiso()
  {
    const data = {
      id_user  : this._authService.usuario.id,
      id_permiso : this.id_permiso,
    }

    this._permiso.get_procedimientos_by_user_permiso(data).subscribe({
      next:(resp:any)=>{
        this.listSelected = resp.response;
      }
    })
  }
  
  save(){
     
    const data = {
      id_user  : this._authService.usuario.id,
      id_permiso : this.id_permiso,
      procedimiento : this.listSelected
    }
    this._permiso.save_procedimientos(data).subscribe({
      next:() => {
        this._messageService.add({severity:'success' , summary:'Creado' , detail:'Creado con éxito'})
      }
    })
  }
 
  onRemove(item:any)
  {
    this.listSelected = this.listSelected.filter(proc => proc !== item);
  }

}
