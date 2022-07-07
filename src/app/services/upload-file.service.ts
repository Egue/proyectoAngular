import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

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

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
