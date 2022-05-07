import { CargarUsuarios } from './../interfaces/cargar-usuarios.interface';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map , catchError , tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { IRole } from '../interfaces/role.interface';
import { Rol } from '../models/role.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 

  constructor(private http:HttpClient ) { }

  get token():string
  {
    return localStorage.getItem('jwt') || '';
  }
 

  register(user:RegisterForm){
    
    return this.http.post(`${base_url}/auth/register` , user);

  }

  get headers()
  {
    return { 
      headers: {'Authorization' : 'Bearer ' + this.token}
    }
  }
  private transformarUsuarios(resultado: any[]):Usuario[]
  {
    return resultado.map(
      user => new Usuario(user.user, user.email, '',user.id,user.marca,user.active,user.url_img,
      user.role,user.created_at,user.updated_at )
    )
    /*return resultado.map(
      /*user => new Usuario(
        user.user, user.email, '',user.id,user.marca,user.active,user.url_img,
        user.role,user.created_at,user.updated_at
      )*/
      //console.log(user)
    //)
  }

  List(desde:number = 0){
    const url = `${base_url}/usuarios/list/${desde}`;
     return this.http.get<CargarUsuarios>( url , this.headers)
     .pipe(
       map( resp => {
         const usuarios = resp.response.usuarios.map( 
           user => new Usuario(
           user.user, user.email, '',user.id,user.marca,user.active,user.url_img,
           user.role,user.created_at,user.updated_at
         ));
         return {
           total: resp.response.total,
           usuarios
         };
       }
        )
     );
  }
  findByName(letras:string = '')
  {
    const url = `${base_url}/usuarios/findByName/${letras}`;
    return this.http.get<any[]>(url , this.headers)
    .pipe(
        map( (resp:any) => {
          //console.log(resp.response)
          return this.transformarUsuarios(resp.response)
        })
    );
  }

  deleteById(usuario:Usuario)
  {
    const url = `${base_url}/usuarios/delete/${usuario.id}`;

    return this.http.delete(url , this.headers);
  }

  findByRole()
  {
    const url = `${base_url}/roles/list`;
    return this.http.get<IRole>(url, this.headers)
    .pipe(
      map( resp => {
        const roles = resp.response.roles.map(
          rol => new Rol(rol.role)
        );
        return roles
      })
    );
  }

  updateUser(user:Usuario)
  {
    
    return this.http.patch(`${base_url}/usuarios/edit/${user.id}` , user , this.headers);
  }


  
}
