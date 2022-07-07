import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Peligro } from 'src/app/models/peligro.model';
import Swal from 'sweetalert2';
import { PeligrosService } from '../../../services/peligros.service';

@Component({
  selector: 'app-peligros',
  templateUrl: './peligros.component.html',
  styles: [
  ]
})
export class PeligrosComponent implements OnInit {

  public activadoButtonPeligro:boolean = true; 
  public peligroSeleccionado:string = '';
  public modalEstado:boolean = true;
  public modalPeligro:boolean = true;
  public clasificacionList:any[]=[];
  public cargando:boolean = false;
  public peligrosList:Peligro[] = [];
  public selectionClasificacion:number = 0;
  public estadoModalControles:boolean = true;
  public idpeligro:Peligro = {
    id_peligro : 0,
    nombre : '',
    id_clasificacion: 0,
    consecuencias: '',
    id_empresa: 0,
    nombreClasificacion: ''
  } ;

  public formClasificacion = this.fb.group({
    nombre:['', [Validators.required , Validators.minLength(5)]]
  });

  public formPeligro = this.fb.group({
    nombre:['',[Validators.required , Validators.minLength(4)]],
    consecuencias:['' , [Validators.required]],
    id_clasificacion:['' , [Validators.required]],
    id_empresa:['']
  });



  constructor(
    private fb: FormBuilder , 
    private peligrosService: PeligrosService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.clasificacionListLoad();

  }
  //onchange del select, para activar el formControl
  onChangeClasificacion(event:any){
    this.formPeligro.get('id_clasificacion')?.setValue(event.value);

  }

  savePeligro()
  {
    
    this.formPeligro.get('id_empresa')?.setValue(this.authService.usuario.id_empresa);
    if(this.formPeligro.valid)
    {
      this.cerrarModalPeligro();
      this.peligrosService.savePeligro(this.formPeligro.value)
              .subscribe((response) => {
                if(response)
                {
                  Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success');
                  this.formPeligro.reset();
                  
                  this.listPeligrosLoad(this.selectionClasificacion , this.authService.usuario.id_empresa);
                }
              });
    } 
  }

  saveClasificacion()
  {
    if(this.formClasificacion.valid)
    {
      this.cerrarModal(); 
      this.peligrosService.saveClasificacion(this.formClasificacion.value)
      .subscribe((response)=> {
        if(response)
         {
          Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success'); 
          this.formClasificacion.reset();
          this.clasificacionListLoad();
          }
      }, (err) => {
        Swal.fire('Error' , err.error.response , 'error');
      });
      
    }
    
    
  }

  //cargar Lista de clasificacion
  clasificacionListLoad()
  {
    this.peligrosService.listClasificacion()
    .subscribe((resp:any) => {
      this.clasificacionList = resp.response;
    })
  }

  //cargar Lista de peligros
  listPeligrosLoad(clasificacion:number, empresa:number )
  {
    const data = {id_clasificacion: clasificacion , id_empresa:empresa};
    this.cargando = true;
    this.peligrosService.listPeligros(data)
                      .subscribe((resp:any) =>{
                         
                        this.peligrosList = resp;
                        this.cargando = false;
                      } )
  }


  //evento de modal
  activarModal(){ this.modalEstado = false; }
  cerrarModal(){ this.modalEstado = true;}
  activarModalPeligro(){this.modalPeligro = false; }
  cerrarModalPeligro(){this.modalPeligro = true; }

  //seleccionar la categoria y taer el evento
  searchPeligroByClasificacion(item:any)
  {
    
    this.selectionClasificacion = item.id_clasificacion;
    this.listPeligrosLoad(this.selectionClasificacion , this.authService.usuario.id_empresa);
    this.peligroSeleccionado = item.nombre;
    this.activadoButtonPeligro = false;
  }

  openModelControles(peligro:Peligro)
  {
    this.estadoModalControles = false;
    this.idpeligro = peligro;
  }

  deletePeligro(peligro:Peligro)
  {
    this.peligrosService.deletePeligro(peligro)
      .subscribe((resp) =>{
        if(resp)
        {
          this.listPeligrosLoad(this.selectionClasificacion , this.authService.usuario.id_empresa);
        }
      });
  }
  

}
