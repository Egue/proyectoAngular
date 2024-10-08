import { AuthService } from './../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { MessageService } from 'primeng/api';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput:ElementRef | undefined;

  public viewPass:boolean = false;

  public formLogin = this.fb.group({
    email:[ localStorage.getItem('email') ||'',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3)]],
    remember:[false]
  });


  constructor( private router:Router ,
    private fb:FormBuilder,
    private authService: AuthService,
    private messageService:MessageService,
    private errorHandlingService:ErrorHandlingService
    ) { }
 

  login(){
    
    if(this.formLogin.valid)
    {

    this.authService.login(this.formLogin.value)
    .subscribe( resp => {
          if(this.formLogin.get('remember')?.value)
          {
            localStorage.setItem('email' , this.formLogin.get('email')?.value);

          }else{
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
    },  (error) => {
      //console.log(this.errorHandlingService.error)
      this.messageService.add({severity:'warn' , summary:'Datos Errados' , detail:this.errorHandlingService.error.error.response})

    })
    
  
  }else{
    this.messageService.add({severity:'error' , summary:'Campos Obligatorios' , detail:'Todos los campos son obligatorios'})

  } 

  }


  viewPassword()
  {
    const inputElement: HTMLInputElement = this.passwordInput?.nativeElement;
    if(this.viewPass)
    {
      inputElement.type='password';
      this.viewPass = false;

    }else{ 
      this.viewPass = true;
      inputElement.type = 'text';

    }
  }

}
