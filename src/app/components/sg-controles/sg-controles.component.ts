import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Peligro } from 'src/app/models/peligro.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PeligrosService } from 'src/app/services/peligros.service';

@Component({
  selector: 'app-sg-controles',
  templateUrl: './sg-controles.component.html',
  styles: [
  ]
})
export class SgControlesComponent implements OnInit {

  public openform:boolean = false;
  public listControles:any[] = [];
  @Input() public estadoModal:boolean = true;
  @Output('estadoModal') cerradoModal:EventEmitter<boolean> = new EventEmitter();
  @Input() public idpeligro:Peligro = {
    id_peligro : 0,
    nombre : '',
    id_clasificacion: 0,
    consecuencias: '',
    id_empresa: 0,
    nombreClasificacion: ''
  } ;


  public formControl = this.fb.group({
    nombre: ['',[Validators.required , Validators.minLength(5) ]],
    id_peligro: ['', [Validators.required]]
  });

   constructor(public fb:FormBuilder , private peligrosService:PeligrosService) { }

  ngOnInit(): void {
     
  }

  ngOnChanges():void{
    if(this.idpeligro.id_peligro > 0)
    {
    this.list();
    }
  }

  closeModalControles()
  {
    this.estadoModal = true;
    this.cerradoModal.emit(true);
  }

  save()
  {
    
    this.formControl.get('id_peligro')?.setValue(this.idpeligro.id_peligro);
    
    if(this.formControl.valid)
    { 
      this.peligrosService.saveControl(this.formControl.value)
      .subscribe((resp) =>
      {
        if(resp)
        {
          this.openform = false;
          this.formControl.reset();
          this.list();
        }
      })
    }
    
  }

  list()
  {
    this.peligrosService.listControles(this.idpeligro.id_peligro)
                  .subscribe((resp:any) => {
                    this.listControles = resp.response;

                  })
  }

  changeOpenForm(){ this.openform = true; }

  delete(id_control:any)
  {
    this.peligrosService.deleteControl(id_control)
      .subscribe((resp)=>{
        if(resp){
          this.list();
        }
      });
  }
   

}
