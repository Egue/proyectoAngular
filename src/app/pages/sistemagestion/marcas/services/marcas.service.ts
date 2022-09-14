import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '../../common/select-models';
import {map} from 'rxjs/operators';
//const url_base = environment.base_url;
 
const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

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

  getListMarcas()
  {
    return this.http.get(`${url_base}marcas/list` , this.headers)
            .pipe(
              map( (resp:any) => {
                const marcas = resp.response.map(
                  (marca: { id_marca: string | null | undefined; marca_nombre: string | null | undefined; }) => 
                  new Select(marca.id_marca, marca.marca_nombre));
              
                  return marcas
                })
            )
  }
}
