import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//const base_url = environment.base_url;
const base_url = '/repositories/backend_jwt_3_slim/public/';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  //cargar los archivo del modulo de supergiros
  async uploadExcelSupergiros(archivo:File , categoria:'Supergiros' , fecha:string)
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

      console.log(data);
      return 'hola';

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
