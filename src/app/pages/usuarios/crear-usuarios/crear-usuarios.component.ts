import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styles: [
  ]
})
export class CrearUsuariosComponent     {


  public registerFormUsuario = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    email:['' , [Validators.required , Validators.email]],
    password:['H@nnil'],

  } ); 
  constructor(private fb:FormBuilder, private usuarioService:UsuariosService ) { }

  register(){
    this.usuarioService.register(this.registerFormUsuario.value)
                        .subscribe((response) => {
                          //Swal.fire('Creado con Éxito' , response.response , 'success');
                          //if(response?.success)
                          if(response)
                          {
                            Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success'); 
                          }
                    
                        },  (err) => {
                          Swal.fire('Error' , err.error.response , 'error');
                        });
  }

   

}
