import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent   {
  public listUsuario:any;
  public formSubmitted:boolean = false;
  public formRegister = this.fb.group({
      user: ['',[Validators.required , Validators.minLength(4)]],
      email:['',[Validators.required , Validators.email]],
      password:'123?'
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuariosService
    ) {
      this.listUsuario = this.usuarioService.List().subscribe(); 
     }
 
    /**Funcion registar usuario */
  crearUsuario():void{
    this.formSubmitted = true;

    if(this.formRegister.invalid){
      return;
    }

    this.usuarioService.register(this.formRegister.value)
    .subscribe( (response) => {

    } , 
    (err) => {
      
      Swal.fire('Error' , err.error.response , 'error');
    });
  }

  /**Funcion validación de cada campo para mostrar en el formulario */
  validateCampo(input:string):boolean{
    let estado:boolean = false;

    if(this.formRegister.get(input)?.invalid && this.formSubmitted){
      estado = true;
    }else{
      estado = false;
    }

    return estado;
  }

}
