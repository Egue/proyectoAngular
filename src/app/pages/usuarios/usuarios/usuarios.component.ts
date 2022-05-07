import { AuthService } from './../../../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { IRole } from 'src/app/interfaces/role.interface';
import { Rol } from 'src/app/models/role.model';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent  implements OnInit  {
  public listUsuario:Usuario[] = [];
  public listUsuarioTemp:Usuario[] = [];
  public total:number = 0;
  public desde:number = 0;
  public cargando:boolean = true;
  public optionsRole: Rol[] | undefined;
 

  constructor(
    private usuarioService:UsuariosService,
    private authService: AuthService
    ) {
      
    this.cargarRoles();
    }
  ngOnInit(): void {
    this.cargarListUser(); 
  }

  cargarRoles()
  {
    this.usuarioService.findByRole()
    .subscribe((roles) => {
       this.optionsRole = roles; 
    })
  }
  cargarListUser()
  {
    this.cargando = true;
    this.usuarioService.List(this.desde).subscribe(
      ({total, usuarios}) => {
        
        this.total = total;
        this.listUsuario = usuarios;
        this.listUsuarioTemp = usuarios;
        this.cargando = false;
      } 
    )
  }



  
  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0;
    }else if(this.desde > this.total){
      this.desde -= valor;
    }

    this.cargarListUser();

  }

  findByName(letras:any){
    if(letras.length === 0)
    {
      this.listUsuario = this.listUsuarioTemp;
    }else{
    this.usuarioService.findByName(letras)
    .subscribe(
      (resp) => this.listUsuario = resp
    );
    }
  }

  deleteUsuario(usuario:Usuario)
  {
    if(usuario.id === this.authService.usuario.id)
    {
      return Swal.fire('Error' , 'No se puede borrar a si mismo' , 'error');
    }
    return Swal.fire({
      title: 'Eliminar Usuario?',
      text: `Quieres eliminar a ${usuario.user}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
    if(result.isConfirmed)
    {
    this.usuarioService.deleteById(usuario)
                        .subscribe((respon) => {
                          this.cargarListUser();
                          Swal.fire(
                            'Eliminado!',
                            `El usuario ${usuario.user} fue eliminado`,
                            'success'
                          )
                        }, (err) => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No puedes Eliminar el usuario. Error'
                          })
                        })
        }
    })
  
  }

  cambiarRole(user:Usuario)
  {
    this.usuarioService.updateUser(user)
    .subscribe();
  }

  changeActive(user:Usuario)
  {
    if(user.active === 1 )
    {
      user.active = 0;
    }else{
      user.active = 1
    } 
   this.usuarioService.updateUser(user)
   .subscribe();

    
  }

}
