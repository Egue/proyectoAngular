import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class PermisoVehiculoService {

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

  findByPermiso(permiso:number)
  {
     
    return this.http.get<any>(`${url_base}seguridad/permisosVehiculos/findByPermiso/${permiso}` , this.headers);
  }

  permisoVehiculoSave(permiso:any)
  {
    return this.http.post(`${url_base}seguridad/permisosVehiculos/save` , permiso , this.headers);
  }
  
 
}
