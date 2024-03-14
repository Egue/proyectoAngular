import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//const url_base = '/repositories/backend_jwt_3_slim/public/';
const url_base = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PermisoVehiculoService {

  constructor(private http:HttpClient) { }
 

  findByPermiso(permiso:number)
  {
     
    return this.http.get<any>(`${url_base}seguridad/permisosVehiculos/findByPermiso/${permiso}` );
  }

  permisoVehiculoSave(permiso:any)
  {
    return this.http.post(`${url_base}seguridad/permisosVehiculos/save` , permiso );


  }
  

  getListEmpleadoActivePermiso(idPermiso:any)
  {
    return this.http.get(`${url_base}seguridad/permisosEmpleados/active/${idPermiso}`);
  }

  
  
 
}
