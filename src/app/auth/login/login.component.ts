import { AuthService } from './../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin = this.fb.group({
    email:[ localStorage.getItem('email') ||'',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3)]],
    remember:[false]
  });


  constructor( private router:Router ,
    private fb:FormBuilder,
    private authService: AuthService
    ) { }
 

  login(){
    this.authService.login(this.formLogin.value)
    .subscribe( resp => {
          if(this.formLogin.get('remember')?.value)
          {
            localStorage.setItem('email' , this.formLogin.get('email')?.value);

          }else{
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
    },  (err) => {
      Swal.fire('Error' , err.error.response , 'error');
    })
    
  }

}
