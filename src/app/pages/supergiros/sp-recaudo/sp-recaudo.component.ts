import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {DatePipe} from '@angular/common'; 
import { SupergirosService } from '../../../services/supergiros.service';
import { UploadFileService } from '../../../services/upload-file.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
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
 
  public dateValue:Date | undefined;

  //lista de los archivos subidos a la tabla uploads
  public listFiles:any[] = [];

  constructor(private supergirosServices:SupergirosService , private uploadFileService:UploadFileService) { }

  ngOnInit(): void {
    
    this.getListFiveFirts();
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
 
 

  myUploader(file:File){
    const data = {
      categoria: 'Supergiros',
      fecha: this.pipe.transform(this.dateValue , 'yyyy-MM-dd')
    } 
    this.supergirosServices.uploadFile(file , data).then(resp => {
                if(resp)
                {
                  Swal.fire({ 
                    icon: 'success',
                    title: 'Cargado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.getListFiveFirts();
                }else {
                  Swal.fire({
                    title: 'Oops..',
                    text: 'Error inesperado',
                    icon: 'error'
                  })
                }
    })
  }

  getListFiveFirts()
  {
    const data = {
      categoria : 'Supergiros',
      count : 5
    }

    this.supergirosServices.getlistCategory(data)
                            .subscribe((resp:any) => {

                              this.listFiles = resp.response;
                            })
  }

  sincronizarFileDataBase(item:any ):void
  {
    this.supergirosServices.cargueFileDataBase(item)
                            .subscribe((resp:any) => {
                              if(resp.success)
                              {
                                Swal.fire({ 
                                  icon: 'success',
                                  title: 'Archivo sincronizado con éxito',
                                  showConfirmButton: false,
                                  timer: 1500
                                });
                                this.getListFiveFirts();
                              }else{
                                Swal.fire({
                                  title: 'Oops..',
                                  text: 'Error inesperado',
                                  icon: 'error'
                                })
                              }
                            })
  }

  //**descarga en excel */
  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listPagos);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "ReportePuntosRepartidos");
    });
  }

  saveAsExcelFile(buffer:any , filename: string):void{
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

 

}
