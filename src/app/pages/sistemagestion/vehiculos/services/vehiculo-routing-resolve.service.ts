import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs";
import { VehiculoServiceService } from "./vehiculo-service.service";

@Injectable({providedIn:'root'})
export class VehiculoRoutingResolveService implements Resolve<null>{

    constructor(private vehiculoService:VehiculoServiceService , private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id'] : null;

        if(id){
            return this.vehiculoService.findById(id).pipe(
                mergeMap((vehiculo: any) =>{
                    if(vehiculo.response)
                    {
                        return of(vehiculo.response);
                    }else{
                        this.router.navigate(['404']);
                        return EMPTY;
                    }
                } )
            )
        }
        return of(null);
    }
}