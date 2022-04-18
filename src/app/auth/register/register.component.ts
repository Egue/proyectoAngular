import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted:boolean = false;
  public registerForm = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    email:['' , [Validators.required , Validators.email]],
    password:['' , [Validators.required]],
    password2:['' , [Validators.required]],
    terminos:[false, [Validators.required]]

  } , {
    validators: this.passwordIguales('password' , 'password2')
  }); 

  constructor(
    private fb:FormBuilder,
    private authService:AuthService    
    ) { }

  register(){
    this.formSubmitted = true;

    if(this.registerForm.invalid){
      return;
    }

    //realizando cargue
    this.authService.crear(this.registerForm.value)
    .subscribe( (response) => {
      //Swal.fire('Creado con Éxito' , response.response , 'success');
      //if(response?.success)

    },  (err) => {
      Swal.fire('Error' , err.error.response , 'error');
    });
    
  }

  validateCampo(input:string):boolean{
    let estado:boolean = false;

    if(this.registerForm.get(input)?.invalid && this.formSubmitted){
      estado = true;
    }else{
      estado = false;
    }

    return estado;
  }

  aceptaTerminos():boolean{
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  validatePassword():boolean{
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    }
    return false;
  }

  passwordIguales(pass1:string , pass2:string)
  {
    return (formGroup: FormGroup) => {
        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);

        if(pass1Control?.value === pass2Control?.value){
          pass2Control?.setErrors(null);
        }else{
          pass2Control?.setErrors({noEsIgual:true})
        }
    }   
  }

}
