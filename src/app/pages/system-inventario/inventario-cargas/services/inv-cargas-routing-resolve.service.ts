import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from "rxjs";
import { InventarioCargasService } from "./inventario-cargas.service";


@Injectable({providedIn: 'root'}) 
export class InvCargasRoutingResolveService implements Resolve<null>{
    constructor(private inventarioCargaService:InventarioCargasService , private router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<null> | Promise<null> | null {
        const id = route.params['id']? route.params['id']: null;
       
        if(id){
            return this.inventarioCargaService.inventarioCargaFindById(id).pipe(
                mergeMap((carga: any) => {
                     
                    if(carga.response)
                    {
                        return of(carga.response);
                    }else {
                        this.router.navigate(['400']);
                        return EMPTY;
                    }
                })
            )
        }

        return of(null);

    }
}