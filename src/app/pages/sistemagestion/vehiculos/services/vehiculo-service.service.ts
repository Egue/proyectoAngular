import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '../../common/select-models';
import {map , tap} from 'rxjs/operators';
import { VehiculoQuery } from 'src/app/components/moto-svg/vehiculoQuery.model';
//const url_base = environment.base_url;
const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class VehiculoServiceService {

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

  vehiculoList(id_empresa: number)
  {
    return this.http.get(`${url_base}seguridad/vehiculo/listFindByEmpresa/${id_empresa}` , this.headers);
  }

  save(vehiculo:any)
  {
    return this.http.post(`${url_base}seguridad/vehiculo/save` , vehiculo , this.headers);
  }

  updated(vehiculo:any)
  {
     
    return this.http.patch(`${url_base}seguridad/vehiculo/updated/${vehiculo.vehiculo_id}` , vehiculo , this.headers);
  }

  delete(id_vehiculo:any)
  {
    return this.http.delete(`${url_base}seguridad/vehiculo/delete/${id_vehiculo}` , this.headers);
  }

  findById(id:any)
  {
    return this.http.get(`${url_base}seguridad/vehiculo/findById/${id}` , this.headers);
  }

  usuarioSelect(id:number)
  {
    return this.http.get(`${url_base}usuarios/findByIdempresa/${id}` , this.headers)
              .pipe(
                map( (resp:any) => {
                  const usuarios = resp.response.map(
                    (usuario: { id: string | null | undefined; user: string | null | undefined; })  => new Select(usuario.id , usuario.user));

                    return usuarios;
                })
              )
  }

  listDocumentoTipo(data:any)
  {
      return this.http.post(`${url_base}seguridad/documento/findByTipo` , data , this.headers);
  }

  findByEmpresaAndPlaca(data:any)
  {
    return this.http.post<any>(`${url_base}seguridad/vehiculo/findByEmpresaAndPlaca` , data ,  this.headers)
    .pipe(
       map(resp => {
          const vehiculos = resp.response.map(
            (vehiculo: {
              id_empresa?: string;
              vehiculo_color?: string;
              vehiculo_cilindraje?: string; 
              vehiculo_id?: string; 
              vehiculo_placa?: string; 
              vehiculo_tipo?: string; 
          }) => 
            new VehiculoQuery(vehiculo.vehiculo_id ,vehiculo.vehiculo_tipo ,vehiculo.id_empresa  , vehiculo.vehiculo_placa , (vehiculo.vehiculo_placa+' | '+vehiculo.vehiculo_tipo+' | '+vehiculo.vehiculo_cilindraje+' cc | '+vehiculo.vehiculo_color))
          );

          return vehiculos;
       })
    );
  }

  disctGeneralidades(item:any)
  {
    return this.http.get(`${url_base}seguridad/vehiculoGeneralidades/disctItem/${item}` , this.headers);
  }

  findByNameGeneralidadesVehiculos(item:any)
  {
    return this.http.post(`${url_base}seguridad/vehiculoGeneralidades/findByNameGeneralidadesVehiculos` , item , this.headers);
  }

  editVehiculoGeneralides(item:any)
  {
    return this.http.patch(`${url_base}seguridad/vehiculoGeneralidades/editInspeccion/${item.vehiculo_generalidades_id}` , item , this.headers);
  }

  deletePermisosVehiculos(item:any)
  {
    return this.http.delete(`${url_base}seguridad/permisosVehiculos/delete/${item.permiso_vehiculo_id}` , this.headers);
  }

 

   
}
