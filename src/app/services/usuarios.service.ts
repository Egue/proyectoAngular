import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map , catchError , tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';
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
     return this.http.get<any>( url , {
       headers:{
         'Authorization' : 'Bearer '+ token
       }       
     })
     /*.pipe(
       tap ( resp => console.log(resp))
      // map(resp => true ), //si se tiene una respuesta retorna true
      // catchError(error => of(false))//captura error y devuelve observable false
     )*/;
  }
}
