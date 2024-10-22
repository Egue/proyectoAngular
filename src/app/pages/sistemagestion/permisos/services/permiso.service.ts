import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//const url_base = '/repositories/backend_jwt_3_slim/public/';
const url_base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http:HttpClient) { }

   

  findByIdEmpresa(empresa:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findByIdEmpresa/${empresa}` );
  }

  findByIdUsuarioActive(filter:any){

    return this.http.post(`${url_base}seguridad/permiso/findByIdUsuarioActive` , filter );
  }

  inactive(id:any)
  {
    return this.http.delete(`${url_base}seguridad/permiso/inactive/${id}` );
  }

   

  findById(id:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findById/${id}` );
  }
 

  //////////////////////////////////
  observacionSave(obsr : any)
  { 
      return this.http.post(`${url_base}seguridad/observacion/save` , obsr);
  }

  observacionFind(id:any)
  {
    return this.http.get(`${url_base}seguridad/observacion/${id}`);
  }

  observacionDelete(id:any)
  {
    return this.http.delete(`${url_base}seguridad/observacion/${id}`);
  }

  observacionImage(data:any , file:File)
  {
    const formData = new FormData();

    formData.append("id_permiso" , data.id_permiso);
    formData.append("id_usuario" , data.id_usuario);
    formData.append("img" , file);

    return this.http.post(`${url_base}seguridad/observacion/img` , formData);
  } 

  infoParaFirmarCreadorEmpleado(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosEmpleados/infoAdd`, data);
  }
  inforParaFirmaEmpleado(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosEmpleados/info`, data);
  }
  

  cerrarPermiso(id:any):Observable<any>
  {

    return this.http.delete(`${url_base}seguridad/permiso/cerrado/${id}`);
  }

  ///aptitud
  permisoAptitud(data:any):Observable<any>{

    const params = new HttpParams().set("id_user" , data.id_user).set("id_permiso" , data.id_permiso);

    return this.http.get(`${url_base}seguridad/preguntas/findbypermisoempleado` , {params:params})
  }

  updated_permiso_aptitud(data:any)
  {
    return this.http.post(`${url_base}seguridad/preguntas/updateaptitud` , data);
  }

  //procedimientos
  search_procedimientos_generalidades()
  {
    return this.http.get(`${url_base}seguridad/procedimiento/list`);
  }

  save_procedimientos(prodecimientos:any)
  {
    return this.http.post(`${url_base}seguridad/procedimiento` , prodecimientos);
  }

  get_procedimientos_by_user_permiso(data:any)
  {
    const params = new HttpParams().set("id_user" , data.id_user).set("id_permiso" , data.id_permiso);

    return this.http.get(`${url_base}seguridad/procedimiento` , {params:params});
  }


   
 
}
