import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { MessageService } from 'primeng/api';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
  ],
  providers: [MessageService]

})
export class DatosPersonalesComponent   {

  //recuperar id
  private _idUser:any;

  @Input()  
  set usuario(value:any)
  {
    this._idUser = value ; 
    this.getDatosFindById();
  }

  public tipoDocumento:any[] = [
    {name:'Cédula Ciudadania'},
    {name: 'Cédula Extranjeria'},
    {name:'Contraseña'},
  
  ];
  public formDatos = this.fb.group({
    id : '',
    id_user:'',
    tipo_documento:['', Validators.required],
    documento: ['' , [Validators.required , Validators.minLength(8)]],
    cargo:['', [Validators.required  , Validators.minLength(5)]],
    celular:''
  });
  constructor(private usuariosService:UsuariosService, private fb:FormBuilder , private messageService:MessageService) {
    //this.idUser =  this.route.snapshot.params['id'];

   }

  

  get usuario():any{

    return this._idUser;
  }

  getDatosFindById()
  {
      this.usuariosService.getfindByIdDatosPersonales(this.usuario).subscribe((resp:any) => {
         if(resp.response)
         {
          this.updatedForm(resp.response[0]); 
         }
      }, error => {
        //console.log(error.error['trace'])
      })
  }

  onSave()
  {
    //console.log(this.formDatos.value);
    if(this.formDatos.get('id')?.value)
    {
      this.usuariosService.updatedDatosPersonales(this.formDatos.value).subscribe({
        next: () =>{
          this.messageService.add({severity:'success' , summary:'Guardar' , detail:'Datos actualizados'});
          this.getDatosFindById();
        },
        error:(error) => {
          this.messageService.add({severity:'error' , summary:'Error' , detail:error.error});
        }
      })
      
    }else{
      this.formDatos.get('id_user')?.setValue(this.usuario);
    
      if(this.formDatos.valid)
      {
        this.usuariosService.saveDatosPersonales(this.formDatos.value).subscribe({
          next: () => {
            this.messageService.add({severity:'success' , summary:'Guardar' , detail:'Datos almacenados'})
             this.getDatosFindById();
          },
          error : (error) => {
            this.messageService.add({severity:'error' , summary:'Error' , detail:error.error})
          }
        })
        
      }
    }
  }

  updatedForm(datospersonales:any)
  {
      if(datospersonales)
      {
        this.formDatos.reset({...datospersonales} , {emitEvent:false , onlySelf:true});
      }
      else{
        this.formDatos.reset({});
      }
  }

}
