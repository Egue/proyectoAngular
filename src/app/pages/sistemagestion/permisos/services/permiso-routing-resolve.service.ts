import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs"; 
import { SistemaGestionService } from "src/app/services/sistema-gestion.service";


@Injectable({providedIn:'root'})
export class PermisoRoutingResolveService implements Resolve<null>{

    constructor(private sistemaGestionService:SistemaGestionService , private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id'] : null;

        if(id){
            return this.sistemaGestionService.permisoTrabajoFindById(id).pipe(
                mergeMap((permiso: any) =>{
                    if(permiso.response[0])
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