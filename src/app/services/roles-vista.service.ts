import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
//const url_base = environment.base_url;
const url_base = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class RolesVistaService {

  constructor(private http: HttpClient) { }
 
  listGroup()
  {
    const url = `${url_base}roles/group/list`;

    return this.http.get(url );
  }
  saveGroup(data:any)
  {
    const url = `${url_base}roles/group/save`;

    return this.http.post(url, data );
  }

  getListViews()
  {
    const url= `${url_base}roles/views/list`;

    return this.http.get(url );
  }

  saveViews(data:any)
  {
    const url = `${url_base}roles/views/save`;

    return this.http.post(url , data );
  }

  getListRoles()
  {
    const url = `${url_base}roles/list`;

    return this.http.get(url);
  }
  
  getListRelations(role:any)
  {
    const url = `${url_base}roles/rol/${role}`;

    return this.http.get(url );
  }
  saveRelations(relations:any)
  { 
    const url = `${url_base}roles/relations/save`;

    return this.http.post(url , relations );

  }

}
