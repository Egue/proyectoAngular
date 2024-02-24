import { Component, Input, OnInit, Output , EventEmitter, ViewChild } from '@angular/core'; 
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Message, MessageService } from 'primeng/api';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-uploads-documento',
  templateUrl: './uploads-documento.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class UploadsDocumentoComponent implements OnInit {

  @Input() public  oculto:boolean = true;
  @Output()  ocultoOut:EventEmitter<boolean> = new EventEmitter();
  @Input() public referencia:number = 0;
  @Input() public tipo:string = '';

  @ViewChild('fileUpload') fileUpload:any;

  public nombre:string = '';
  public inicio?:Date;
  public caducidad?:Date;

  public file?:any[];

  //extractor de fechas
  public pipe:DatePipe = new DatePipe('en-US');

  //mesagges
  public messageError:boolean = false;
  public msgs:Message[] = [ {severity:'error', summary:'Error', detail:'Todos los campos son obligatorios'}];

  //form
  public editForm = this.fb.group({
      documento_poliza: ['', Validators.required],
      documento_inicio: ['', Validators.required],
      documento_fin : ['' , Validators.required],
      documento_tipo: ['', Validators.required],
      referencia_id: ['', Validators.required]
  })
  constructor(private fb:FormBuilder , private messageService:MessageService , private uploadFileService:UploadFileService) { }

  ngOnInit(): void {
     
  }

  closeModal()
  {
    this.oculto = true;
    this.ocultoOut.emit(true);
    this.resetFields();
  }

  myUploader(file:File)
  {
    this.editForm.get('documento_tipo')?.setValue(this.tipo);
    this.editForm.get('referencia_id')?.setValue(this.referencia);
    if(this.editForm.invalid)
    {
      this.messageError = true;

    }else{
      const inicio = this.editForm.get('documento_inicio')?.value;
      const fin = this.editForm.get('documento_fin')?.value;
      this.editForm.get('documento_inicio')?.setValue(this.pipe.transform(inicio , 'yyyy-MM-dd'));
      this.editForm.get('documento_fin')?.setValue(this.pipe.transform(fin , 'yyyy-MM-dd'));
      this.messageError = false;

      this.uploadFileService.uploadFile(file, this.editForm.value).subscribe((resp:any) => {
        this.closeModal();
      }, error => {
        if(TestBed)
        {
          console.log(error);
        }
      })
    }
    
  }

  resetFields()
  {
    this.editForm.reset();
    this.clearFileUpload();
  }

  clearFileUpload()
  {
    this.fileUpload.clear();
  }

}
