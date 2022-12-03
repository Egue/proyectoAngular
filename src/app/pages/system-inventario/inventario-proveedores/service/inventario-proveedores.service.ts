import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class InventarioProveedoresService {

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


  inventarioProveedoresList()
  {
    return this.http.get(`${base_url}inventario/proveedor/list` , this.headers);
  }
}

