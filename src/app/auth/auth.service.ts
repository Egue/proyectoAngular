import { Usuario } from 'src/app/models/usuario.model';
import { Login } from './../interfaces/login.interface';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap  ,map , catchError, timeout} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//const base_url = environment.base_url;
const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario!: Usuario;

  constructor(private http:HttpClient,
              private router:Router) { }


  get token(){
    const token = localStorage.getItem('jwt') || '';

    return token;
  }

  get tokenRecovery()
  {
    const token = localStorage.getItem('recor') || '';

    return token;
  }

  get header(){
    return {
      headers:{
        'Authorization' : 'Bearer '+ this.token
      }
    }
  }

  get headerRecovery()
  {
    return {
      headers: {
        'Authorization': 'Bearer '+ this.tokenRecovery
      }
    }
  }
  validateToken():Observable<boolean>{
    //const url = `${base_url}/auth/validate/${this.token}`;
      //const url = '/repositories/backend_jwt_3_slim/public/';
     return this.http.get( `${base_url}auth/validate/${this.token}` , this.header)
     .pipe(
      tap(
        (resp:any) => {
          const { id, user, marca, active, email, url_img, role,created_at,updated_at,id_empresa} = resp.usuario[0];
                        this.usuario = new Usuario(user, email,'',id,marca,active,url_img,role,created_at,updated_at, id_empresa)
                        localStorage.setItem('jwt' , resp.response);
                        localStorage.setItem('abc' , JSON.stringify(resp.menu));
        }
      ),
       map(resp => true 
        ), //si se tiene una respuesta retorna true
       catchError(error => of(false))//captura error y devuelve observable false
       
     );
  }

  crear(formData:RegisterForm){
    return this.http.post(`${base_url}/auth/register` , formData)
  }


  login(formData:Login){
    
    const url = `${base_url}auth/login`;

    //const url = `/repositories/backend_jwt_3_slim/public/auth/login`;
    
    return this.http.post(url , formData)
                    .pipe(
                      tap( (resp:any) => {
                        const { id, user, marca, active, email, url_img, role,created_at,updated_at,id_empresa} = resp.usuario[0];
                        this.usuario = new Usuario(user, email,'',id,marca,active,url_img,role,created_at,updated_at,id_empresa)
                        localStorage.setItem('jwt' , resp.response);
                        localStorage.setItem('abc' , JSON.stringify(resp.menu));
                        //sessionStorage.setItem('user' , user);
                        //sessionStorage.setItem('img' , url_img);
                        //sessionStorage.setItem('mail' , email);
                      })
                    );
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }

  recovery(data:any)
  {
    return this.http.post(`${base_url}auth/recovery` , data).pipe(
      tap( (resp:any) => {
        localStorage.setItem('recor' , resp.response);
      })
    );
  }

  validateTokenRecovey(data:any)
  { 
    return this.http.post(`${base_url}auth/recoveryT/tokevalidate` , data , this.headerRecovery);
  }

  passwordNew(data:any)
  {
    return this.http.post(`${base_url}auth/recoveryP/newPassword` , data , this.headerRecovery);
  }
}
