import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve,  RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable,   mergeMap, of } from "rxjs"; 

@Injectable({providedIn:'root'})

export class ObservacionRoutingResolveService implements Resolve<null>{

    public constructor( ){}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {

        const id = route.params["id"] ? route.params["id"] : null;

        if(id)
        {
              return id;
        }

        return of(null);
    }

}