import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Peligro } from '../models/peligro.model';
import { CargarPeligros } from '../interfaces/cargar-peligros.interface';

const url_base = environment.base_url;
//const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class PeligrosService {

  constructor(private http:HttpClient) {}
 

  listClasificacion()
  {
    const url = `${url_base}seguridad/clasificacion/list`;
    return this.http.get(url );
  }

  saveClasificacion(clasificacion:any)
  {
    const url = `${url_base}seguridad/clasificacion/save`;

    return this.http.post(url ,  clasificacion );
  }

  listPeligros(data:any)
  {
    const url = `${url_base}seguridad/peligro/list`;

    return this.http.post<CargarPeligros>(url , data )
    .pipe(
      map( resp => {
        const peligro = resp.response.map(
            peli  => new Peligro (
              peli.id_peligro , peli.nombre, peli.consecuencias, peli.id_empresa , peli.id_clasificacion,
              peli.nombreClasificacion
            ));
          return resp.response;
      })
    );
  }
  savePeligro(peligro:Peligro)
  {
     
    const url = `${url_base}seguridad/peligro/save`;
   return this.http.post(url , peligro );
  }

  deletePeligro(peligro:Peligro)
  {

    const url = `${url_base}seguridad/peligro/deleteById/${peligro.id_peligro}`;

    return this.http.delete(url );
  }


  listControles(idpeligro:any)
  {
    const url = `${url_base}seguridad/controles/findByPeligro/${idpeligro}`;

    return this.http.get(url);
  }

  saveControl(control:any)
  {
    const url = `${url_base}seguridad/controles/save`; 
    
    return this.http.post(url , control);
  }

  deleteControl(id_control:any)
  {
    const url = `${url_base}seguridad/controles/deleteById/${id_control}`;
    
    return this.http.delete(url );
  }
}
