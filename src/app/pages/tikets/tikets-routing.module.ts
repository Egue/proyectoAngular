import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TiketsListComponent } from "./tikets-list/tikets-list.component";
import { TicketRoutingResolve } from "./service/ticket-routing-resolve";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";

    const tikect:Routes = [

        {path:'' , component:TiketsListComponent , data:{titulo:'Lista de Tickets'}},
        {path:':id/edit' , 
        component:TicketDetailComponent,
        resolve:{
            ticket: TicketRoutingResolve,

        } , 
        data:{titulo:'Detalle de Ticket'}},
        {path:'detalle' , component:TicketDetailComponent ,data:{titulo:'prueba'}}
    ]


@NgModule({
    imports:[RouterModule.forChild(tikect)],
    exports:[RouterModule]
})export class TicketsRoutingModule{}