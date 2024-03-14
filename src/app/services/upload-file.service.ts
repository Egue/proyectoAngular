import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
//const base_url = '/repositories/backend_jwt_3_slim/public/';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http:HttpClient) { }
 

  /**carga de Documentos */
  uploadFile(file:File , data:any)
  {
    const {documento_poliza , documento_fin , documento_inicio,documento_tipo , referencia_id} = data;
      
      const url = `${base_url}seguridad/documento/save`;

      const formData = new FormData();

      formData.append('documento_poliza' , documento_poliza);

      formData.append('documento_inicio' , documento_inicio);

      formData.append('documento_fin' , documento_fin),

      formData.append('documento_tipo' , documento_tipo);

      formData.append('referencia_id' , referencia_id);

      formData.append('file_uploads' , file);
 
      return this.http.post(url , formData);

      
  }

  //consultar url
  getUrlDocumento(item:any){
    return this.http.get(`${base_url}seguridad/documento/${item}` );
  }



  //cargar los archivo del modulo de supergiros
  /*async uploadExcelSupergiros(archivo:File , categoria:'Supergiros' , fecha:string)
  {
    try {
      
      const url = `${base_url}/uploads/origin`;

      const formData = new FormData();

      formData.append('xlsx' , archivo);

      const resp = await fetch(url , {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('jwt') || ''
        },
        body: formData
      });

      const data = await resp.json();

     // console.log(data);
      return 'hola';

    } catch (error) {
      //console.log(error);
      return false;
    }
  }*/
}
