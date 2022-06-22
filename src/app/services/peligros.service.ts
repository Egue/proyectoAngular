import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PeligrosService {

  constructor(private http:HttpClient) {}

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

  listClasificacion()
  {
    const url = `${base_url}/seguridad/clasificacion/list`;
    return this.http.get(url , this.headers);
  }

  saveClasificacion(clasificacion:any)
  {
    const url = `${base_url}/seguridad/clasificacion/save`;

    return this.http.post(url ,  clasificacion , this.headers);
  }
}
