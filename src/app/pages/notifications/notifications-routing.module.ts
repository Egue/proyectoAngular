import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListnotificationsComponent } from "./listnotifications/listnotifications.component";
import { NotificationsRoutingResolve } from "./notifications-resolve.service";

const notifications: Routes = [
    {
        path: ':id/list', component: ListnotificationsComponent,
        resolve: {
            notificacion: NotificationsRoutingResolve
        }, data: { titulo: 'Lista Notificationes' }
    }
];
@NgModule({
    imports:[RouterModule.forChild(notifications)],
    exports:[RouterModule]
})
export class NotificationsRoutingModule { }