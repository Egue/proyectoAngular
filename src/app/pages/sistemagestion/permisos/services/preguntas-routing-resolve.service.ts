import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({providedIn:'root'})
export class PreguntasResolverService implements Resolve<null>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        
        const id = route.params['id'] ? route.params['id'] : null;

        if(id){
            return of(id)
        }else{
            return of(null)
        }
    }
    
}