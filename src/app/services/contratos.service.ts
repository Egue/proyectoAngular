import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

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

  list(barrio:string)
  {
    const url = `${base_url}/contratos/gps/list`;
    const data = {"barrio":barrio};
    return this.http.post( url ,  data ,this.headers);
  } 

  municipiosList(departamento:any){
    const url = `${base_url}/contratos/municipios/${departamento}`;

    return this.http.get(url , this.headers);
  }

  barriosList(municipio:any)
  {
    const url = `${base_url}/contratos/barrios/${municipio}`;

    return this.http.get(url  , this.headers);

  }

  fechaBetwenn(data:any)
  {
    const url = `${base_url}/contratos/gps/findByBetween`;

    return this.http.post<any>(url , data , this.headers);
  }


}

