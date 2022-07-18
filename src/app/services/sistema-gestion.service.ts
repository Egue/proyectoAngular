import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class SistemaGestionService {

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

  generalidadesDisct(usuario:any)
  {
    const url = `${base_url}/seguridad/generalidades/disct/${usuario}`;

    return this.http.get(url , this.headers);
  }
  generalidadesFindByTipo(tipo:any)
  {

    const url = `${base_url}/seguridad/generalidades/findByTipo`;

    return this.http.post(url , tipo , this.headers);
  }
}
