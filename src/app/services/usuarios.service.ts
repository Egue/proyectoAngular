import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map , catchError , tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  register(user:RegisterForm){
    
    return this.http.post(`${base_url}/auth/register` , user);

  }

  List():Observable<any>{
    const token = localStorage.getItem('jwt') || '';
     return this.http.get(`${base_url}/usuarios/list` , {
       headers:{
         'Authorization' : 'Bearer '+ token
       }       
     })
     .pipe(
       tap ( resp => console.log(resp))
      // map(resp => true ), //si se tiene una respuesta retorna true
      // catchError(error => of(false))//captura error y devuelve observable false
     );
  }
}
