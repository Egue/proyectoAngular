import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-table-documentos',
  templateUrl: './table-documentos.component.html',
  styles: [
  ]
})
export class TableDocumentosComponent implements OnInit {

@Input() public loading:boolean = true; 
@Input('listItem') public list:any[] = [];

  constructor(private uploadService:UploadFileService) { }

  ngOnInit(): void {
    setTimeout(() => {
         
    }, 2000);
  }
 

}
