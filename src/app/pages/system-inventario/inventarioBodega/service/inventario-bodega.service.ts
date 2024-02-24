import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class InventarioBodegaService {

  constructor(private http:HttpClient) { }

  private get token():string
  {
    return localStorage.getItem('jwt') || '';
  }

  private get headers()
  {
    return { 
      headers: {'Authorization' : 'Bearer ' + this.token}
    }
  }


  public inventarioBodegaList()
  {
    return this.http.get(`${base_url}inventario/bodega/list` , this.headers);
  }

  public kardex(item:any){
    return this.http.get(`${base_url}inventario/kardex/list/${item}` , this.headers);
  }

  public getListTransferencias(data:any):Observable<any>
  {
    //console.log(data);
    return this.http.post(`${base_url}inventario/transbodega/between` , data, this.headers);
  }
}

