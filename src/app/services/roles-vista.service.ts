import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RolesVistaService {

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

  listGroup()
  {
    const url = `${base_url}/roles/group/list`;

    return this.http.get(url , this.headers);
  }
  saveGroup(data:any)
  {
    const url = `${base_url}/roles/group/save`;

    return this.http.post(url, data , this.headers);
  }

  getListViews()
  {
    const url= `${base_url}/roles/views/list`;

    return this.http.get(url , this.headers);
  }

  saveViews(data:any)
  {
    const url = `${base_url}/roles/views/save`;

    return this.http.post(url , data , this.headers);
  }

  getListRoles()
  {
    const url = `${base_url}/roles/list`;

    return this.http.get(url, this.headers);
  }
  
  getListRelations(role:any)
  {
    const url = `${base_url}/roles/rol/${role}`;

    return this.http.get(url , this.headers);
  }
  saveRelations(relations:any)
  { 
    const url = `${base_url}/roles/relations/save`;

    return this.http.post(url , relations , this.headers);

  }

}
