import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs"; 


@Injectable({providedIn:'root'})
export class PermisoPeligroRoutingIdResolveService implements Resolve<null>{

    constructor( private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id']: null;
        
        if(id){
             

            return id;
            
        }

        return of(null);
    }
}