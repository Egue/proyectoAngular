import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";


@Injectable({providedIn: 'root'})
export class VehiculoIdRoutingResolveService implements Resolve<null>{
    constructor(private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id']: null;
        if(id){

            return id;
        }

        return of(null);
    }
}