import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {DatePipe} from '@angular/common'; 
import { SupergirosService } from '../../../services/supergiros.service';
import { UploadFileService } from '../../../services/upload-file.service';
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
 

  public listPagos: any[] = [];

  public reporteFile:File | undefined;
 

  constructor(private supergirosServices:SupergirosService , private uploadFileService:UploadFileService) { }

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
 
 

  myUploader(event:File){
     
  }

}
