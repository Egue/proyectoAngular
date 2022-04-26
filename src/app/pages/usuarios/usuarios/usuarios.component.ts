import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent  implements OnInit  {
  public listUsuario:Usuario[] = [];
  public total:number = 0;
  public desde:number = 0;

  public formSubmitted:boolean = false;
  public formRegister = this.fb.group({
      user: ['',[Validators.required , Validators.minLength(4)]],
      email:['',[Validators.required , Validators.email]],
      password:'123?'
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuariosService,
    private router:Router
    ) {}
  ngOnInit(): void {
    this.cargarListUser();
  }

  cargarListUser()
  {
    this.usuarioService.List(this.desde).subscribe(
      (response) => {
        
        this.total = response.response.total;
        this.listUsuario = response.response.usuarios
      }
    )
  }

   /**Cargar Lista de usuarios */
 
    /**Funcion registar usuario */
  crearUsuario():void{
    this.formSubmitted = true;

    if(this.formRegister.invalid){
      return;
    }

    this.usuarioService.register(this.formRegister.value)
    .subscribe( (response) => {
      Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success');
        this.router.navigateByUrl('usuarios');
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

  estatusUser(value:any):boolean
  {
    let returnValue:boolean = false;
    if(value === 1){
      returnValue= true;
    }
    return returnValue;
  }

  
  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0;
    }else if(this.desde > this.total){
      this.desde -= valor;
    }

    this.cargarListUser();

  }

}
