import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { RecoveryComponent } from './recovery/recovery.component';
import { ToastModule } from 'primeng/toast'; 
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  declarations: [    
    LoginComponent,
    RegisterComponent,
    RecoveryComponent
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    PasswordModule,
    InputTextModule
  ]
})
export class AuthModule { }
