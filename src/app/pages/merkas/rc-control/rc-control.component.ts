import { Component, OnInit } from '@angular/core';
import { MerkasService } from '../../../services/merkas.service';
import {DatePipe} from '@angular/common';

import {CalendarModule} from 'primeng/calendar';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-rc-control',
  templateUrl: './rc-control.component.html',
  styles: [
  ]
})
export class RcControlComponent implements OnInit {

  public rangeDates:Date[]  = [];
  
  public pipe:DatePipe = new DatePipe('en-US');

  public cargandoReporte:boolean = false;

  public listRc:any[] = [];

  public modalCargando:boolean = true;

  public loading:boolean = false;

  constructor(private merkasservice:MerkasService) { }

  ngOnInit(): void {

  }

  getListBetween()
  { this.loading = true;
    const range = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyyMMdd') ,
      valor2: this.pipe.transform(this.rangeDates[1] , 'yyyyMMdd')
    };

    this.merkasservice.getRecibosCaja(range)
                        .subscribe((resp:any)=> {
                          this.listRc = resp.response;
                          this.cargandoReporte = true; 
                          this.loading = false;
                        });
  }


  //**descarga en excel */
  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listRc);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "SincronizacionControlMerkas");
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
