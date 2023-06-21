import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {


  public ticket:any;

  public estados:any[] = [
    {name:'Abierto' , value:'1'},
    {name:'Cerrado' , value:'2'}
  ];

  public dialogEstado:boolean = false;
  constructor(private activatedRoute:ActivatedRoute , private _tickerService:TicketsService) { 

      this.activatedRoute.data.subscribe(({ticket}) => {
        if(ticket)
        {
          this.ticket = ticket[0];
        }
      })
    
  }

  ngOnInit(): void {

  }


  updatedEstado() {
    const data = {
      idTicket : this.ticket.id,
      estado : 2
    }
    Swal.fire({
      title: 'Cerrar Ticket?',
      text: "Esta seguro de cerrar el ticket!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticket.estado = 2
        this._tickerService.updatedTicketEstado(data).subscribe((resp:any) => {
         Swal.fire(
           'Cerrado',
           'Ticket cerrado con éxito',
           'success'
         )
        })
      }
    })

   

}

}
