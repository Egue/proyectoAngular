import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  crear(formData:RegisterForm){
    return this.http.post(`${base_url}/auth/register` , formData)
  }
}
