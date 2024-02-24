import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/shared/header/components/notifications/notificaciones.service';

@Component({
  selector: 'app-listnotifications',
  templateUrl: './listnotifications.component.html',
  styles: [
  ]
})
export class ListnotificationsComponent implements OnInit {

  public notifications:any = [];

  constructor(private _activatedRoute:ActivatedRoute , private _router:Router , private notificationService:NotificacionesService) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({notificacion}) => {
      console.log(notificacion);
      this.notifications = notificacion;
    })
  }

  newDate(item:any)
  {
    const date = new Date(item.created_at).toLocaleDateString();

    return date;
  }

  viajara(item:any)
  {
    this.notificationService.updated_estado(item).subscribe((resp:any) => {
      item.estado = 2;
      this._router.navigateByUrl(item.url);
    })
  }

}
