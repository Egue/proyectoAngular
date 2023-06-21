import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, mergeMap, of } from "rxjs";
import { TicketsService } from "src/app/services/tickets.service";

@Injectable({providedIn:'root'})

export class TicketRoutingResolve implements Resolve<null>{

    constructor(private _ticketService : TicketsService, private _router:Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> | Promise<null> | null {
         
        const id = route.params['id']? route.params['id'] : null;


        if(id)
        {
            return this._ticketService.ticketFindById(id).pipe(

                mergeMap((ticket:any) => {
                    
                    if(ticket.response)
                    {
                        return of(ticket.response);
                    }else{
                        this._router.navigate(['404'])

                        return EMPTY;
                    }
                })
            )
        }

        return of(null);
    }
}