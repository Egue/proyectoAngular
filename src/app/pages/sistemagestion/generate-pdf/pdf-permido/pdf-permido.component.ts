import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { ActivatedRoute } from '@angular/router';
import { Permiso } from 'src/app/models/permiso.model';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pdf-permido',
  templateUrl: './pdf-permido.component.html',
  styleUrls:['./pdf-permido.component.css'],
  providers:[MessageService]
})
export class PdfPermidoComponent implements OnInit {

  private _id:any;
 
  constructor(private _sistemagestionService:SistemaGestionService , private route:ActivatedRoute , private messageService:MessageService) { 
    
    this._id = route.snapshot.params['id'];
     
  }

  ngOnInit(): void { 
  }

  download(tipo:string)
  {
    if(tipo === "permiso"){this._sistemagestionService.generate_pdf_permiso(this._id).subscribe({
      next:(pdf:Blob) => {
            this.saveAs('Permiso_de_trabajo' , pdf);
      },
      error:(error)=>{
            this.error_pdf();
      }
    });}
    if(tipo === "preoperacional"){
      this._sistemagestionService.generate_pdf_preoperacional(this._id).subscribe({
        next:(pdf:Blob)=>{
          this.saveAs('Preoperacional_' , pdf);
        },
        error:(error) => {
          this.error_pdf();
        }
      })
    }
  }
 

  error_pdf()
  {
    this.messageService.add({
      severity:'error',
      summary:'Error ',
      detail:'Error generando el Pdf'
    })
  }
  saveAs(name:string , pdf:Blob)
  {
    const fileName = this.generateFileName(name);

    const blob = new Blob([pdf] , {type:'application/pdf'});

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href  = url;

    a.download = fileName;

    a.click();

    window.URL.revokeObjectURL(url);
  }

  private generateFileName(baseName: string): string {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[:.]/g, '-');
    return `${baseName}_${formattedDate}.pdf`;
  }
}
