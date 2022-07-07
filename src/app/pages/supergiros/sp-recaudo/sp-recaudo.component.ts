import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {DatePipe} from '@angular/common'; 
import { SupergirosService } from '../../../services/supergiros.service';
@Component({
  selector: 'app-sp-recaudo',
  templateUrl: './sp-recaudo.component.html',
  styles: [
  ]
})
export class SpRecaudoComponent implements OnInit {

  public cargandoReporte:boolean = false;
  public pipe:DatePipe = new DatePipe('en-US');
  public rangeDates:any[]  = [];

  public uploadedFiles: any[] = [];

  public listPagos: any[] = [];

  constructor(private supergirosServices:SupergirosService) { }

  ngOnInit(): void {
  }



  searchByBetween(){
    const range = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyy-MM-dd') ,
      valor2: this.pipe.transform(this.rangeDates[1] , 'yyyy-MM-dd')
    }
    
    this.supergirosServices.getListPagosBetween(range)
            .subscribe((resp:any) => {
                this.listPagos = resp.response;
                this.cargandoReporte = true;
            });
      
  }

  onUpload(event:any)
  {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles);
  }
  }

  onSelectEvent(event:any)
  {
    console.log("Selected files" , event);
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles);
    }
  }
  onBeforeUpload(event:any)
  {
     
      console.log(event);
    
  }

}
