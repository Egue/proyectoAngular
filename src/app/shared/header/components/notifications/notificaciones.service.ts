import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
const base_url = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private headers = new HttpHeaders().set('X-Skip-Loading', 'true');
  //private options = { headers: this.headers };

  constructor(private http:HttpClient) { }

  

  find_by_notifications(id_user:any , numero:number){
    const params = new HttpParams()
                  .set('id_user' , id_user)
                  .set('count' , numero);
    return this.http.get(`${base_url}notifications/all` , {params , headers:this.headers}  );

  }

  updated_estado(item:any){
    return this.http.put(`${base_url}notifications/changeEstado/${item.id}` , item);
  }
}
