import { Login } from './../interfaces/login.interface';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


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
}
