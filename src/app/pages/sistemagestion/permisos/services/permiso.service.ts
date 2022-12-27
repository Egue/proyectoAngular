import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

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

  findByIdEmpresa(empresa:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findByIdEmpresa/${empresa}` , this.headers);
  }

  findByIdUsuarioActive(usuario:any){
    return this.http.get(`${url_base}seguridad/permiso/findByIdUsuarioActive/${usuario}` , this.headers);
  }
 
  
 
}
