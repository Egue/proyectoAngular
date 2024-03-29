import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SGEmpleado } from '../models/sgEmpleado.model';
import {map } from 'rxjs/operators'
import { SGPermisoEmpleado } from '../models/sgPermisoEmpleado';
import { SGPermisoActivo } from '../models/sgPermisoActivo.model'; 
import { Observable } from 'rxjs';
const url_base = environment.base_url;
//const url_base = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class SistemaGestionService {

  private headers = new HttpHeaders().set('X-Skip-Loading', 'true');
  private options = { headers: this.headers };

  constructor(private http:HttpClient) { }

 
  generalidadesDisct(usuario:any)
  {
    const url = `${url_base}seguridad/generalidades/disct/${usuario}`;

    return this.http.get(url );
  }
  generalidadesFindByTipo(tipo:any)
  {

    const url = `${url_base}seguridad/generalidades/findByTipo`;

    return this.http.post(url , tipo );
  }
  generalidadesSave(data:any)
  {
    return this.http.post(`${url_base}seguridad/generalidades/save` , data );
  }

  savePermiso(data:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.post(`${url_base}seguridad/permiso/save` , data  );
  }

  getListPermisoOpen(id:any)
  {
    //const  url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.get<any>(`${url_base}seguridad/permiso/findByUsuarioOpen/${id}` )
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

    return this.http.get(`${url_base}seguridad/tipoTrabajo/${id}` );
  }

  getListEmpleados(find:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';
     
    return this.http.post<any>(`${url_base}usuarios/find/name/empresa` , find , this.options)
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

    return this.http.get<any>(`${url_base}seguridad/permisosEmpleados/list/${idpermiso}` )
        .pipe(
          map( resp => {
            const permisoEmpleado = resp.response.map(
              (peSel: { id_permisos_empleado: string; user: string; email: string; firma:string ; id_user:string}) => new SGPermisoEmpleado(peSel.id_permisos_empleado , peSel.user, peSel.email , peSel.firma , peSel.id_user)
            );
            return permisoEmpleado;
          })
        )
  }
  deletePermisoEmpleado(id_permiso_empleado:any)
  {
   // const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.delete(`${url_base}seguridad/permisosEmpleados/deleteById/${id_permiso_empleado}` );
  }

  savePermisoEmpleado(empleado:any)
  {
    //const url = '/repositories/backend_jwt_3_slim/public/';

    return this.http.post(`${url_base}seguridad/permisosEmpleados/save` , empleado );
  }

  getInfoPermisoEmpleado(idEmpleado:any)
  {
    return this.http.get(`${url_base}seguridad/permisosEmpleados/findByEmpleado/${idEmpleado}` );
  }


  /* 
  *crea de la tabla generalidades los item filtrados epp, epcc , etc en la tabla empleadogeneralidades
  */
  createEmpleadoGeneralidades(data:any)
  {
    return this.http.post(`${url_base}seguridad/empleadoGeneralidades/create` , data );
  }
  /**
   * enpoint post trae informa de los empleados generalidades filtrado por el tipo epp, epcc
   */
  getEmpleadoGeneralidadesFilterType(data:any)
  { 
    return this.http.post(`${url_base}seguridad/empleadoGeneralidades/findByEmpleadoAndPermisoAndTipo` , data );
  }

  getEmpleadoGeneralidadesFilterTypeIsNotNull(data:any):Observable<any[]>
  {
    return this.http.post<any[]>(`${url_base}seguridad/empleadoGeneralidades/findByEmpleadoPermisoTrabajoIsNotNull` , data );
  }

  getfirmaFindByIdPermisoAndIdUser(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosEmpleados/findByIdPermisoAndIdUser`,data );
  }
 /**
  *  edita el estado active de empleadogeneralidades
  */
  editEmpleadoGeneralidades(data:any)
  {
    return this.http.patch(`${url_base}seguridad/empleadoGeneralidades/editActive/${data.empleado_generalidades_id}` , data );
  }
  /***
   * ENDPOINT POST Firmar electronicamente el permiso de trabajo
   */
  firmarElectronicamente(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosEmpleados/firmarEmpleado`, data );
  }

  getInforForFirma(idPermiso:number){
    return this.http.get(`${url_base}seguridad/permiso/final/${idPermiso}` );
  }

  //lista de empleados para firmar
  getListDetalleFirma(idPermiso:number)
  {
    return this.http.get(`${url_base}seguridad/detalle/firmas/${idPermiso}`);
  }

  createDetalleFirmaEmpresa(data:any)
  {
    return this.http.post(`${url_base}seguridad/detalle/firmas` , data);
  }

  /**
   * configurar empresas
   */
  getlistEmpresa()
  {
    return this.http.get(`${url_base}seguridad/empresa/list` );
  }

  updatedEmpresa(empresa:any)
  { 
    return this.http.patch(`${url_base}seguridad/empresa/updated/${empresa.id_empresa}` , empresa );
  }

  /**Toke  */
  generateTokenFirma(data:any)
  {
    return this.http.post(`${url_base}seguridad/sendMail/tokenFirma` , data );
  }
  validarTokenMail(data:any)
  {

    return this.http.post(`${url_base}seguridad/tokenFirma/validate` , data );
  }
  /**firma por parte de los jefes */
  firmarPermisoJefes(data:any)
  {
    return this.http.post(`${url_base}seguridad/detalle/firmar` , data);
  }

  getVehiculosFindByIdusuario(id_usuario:any)
  {
    return this.http.get(`${url_base}seguridad/vehiculo/listFindByIdUsuario/${id_usuario}` );
  }

  /***
   * Peligros en el permiso de trabajo
   */
  getListPermisoPeligro(id_permiso:any)
  {
    return this.http.get(`${url_base}seguridad/permisosPeligros/listByPermiso/${id_permiso}` );
  }
  deletePermisoPeligro(id_permiso_peligro:any)
  {
    return this.http.delete(`${url_base}seguridad/permisosPeligros/delete/${id_permiso_peligro}` );
  }

  savePermisoPeligro(data:any)
  {
    return this.http.post(`${url_base}seguridad/permisosPeligros/save` , data );
  }

  permisoTrabajoFindById(id:any)
  {
    return this.http.get(`${url_base}seguridad/permiso/findById/${id}` );
  }

  //generar pdf buscar empleados
  pdfEmpleados(id:any)
  {
    return this.http.get(`${url_base}pdf/permisosEmpleados/${id}` );
  }


  //firma empresa
  firmarPermisosSave(data:any)
  {
    return this.http.post(`${url_base}seguridad/firmas/save` , data );
  }

  firmasGetFindByEmpresa(id:any)
  {
    return this.http.get(`${url_base}seguridad/firmas/findByIdEmpresa/${id}` );
  }

  //////////////////////////////////////////////////////////////////////////////////////*///
  /**reportes 
   * 
   * 
   * 
   */
  reporte_tree_node(fecha:any)
  {
    return this.http.post(`${url_base}seguridad/reportes/treeNode` , fecha);
  }

  /**PDF GENERATE */
  generate_pdf_permiso(id:any)
  {
    return this.http.get(`${url_base}pdf/permiso/${id}` ,{ responseType: 'blob' });
  }

  generate_pdf_preoperacional(id:any)
  {
    return this.http.get(`${url_base}pdf/preoperacional/${id}` ,{ responseType: 'blob' });
  }

}
