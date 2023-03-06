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

  inactive(id:any)
  {
    return this.http.delete(`${url_base}seguridad/permiso/inactive/${id}` , this.headers);
  }

  cerrado(id:any)
  {
    return this.http.delete(`${url_base}seguridad/permiso/cerrado/${id}` , this.headers);
  }

  findById(id:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findById/${id}` , this.headers);
  }
 
  
 
}
