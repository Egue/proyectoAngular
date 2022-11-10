import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { catchError, map } from 'rxjs';

//const base_url = environment.base_url;
const base_url = '/repositories/backend_jwt_3_slim/public/';
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

  list(barrio:any)
  {
    const url = `${base_url}contratos/gps/list`;
     
    return this.http.post( url ,  barrio ,this.headers);
  } 

  municipiosList(departamento:any){
    const url = `${base_url}contratos/municipios/${departamento}`;

    return this.http.get(url , this.headers);
  }

  barriosList(municipio:any)
  {
    const url = `${base_url}contratos/barrios/${municipio}`;

    return this.http.get(url  , this.headers);

  }

  fechaBetwenn(data:any)
  {
    const url = `${base_url}contratos/gps/findByBetween`;

    return this.http.post<any>(url , data , this.headers);
  }
  
  getFindDireccionByCus(cus:string)
  {
      return this.http.get(`${base_url}contratos/findByCus/${cus}` , this.headers);
  }

  getGpsFindById(cus:string)
  {
    return this.http.get(`${base_url}contratos/gps/findById/${cus}` , this.headers);
  }
  updatedContratoGps(data:any)
  { 
    return this.http.patch(`${base_url}contratos/gps/updatedContratoGps/${data.id_contrato}` , data, this.headers);
  }

  saveContratoGps(data:any)
  {
    data.key = "3e1d7ed98e94366975582f41f77a0bc9442a288da87d164bdc9fef66e57de70f";
    
    return this.http.post(`${base_url}contratos/gps/save` , data , this.headers);
  }


}

