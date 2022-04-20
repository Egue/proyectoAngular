import { Login } from './../interfaces/login.interface';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap  ,map , catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private router:Router) { }


  validateToken():Observable<boolean>{
    const token = localStorage.getItem('jwt') || '';
     return this.http.get(`${base_url}/auth/validate` , {
       headers:{
         'Authorization' : 'Bearer '+ token
       }       
     })
     .pipe(
       map(resp => true ), //si se tiene una respuesta retorna true
       catchError(error => of(false))//captura error y devuelve observable false
     );
  }

  crear(formData:RegisterForm){
    return this.http.post(`${base_url}/auth/register` , formData)
  }


  login(formData:Login){
    return this.http.post(`${base_url}/auth/login` , formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('jwt' , resp.response);
                      })
                    );
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
