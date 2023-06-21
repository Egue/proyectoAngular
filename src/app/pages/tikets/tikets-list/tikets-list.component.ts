import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-tikets-list',
  templateUrl: './tikets-list.component.html',
  styles: [
  ] , 
  providers:[MessageService]
})
export class TiketsListComponent implements OnInit {

  

  public listCategoria:any[] = [];

  public tikects:any[] = [];

  public dialogCategoria:boolean = false;

  public dialogTicket:boolean = false;

  public formCategoria = this._fb.group({ 
    name:['' , Validators.required]
  }) 
  
  public formTicket = this._fb.group({
      titulo:['' , Validators.required],
      id_categoria:['' , Validators.required],
      comentario:['' , Validators.required], 
      id_user:''
  });

  constructor(private _fb:FormBuilder , private _ticketsService:TicketsService , private _messageService:MessageService , private _authService:AuthService) { }

  ngOnInit(): void {

    
    this.getListTicket(1);
  }
  getListCategorias() {
    this._ticketsService.list().subscribe((resp:any) => {
      this.listCategoria = resp.response;
    })
  }

  validation() {
    if(this.formCategoria.valid)
    {
        this.save();
    }

    }

  save()
  {
       this._ticketsService.save(this.formCategoria.value).subscribe((resp:any) => {

          this.dialogCategoria = false;
                this.message({severity:'success' , summary:'Creado' , detail:'Creado con éxito'})
            
       } , error=> {
              this.dialogCategoria = false;
              this.message({severity:'error' , summary:'Error' , detail:'Error al crear'})
       })
  }

  openDialogCategoria()
  {
      this.dialogCategoria = true;
  }


  message(data:any)
  {
    this._messageService.add({severity:data.severity  , summary:data.summary , detail:data.detail})
  }


  openDialogTicket() {
      this.dialogTicket = true;
      this.getListCategorias();
    }
     

    validationTicket() {
        if(this.formTicket.valid)
        {
          this.formTicket.get('id_user')?.setValue(this._authService.usuario.id);
          this.saveTicket();
        }
    }
  saveTicket() {

    console.log(this.formTicket.value);
   this._ticketsService.saveTiket(this.formTicket.value).subscribe((resp:any) => {
      this.dialogTicket =false;
      this.message({severity:'success' , summary:'Creado' , detail:'Ticket Creado'})
      this.getListTicket(1);
      this.formTicket.reset();
    } , error => {
      this.dialogTicket =false;
      this.message({severity:'error' , summary:'Error' , detail:'Error al crear'})
    })
  }
  getListTicket(estado: number) {
   this._ticketsService.listTicketEstado(estado).subscribe((resp:any) => {
        this.tikects = resp.response;
        console.log(this.tikects)
   } , 
      error => {
        this.message({severity:'error' , summary:'Error' , detail:'Error cargando tickets'})
      }
   )
  }

}
 