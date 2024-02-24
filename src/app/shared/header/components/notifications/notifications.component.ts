import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { NotificacionesService } from './notificaciones.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input("id_user") public id_user:any = 0;
  @Output('notifications') notifications:EventEmitter<boolean> = new EventEmitter();
  public listNotifications:any =[];
  constructor(private _notificationService:NotificacionesService , private _router:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getNotifications();
    },2000)
  }

  getNotifications()
  {
    this._notificationService.find_by_notifications(this.id_user , 5).subscribe((resp:any) => {
      this.listNotifications = resp.response;
      if(this.listNotifications.length)
      {
        this.notifications.emit(true);
      }
    })
  }

  datelocal(local:any)
  {
    const fecha = new Date(local).toLocaleDateString();
    return fecha;
  }

  direct(item:any)
  {
    this._notificationService.updated_estado(item).subscribe((resp:any) => {
      item.estado = 2;
      this._router.navigateByUrl(item.url);
    })
    
  }

  vermas()
  {
    this._router.navigate(['dashboard/notifications' , 20 , 'list']);
  }

}
