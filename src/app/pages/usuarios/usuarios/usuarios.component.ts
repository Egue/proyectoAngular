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
  public listUsuarioTemp:Usuario[] = [];
  public total:number = 0;
  public desde:number = 0;
  public cargando:boolean = true;

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
    this.cargando = true;
    this.usuarioService.List(this.desde).subscribe(
      ({total, usuarios}) => {
        
        this.total = total;
        this.listUsuario = usuarios;
        this.listUsuarioTemp = usuarios;
        this.cargando = false;
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

  findByName(letras:any){
    if(letras.length === 0)
    {
      this.listUsuario = this.listUsuarioTemp;
    }else{
    this.usuarioService.findByName(letras)
    .subscribe(
      (resp) => this.listUsuario = resp
    );
    }
  }

  deleteUsuario(usuario:Usuario)
  {
    console.log(usuario.id);
    Swal.fire({
      title: 'Eliminar Usuario?',
      text: `Quieres eliminar a ${usuario.user}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
    if(result.isConfirmed)
    {
    this.usuarioService.deleteById(usuario)
                        .subscribe((respon) => {
                          this.cargarListUser();
                          Swal.fire(
                            'Eliminado!',
                            `El usuario ${usuario.user} fue eliminado`,
                            'success'
                          )
                        }, (err) => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No puedes Eliminar el usuario. Error'
                          })
                        })
        }
    })
  
  }

}
