import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes , RouterModule} from "@angular/router";
import { RecoveryComponent } from './recovery/recovery.component';

const routes: Routes = [
    
  {path: 'login' , component: LoginComponent},
  {path: 'recovery' , component:RecoveryComponent}
  //{path:'register' , component: RegisterComponent},
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class AuthRoutingModule{}