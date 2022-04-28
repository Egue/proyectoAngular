import { AuthRoutingModule } from './auth/auth-routing';
import { PagesRoutingModules } from './pages/pages-routing';
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { NopagefoundComponent } from './nopagefound/nopagefound.component'; 

const routes:Routes = [
 
  
  {path:'' , redirectTo: '/dashboard' , pathMatch: 'full'}, 
  {path:'**' , component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes , {useHash: true}),
    PagesRoutingModules,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
