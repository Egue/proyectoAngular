import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, mergeMap  , of} from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { NotificacionesService } from "src/app/shared/header/components/notifications/notificaciones.service";


@Injectable({providedIn:'root'})
export class NotificationsRoutingResolve implements Resolve<null>{
    constructor(private _notificationService: NotificacionesService , private authService:AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
         
        const id = route.params['id']? route.params['id'] : null;

        if(id)
        {
            return this._notificationService.find_by_notifications(this.authService.usuario.id , id).pipe(
                mergeMap((notificacion:any) => {
                    if(notificacion.response)
                    {
                        return of(notificacion.response)
                    }else{
                        return EMPTY;
                    }
                })
            )
        }

        return of(null);
    }

}