import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SGEmpleado } from '../models/sgEmpleado.model';
import {map } from 'rxjs/operators'
import { SGPermisoEmpleado } from '../models/sgPermisoEmpleado';
import { SGPermisoActivo } from '../models/sgPermisoActivo.model'; 
//const url_base = environment.base_url;
const url_base = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class SistemaGestionService {

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

  generalidadesDisct(usuario:any)
  {
    const url = `${url_base}seguridad/generalidades/disct/${usuario}`;

    return this.http.get(url , this.headers);
  }
  generalidadesFindByTipo(tipo:any)
  {

    const url = `${url_base}seguridad/generalidades/findByTipo`;

    return this.http.post(url , tipo , this.headers);
  }
  generalidadesSave(data:any)
  {
    return this.http.post(`${url_base}seguridad/generalidades/save` , data , this.headers);
  }

  savePermiso(data:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.post(`${url_base}seguridad/permiso/save` , data ,this.headers);
  }

  getListPermisoOpen(id:any)
  {
    //const  url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.get<any>(`${url_base}seguridad/permiso/findByUsuarioOpen/${id}` , this.headers)
                .pipe(
                  map( resp => {
                    const sgPermisoOpen = resp.response.map(
                      (pOpen: { id_permiso: string; fecha_inicio: string; hora_inicio: string; fecha_cierre: string; hora_cierre: string; lugar_de_trabajo: string; estado: string; prefijo: string; indicativo: number; id_usuario: number; id_empresa: number; id_permiso_trabajo: number; created_at: string; updated_at: string; }) => new SGPermisoActivo(pOpen.id_permiso , pOpen.fecha_inicio , pOpen.hora_inicio , pOpen.fecha_cierre , pOpen.hora_cierre,
                        pOpen.lugar_de_trabajo , pOpen.estado , pOpen.prefijo , pOpen.indicativo , pOpen.id_usuario , pOpen.id_empresa , pOpen.id_permiso_trabajo,pOpen.created_at, pOpen.updated_at  )
                    );
                        return sgPermisoOpen;
                  })
                )
  }

  getListTipoTrabajo(id:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.get(`${url_base}seguridad/tipoTrabajo/${id}` , this.headers);
  }

  getListEmpleados(id:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.get<any>(`${url_base}usuarios/findByIdempresa/${id}` , this.headers)
    .pipe(
      map( resp => {
        const sgEmpleado = resp.response.map(
          (empleado: { id: string; user: string; email: string; id_empresa:string; }) => new SGEmpleado(empleado.id, empleado.user, empleado.email , empleado.id_empresa)
        );
        return sgEmpleado;
      }

      )
    )
  }

  getListPermisoEmpleado(idpermiso:any)
  {  
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.get<any>(`${url_base}seguridad/permisosEmpleados/list/${idpermiso}` , this.headers)
        .pipe(
          map( resp => {
            const permisoEmpleado = resp.response.map(
              (peSel: { id_permisos_empleado: string; user: string; email: string; }) => new SGPermisoEmpleado(peSel.id_permisos_empleado , peSel.user, peSel.email)
            );
            return permisoEmpleado;
          })
        )
  }
  deletePermisoEmpleado(id_permiso_empleado:any)
  {
   // const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.delete(`${url_base}seguridad/permisosEmpleados/deleteById/${id_permiso_empleado}` , this.headers);
  }

  savePermisoEmpleado(empleado:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.post(`${url_base}seguridad/permisosEmpleados/save` , empleado , this.headers);
  }

  getInfoPermisoEmpleado(idEmpleado:any)
  {
    return this.http.get(`${url_base}seguridad/permisosEmpleados/findByEmpleado/${idEmpleado}` , this.headers);
  }

  /* 
  *crea de la tabla generalidades los item filtrados epp, epcc , etc en la tabla empleadogeneralidades
  */
  createEmpleadoGeneralidades(data:any)
  {
    return this.http.post(`${url_base}seguridad/empleadoGeneralidades/create` , data , this.headers);
  }
  /**
   * enpoint post trae informa de los empleados generalidades filtrado por el tipo epp, epcc
   */
  getEmpleadoGeneralidadesFilterType(data:any)
  { 
    return this.http.post(`${url_base}seguridad/empleadoGeneralidades/findByEmpleadoAndPermisoAndTipo` , data , this.headers);
  }
 /**
  *  edita el estado active de empleadogeneralidades
  */
  editEmpleadoGeneralidades(data:any)
  {
    return this.http.patch(`${url_base}seguridad/empleadoGeneralidades/editActive/${data.empleado_generalidades_id}` , data , this.headers);
  }
  /***
   * ENDPOINT POST Firmar electronicamente el permiso de trabajo
   */
  firmarElectronicamente(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosEmpleados/firmarEmpleado`, data , this.headers);
  }

  /**
   * configurar empresas
   */
  getlistEmpresa()
  {
    return this.http.get(`${url_base}seguridad/empresa/list` , this.headers);
  }

  updatedEmpresa(empresa:any)
  { 
    return this.http.patch(`${url_base}seguridad/empresa/updated/${empresa.id_empresa}` , empresa , this.headers);
  }

  /**Toke  */
  generateTokenFirma(data:any)
  {
    return this.http.post(`${url_base}seguridad/sendMail/tokenFirma` , data , this.headers);
  }
  validarTokenMail(data:any)
  {

    return this.http.post(`${url_base}seguridad/tokenFirma/validate` , data , this.headers);
  }

  getVehiculosFindByIdusuario(id_usuario:any)
  {
    return this.http.get(`${url_base}seguridad/vehiculo/listFindByIdUsuario/${id_usuario}` , this.headers);
  }

  /***
   * Peligros en el permiso de trabajo
   */
  getListPermisoPeligro(id_permiso:any)
  {
    return this.http.get(`${url_base}seguridad/permisosPeligros/listByPermiso/${id_permiso}` , this.headers);
  }
  deletePermisoPeligro(id_permiso_peligro:any)
  {
    return this.http.delete(`${url_base}seguridad/permisosPeligros/delete/${id_permiso_peligro}` , this.headers);
  }

  savePermisoPeligro(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosPeligros/save` , data , this.headers);
  }

  permisoTrabajoFindById(id:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findById/${id}` , this.headers);
  }
}
