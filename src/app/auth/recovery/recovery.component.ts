import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  public formMail:boolean = true;
  public formToken:boolean = false;
  public formPass:boolean = false;

  public validando:boolean = false;

  public msmToken:string = '';
  public msmCorreo:string = '';
  public msmPass:string = '';

  public mail:string = '';

  public editRecovery = this.fb.group({
    email: ['' , Validators.required]
  })

  public editToken = this.fb.group({
    token: ['' , Validators.required],
    email: ['', Validators.required]
  })

  public editPass = this.fb.group({
    email:['' , [Validators.required]],
    password:['' , [
    Validators.required , this.patternValidator(/\d/, {hasNumber: true}) , this.patternValidator(/[A-Z]/, {hasCapitalCase: true}), 
    this.patternValidator(/[a-z]/ , { hasSmallCase: true}),
    this.patternValidator(/[!@#$%]/, { hasSpecialCharacters: true }),
    Validators.minLength(8)]],
    confirmPass: ['' , Validators.required]

  } , {
    validator : this.passwordMathValidator
  })
  constructor(private fb:FormBuilder, private authService: AuthService , private router:Router) { }

  ngOnInit(): void {
  }


  onSubmit()
  {
    if(this.editRecovery.valid)
    {
      this.validando = true;
      this.authService.recovery(this.editRecovery.value).subscribe((resp:any) => {
        this.formMail = false;
        this.formToken = true;
        this.validando = false;
        this.mail = this.editRecovery.get('email')?.value;
      } , error => {
        this.validando = false;
        this.msmCorreo = error.error.response;
      })
    }
  }

  onToken()
  {
     if(this.editToken.valid)
     {
      this.validando = true;
      this.authService.validateTokenRecovey(this.editToken.value).subscribe((resp:any) => {
          this.formToken = false;
          this.formPass = true;
          this.validando = false;
      } , error => {
        this.validando = false;
        this.msmToken = error.error.response;
      })
     }

  }

  onPass()
  {
    if(this.editPass.valid)
    {
      this.validando = true;
      this.authService.passwordNew(this.editPass.value).subscribe((resp:any) => {

          Swal.fire({ 
          icon: 'success',
          title: 'Contraseña actualizada',
          showConfirmButton: false,
          timer: 1500
        })
        this.validando = false;
        this.formPass = false;
        this.router.navigateByUrl("/login");
        
      } , error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'error inesperado', 
        })
        this.validando = false;
        this.formPass = false;
        this.formMail = true;
      }
        
      )
    }
  }

  onChangesMail()
  {
    this.editToken.get('email')?.setValue(this.mail);

    this.editPass.get('email')?.setValue(this.mail);
  }

 

    patternValidator(regex:RegExp , error: ValidationErrors):ValidatorFn{

    return (control: AbstractControl): {[key:string]:any} => {
      if(!control.value)
      {
        return [];
      }

      const valid = regex.test(control.value);

      return valid ? []: error;
    };
    }

    passwordMathValidator(control: AbstractControl)
    {
      const password: string = control.get('password')?.value;

      const confirmPassword:string = control.get('confirmPass')?.value;

      if(password !== confirmPassword)
      {
        control.get('confirmPass')?.setErrors({NoPassswordMatch: true});
      }
    }





}
