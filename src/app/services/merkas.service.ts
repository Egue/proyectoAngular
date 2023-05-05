import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
//const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class MerkasService {

  constructor(private http:HttpClient) { }


  get token():string
  {
    return localStorage.getItem('jwt') || '';
  }

  get headers()
  {
    return { 
      headers: {'Authorization' : 'Bearer ' + this.token}
    }
  }

  getRecibosCaja(between:any)
  {
    const url = `${base_url}merkas/pagoscontrol`;

    return this.http.post(url , between , this.headers);
  }
}
