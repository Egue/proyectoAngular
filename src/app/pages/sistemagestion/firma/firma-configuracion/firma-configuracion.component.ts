import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-firma-configuracion',
  templateUrl: './firma-configuracion.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class FirmaConfiguracionComponent implements OnInit {

  public listFirmas:any[] = [];

  public DialogFirma:boolean = false;

  public loading:boolean = false;

  public selectedUser:any;

  _empresas:any[] = [];

  selectedEmpresa:any;

  visibleDialog:boolean = false;

  _tipo:any[] = [
    {tipo : "APROBÓ" , value:'aprobo'},
    {tipo : "REVISIÓN SST" , value: 'revisostt'},
    {tipo: "COORDINADOR ALTURAS" , value: 'coordaltura'}
  ];

  _usuarios:any[] = [];


formFirma = this.fb.group({
  id_empresa :['' , Validators.required],
  id_user: ['' , Validators.required],
  cargo :['' , Validators.required],

});
  constructor(private _auth:AuthService , 
    private _sistemgestionService:SistemaGestionService , public messageService:MessageService
    , private fb:FormBuilder,
    private _usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.getListEmpresa();
  }

  get usuarios()
  {
    return this._usuarios;
  }
  set usuarios(value:any[])
  {
    this._usuarios = value;
  }

  get tipo()
  {
    return this._tipo;
  }

  set empresas(value:any[])
  {
    this._empresas = value;
  }

  get empresas()
  {
    return this._empresas;
  }

  ///////////////////////////////////////////////////////////
  getListEmpresa()
  { 
      if(this._auth.usuario.role === "ADMIN_ADMIN")
      {
        //consultar list
        this._sistemgestionService.getlistEmpresa().subscribe((resp:any) => {
          this.empresas = resp.response;
        })
      }
  } 


  openNew(){
    this.visibleDialog = true;
  }

  validate()
  {
    
     if(this.formFirma.valid)
     {
      
        this.save();
     }
  }

  changeUser(event:any)
  {
    this.formFirma.get('id_user')?.setValue(event.id);
  }

  save()
  {
    this._sistemgestionService.firmarPermisosSave(this.formFirma.value).subscribe((resp:any) => {
      this.visibleDialog = false;
      this.messageService.add({severity:'success' , summary:'Creado' , detail:'Creado con éxito' })
      
    } , error => {
      this.visibleDialog = false;
      this.messageService.add({severity:'error' , summary:'Error' , detail:'Error inesperado'})
    })
  }

  getUsuarios($event:any)
  {
       if(this.formFirma.get("id_empresa")?.value)
       {
        const data = {
          name : $event.query,
          id_empresa : this.formFirma.get("id_empresa")?.value
        }
        this._usuariosService.findByNameAndEmpresa(data).subscribe((resp:any) => {

          this.usuarios = resp.response;
          //console.log(resp.response);
        })
       }
  }

  getFirmas()
  {
    if(this.selectedEmpresa)
    {
      this.loading = true;
      this._sistemgestionService.firmasGetFindByEmpresa(this.selectedEmpresa.id_empresa).subscribe((resp:any) => {
        this.listFirmas = resp.response;
       // console.log(resp.response)
        this.loading = false;
      } , error => {
        this.loading =  false;
          this.messageService.add({severity:'error' , summary:'Error' , detail:'Error inesperado consulte con el Administrador'})
      })
    
    }else{
      this.messageService.add({severity:'info' , summary:'Campo solicitado' , detail:'Elija una empresa a buscar'})
    }

  }

  openDialogFirma(item:any){
    this.DialogFirma = true;
    this.selectedUser =  item;
  }

   

}
