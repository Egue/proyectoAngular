import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


 //const base_url = environment.base_url;
const base_url = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {
   

  constructor(private  _http:HttpClient) { }


    save(data:any)
  {
   return this._http.post(`${base_url}tickets/save` , data);
  }

  list()
  {
    return this._http.get(`${base_url}tickets/list` );
  }

  saveTiket(data:any) 
  {
    return this._http.post(`${base_url}tickets/ticket/save` , data);
  }

  listTicketEstado(id:any)
  {
    return this._http.get(`${base_url}tickets/ticket/list/${id}`);
  }

  ticketFindById(id: any) {
     return this._http.get(`${base_url}tickets/ticket/find/${id}`);
}
//actualziar ticket estado
//1 activo 2 cerrado
updatedTicketEstado(data:any)
{
  return this._http.patch(`${base_url}tickets/ticket/updated/${data.idTicket}` , data);
}

///buscar seguimiento de los ticker
seguimientoByTicket(id:any)
{
  return this._http.get(`${base_url}tickets/detalle/find/${id}`);
}

seguimientoSave(data:any)
{
  return this._http.post(`${base_url}tickets/detalle/save` , data);
}


}



