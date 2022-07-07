import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SupergirosService {

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

  getListPagosBetween(data:any)
  {
    const url = `${base_url}/pagos/findByBetween`;

    return this.http.post(url , data , this.headers);
  }
}
