import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {tap} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService , 
              private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.authService.validateToken()
      .pipe(
        tap( autenticado => {
          if(!autenticado)
          {
            this.router.navigateByUrl('/login');
          }
        })
      );
    
  }
  
}
