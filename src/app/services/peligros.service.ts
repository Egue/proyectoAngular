import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Peligro } from '../models/peligro.model';
import { CargarPeligros } from '../interfaces/cargar-peligros.interface';

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

  listPeligros(data:any)
  {
    const url = `${base_url}/seguridad/peligro/list`;

    return this.http.post<CargarPeligros>(url , data , this.headers)
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
     
    const url = `${base_url}/seguridad/peligro/save`;
   return this.http.post(url , peligro , this.headers);
  }

  deletePeligro(peligro:Peligro)
  {

    const url = `${base_url}/seguridad/peligro/deleteById/${peligro.id_peligro}`;

    return this.http.delete(url , this.headers);
  }


  listControles(idpeligro:any)
  {
    const url = `${base_url}/seguridad/controles/findByPeligro/${idpeligro}`;

    return this.http.get(url, this.headers);
  }

  saveControl(control:any)
  {
    const url = `${base_url}/seguridad/controles/save`; 
    
    return this.http.post(url , control, this.headers);
  }

  deleteControl(id_control:any)
  {
    const url = `${base_url}/seguridad/controles/deleteById/${id_control}`;
    
    return this.http.delete(url , this.headers);
  }
}
