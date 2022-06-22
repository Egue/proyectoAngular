import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PeligrosService } from '../../../services/peligros.service';

@Component({
  selector: 'app-peligros',
  templateUrl: './peligros.component.html',
  styles: [
  ]
})
export class PeligrosComponent implements OnInit {

  public modalEstado:boolean = true;
  public clasificacionList:any[]=[];

  public formClasificacion = this.fb.group({
    nombre:['', [Validators.required , Validators.minLength(5)]]
  });



  constructor(private fb: FormBuilder , private peligrosService: PeligrosService) { }

  ngOnInit(): void {
    this.clasificacionListLoad();

  }

  saveClasificacion()
  {
    if(this.formClasificacion.valid)
    {
      this.cerrarModal(); 
      this.peligrosService.saveClasificacion(this.formClasificacion.value)
      .subscribe((response)=> {
        if(response)
         {
          Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success'); 
          this.formClasificacion.reset();
          this.clasificacionListLoad();
          }
      }, (err) => {
        Swal.fire('Error' , err.error.response , 'error');
      });
      
    }
    
    
  }

  //cargar Lista de clasificacion
  clasificacionListLoad()
  {
    this.peligrosService.listClasificacion()
    .subscribe((resp:any) => {
      this.clasificacionList = resp.response;
    })
  }


  //evento de modal
  activarModal(){ this.modalEstado = false; }
  cerrarModal(){ this.modalEstado = true;}

}
