import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs"; 
import { SistemaGestionService } from "src/app/services/sistema-gestion.service";


@Injectable({providedIn:'root'})
export class PermisoVehiculoRoutingResolveService implements Resolve<null>{

    constructor( private router:Router , private sistemaGestionService:SistemaGestionService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id']: null;
        
        if(id){
            return this.sistemaGestionService.permisoTrabajoFindById(id).pipe(
                mergeMap((permiso: any) =>{
                    if(permiso.response)
                    {
                        return of(permiso.response[0]);
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