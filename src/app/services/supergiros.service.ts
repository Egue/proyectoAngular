import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//const base_url = environment.base_url;
const base_url = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class SupergirosService {

  constructor(private http: HttpClient) { }
 

  getListPagosBetween(data:any)
  {
    const url = `${base_url}pagos/findByBetween`;

    return this.http.post(url , data );
  }

  async uploadFile(file:File , data:any)
  {
    //data.file_uploads = file;  
    //return this.http.post(`${base_url}uploads/origin` , data);

    const {categoria , fecha} = data;

    try{

      const url = `${base_url}uploads/origin`;

      const formData = new FormData();

      formData.append('categoria' , categoria);

      formData.append('fecha' , fecha);

      formData.append('file_uploads' , file);
      
      const resp = await fetch( url , {
        method: 'POST',

         

        body: formData
      });
      
      return true;

    }catch(error){
 
      return false;
    }

  }

  getlistCategory(data:any)
  {
    const {count , categoria} = data;
    
    return this.http.get(`${base_url}uploads/listCategoria/${count}/${categoria}` );
  }

  cargueFileDataBase(item:any)
  {
    const {id , titulo} = item;

    return this.http.get(`${base_url}uploads/supergiros/cargue/${id}/${titulo}` );

  }

}
