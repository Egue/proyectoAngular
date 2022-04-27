import { CargarUsuarios } from './../interfaces/cargar-usuarios.interface';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map , catchError , tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  register(user:RegisterForm){
    
    return this.http.post(`${base_url}/auth/register` , user);

  }

  List(desde:number = 0){
    const token = localStorage.getItem('jwt') || '';
    const url = `${base_url}/usuarios/list/${desde}`;
     return this.http.get<CargarUsuarios>( url , {
       headers:{
         'Authorization' : 'Bearer '+ token
       }       
     })
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
}
