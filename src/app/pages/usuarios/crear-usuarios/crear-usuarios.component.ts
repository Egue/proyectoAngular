import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styles: [
  ]
})
export class CrearUsuariosComponent implements OnInit    {

public listEmpresa:any[] = [];


  public registerFormUsuario = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    email:['' , [Validators.required , Validators.email]],
    id_empresa:[''],
    password:['H@nnil'],

  } ); 
  constructor(private fb:FormBuilder, private usuarioService:UsuariosService , private sistemaGestionService:SistemaGestionService) { }
  ngOnInit(): void {
    this.getEmpresa();
  }

  register(){
    console.log(this.registerFormUsuario.value)
    /*this.usuarioService.register(this.registerFormUsuario.value)
                        .subscribe((response) => {
                          //Swal.fire('Creado con Éxito' , response.response , 'success');
                          //if(response?.success)
                          if(response)
                          {
                            Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success'); 
                            this.registerFormUsuario.reset();
                          }
                    
                        },  (err) => {
                          Swal.fire('Error' , err.error.response , 'error');
                        });*/
  }

  getEmpresa()
  {
      this.sistemaGestionService.getlistEmpresa().subscribe((resp:any) => {
        this.listEmpresa = resp.response
      })
  }


   

}
