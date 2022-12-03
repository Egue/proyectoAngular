import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { InventarioArticulo } from '../inventario.model';
const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

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

  articuloSave(data:any)
  {
    return this.http.post(`${base_url}inventario/articulo/save` , data , this.headers);
  }

  articuloList()
  {
    return this.http.get<any>(`${base_url}inventario/articulo/list` , this.headers).pipe(
      map( resp => {
        const list = resp.response.map(
          (          ar: { articulo_id: number | undefined; articulo_nombre: string | undefined; articulo_codigo: string | undefined; articulo_valor: number | undefined; articulo_unitario: string | undefined; articulo_cantidad: number | undefined; articulo_categoria: string | undefined; }) => new InventarioArticulo(ar.articulo_id, ar.articulo_nombre, ar.articulo_codigo, ar.articulo_valor, ar.articulo_unitario, ar.articulo_cantidad, ar.articulo_categoria, '')
        );

        return list;
      }
      )
    );
  }

  articuloFindByName(query:any)
  {
    return this.http.post(`${base_url}inventario/articulo/findByName` , query , this.headers);
  }
}
