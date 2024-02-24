import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PreloadService } from './components/preload/service/preload.service';
import { Router } from '@angular/router'; 
import { ErrorHandlingService } from './services/error-handling.service';

@Injectable({providedIn: 'root'})
export class PreloadInterceptor implements HttpInterceptor {

  constructor(private preloadService:PreloadService , private _route:Router , private errorHandlingService: ErrorHandlingService) {}

  get token():string
  {
    return localStorage.getItem('jwt') || '';
  }
 

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    if(!request.headers.has('X-Skip-Loading'))
    {
      this.preloadService.show();
    }

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })

    const reqClone =  request.clone({
      headers
    });
    


    return next.handle(reqClone).pipe(
      tap(
        event => {
          if(event instanceof HttpResponse)
          {
             this.preloadService.hide(); 
          }
        }, 
        error => {
          this.preloadService.hide();
          //console.log(error);
        }
      ),
     catchError((error:HttpErrorResponse) => this.unAutorization(error))
    );

  }

  unAutorization = (error:HttpErrorResponse) =>
  {
    if(error.status === 401)
    {
      this._route.navigateByUrl('/login');

      
    }else if(error.status === 400)
    {
      this.errorHandlingService.handleError(error);
    }else if(error.status === 500)
    {
      this.errorHandlingService.handleError(error);
    }


    return throwError('');
  }
}
