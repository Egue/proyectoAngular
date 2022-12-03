import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class InventarioCargasService {

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

  inventarioCargaFindById(id:any){
    return this.http.get(`${base_url}inventario/ingreso/findById/${id}` , this.headers);
  }

  inventarioCargaSave(data:any)
  {
    return this.http.post(`${base_url}inventario/ingreso/save` , data , this.headers);
  }

  inventarioFindDetalleByIngresoId(id:any)
  {
    return this.http.get(`${base_url}inventario/ingresoDetalle/findDetalleByIngresoId/${id}` , this.headers);
  }

  inventarioDetalleCargaSave(data:any)
  {
    return this.http.post(`${base_url}inventario/ingresoDetalle/save` , data , this.headers);
  }

}
