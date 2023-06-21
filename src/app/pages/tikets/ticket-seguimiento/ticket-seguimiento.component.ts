import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-seguimiento',
  templateUrl: './ticket-seguimiento.component.html',
  styles: [
  ]
})
export class TicketSeguimientoComponent implements OnInit {


  @Input() public idTicket:any = 0;

  public text:string = '';

  public seguimiento:any[] =[];

  constructor(private _tickerService:TicketsService , private _authService:AuthService) { }

  ngOnInit(): void {

    this.getlisSeguimiento();
  }

  getlisSeguimiento()
  {
      this._tickerService.seguimientoByTicket(this.idTicket).subscribe((resp:any) => {
        console.log(resp.response);
        this.seguimiento = resp.response;
      })
  }

  validate() {
    if(this.text)
    {
      const data = {
        id_user : this._authService.usuario.id,
        comentario : this.text,
        id_ticket : this.idTicket
      }
      this.save(data);
    }
    }

    save(data:any)
    {
      this._tickerService.seguimientoSave(data).subscribe((resp:any) => {
        this.text = '';
        this.getlisSeguimiento();
      })
    }

}
