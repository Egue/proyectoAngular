import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {StepsModule} from 'primeng/steps';
import { interval, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-elementos-proteccion',
  templateUrl: './elementos-proteccion.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class ElementosProteccionComponent implements OnInit {
 
 

  public cargando:boolean = false;
  //validar si esta firmado

  public permiso:any = [];

  public listEPP:any[] = []; 
  
  public listEPCC:any[] = [];

  public listHerramienta:any[] = [];
  public first:number = 0;
  public rows:number = 10;
  public loading:boolean = false;

  //modal
  public modalToken:boolean = true;
  public estadoToken:boolean = false;
  public minutos:string = "01";
  public segundos:number = 59;
  public intervalSegSusb:Subscription | undefined;

  public formCodigo = this.fb.group({
    a: [ '' , [Validators.required , Validators.maxLength(1)]],
    b: [ '' , [Validators.required, Validators.maxLength(1)]],
    c: [ '' , [Validators.required, Validators.maxLength(1)]],
    d: [ '' , [Validators.required, Validators.maxLength(1)]],
    e: [ '' , [Validators.required, Validators.maxLength(1)]],
    f: [ '' , [Validators.required, Validators.maxLength(1)]],
  });
  /**estado token validado */
  public tokenValidado:boolean = false;
  public respValidacion:boolean = true;
  public msmToken:string = '';

  /**modal add bueno malo */
  public estadoModalBuenoMalo:boolean = true;
  public item:any;

  //permiso full
  public idPermiso:any;


  constructor(private sistemaGestionServices:SistemaGestionService , public auth:AuthService , private fb:FormBuilder,
    private activatedRoute:ActivatedRoute , private messageService:MessageService) { }

  ngOnInit(): void {
  //this.getInfoPermiso();
   this.activatedRoute.data.subscribe(({permiso}) => {
    if(permiso){
      this.idPermiso = permiso;
      
    }
   });
 
  }

//**abrir accordion */
onTabOpen(event:any)
{
  if(event.index == 0)
  {
    this.getlistEpp(this.idPermiso);
  }else if(event.index ==1)
  {
    this.getlistEpcc(this.idPermiso);
  }else if(event.index ==2)
  {
    this.getlistHerramientas(this.idPermiso);
  }
}
  getInfoPermiso()
  {
    
      this.getlistEpcc(this.idPermiso);
      
      this.getlistHerramientas(this.idPermiso);
       
  }

  crearEmpleadoGeneralidades(tipo:string)
  {
     const data = {
      empleado_id : this.auth.usuario.id,
      permiso_id : this.idPermiso,
      tipo: tipo,
      id_empresa : this.auth.usuario.id_empresa
     } 

     this.sistemaGestionServices.createEmpleadoGeneralidades(data)
                              .subscribe((resp:any) => {
                                
                                
                                if(resp.response)
                                { 
                                  //this.getInfoPermiso()
                                  
                                  if(tipo ==="EPP")
                                  {
                                    this.getlistEpp(this.idPermiso);
                                    
                                  }else if(tipo === "EPCC")
                                  {
                                    this.getlistEpcc(this.idPermiso);
                                  }else if(tipo === "Herramientas")
                                  {
                                    this.getlistHerramientas(this.idPermiso);
                                  }
                                }
                              } , (err) => {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: err.error
                                })
                              });
  }


  getlistEpp(permiso_id:any)
  {
     
      const epp = {
        empleado_id : this.auth.usuario.id,
        permiso_id : permiso_id,
        tipo: 'EPP'
      }   

      this.sistemaGestionServices.getEmpleadoGeneralidadesFilterType(epp)
                                  .subscribe((resp:any) => {
                                    this.listEPP = resp.response;   
                                    if(this.listEPP.length == 0)
                                    {
                                      this.crearEmpleadoGeneralidades('EPP');
                                      
                                    }
                                     
                                  } , error => {
                                     
                                  })

  }

  
  getlistEpcc(permiso_id:any)
  {
    const epcc = {
      empleado_id : this.auth.usuario.id,
      permiso_id : permiso_id,
      tipo: 'EPCC'
    }
    this.sistemaGestionServices.getEmpleadoGeneralidadesFilterType(epcc)
                                .subscribe((resp:any) => {
                                  this.listEPCC = resp.response
                                  if(this.listEPCC.length == 0){
                                    this.crearEmpleadoGeneralidades('EPCC');
                                  }
                                })
  }
  getlistHerramientas(permiso_id:any)
  {
    const epcc = {
      empleado_id : this.auth.usuario.id,
      permiso_id : permiso_id,
      tipo: 'Herramientas'
    }
    this.sistemaGestionServices.getEmpleadoGeneralidadesFilterType(epcc)
                                .subscribe((resp:any) => {
                                  this.listHerramienta = resp.response
                                  if(this.listHerramienta.length === 0)
                                  {
                                    this.crearEmpleadoGeneralidades('Herramientas');
                                  }
                                })
  }
  //**mensaje de alerta */
  showMessage()
  {
    this.messageService.add({severity:'warn' , summary:'Alerta' , detail:'para seleccionar No aplica, no debe existir un item seleccionado'})
   
  }

  /**validar si estan todos activos */
  validarList(list:any) 
  {
      let count = 0;
      
      list.forEach((element: { active: string; }) => {
         
            if(element.active == "Y")
            {
              
              count++;
            }
      });
      if(count > 0)
      {
        return true;
      }

      return false;
  }

  validarNoAplica(list:any)
  {
    let count = 0;

    list.forEach((element: { nombre: string; active: string; }) => {
      if(element.nombre ==='No aplica' || element.nombre ==='No aplica' || element.nombre === 'no aplica')
      {
          if(element.active === 'Y')
          {
            count++;
          }
      }
    })

    if(count > 0)
    {
      return true;
    }else{
      return false;
    }
    
  }



buenoMalo(item:any , estado:string , tipo:string)
{  
    if(item.nombre === 'No aplica' || item.nombre === 'no aplica' || item.nombre === 'No Aplica')
    {  
       
      if(item.active == 'Y')
      {
        this.changeItem(item, estado);
      }else{
        switch (tipo){
          case 'epp':{
            if(this.validarList(this.listEPP))
            {
              this.showMessage();
            }else{
               this.changeItem(item , estado);
            }
            break;
          }
          case 'epcc': {
              if(this.validarList(this.listEPCC))
            {
              this.showMessage();
            }else{
              this.changeItem(item , estado);
            }
            break;
          }
          case 'herramientas' : {
              if(this.validarList(this.listHerramienta))
            {
              this.showMessage();
            }else{
              this.changeItem(item , estado);
            }
            break;
          }
  
        }
      }
      //en caso que el checbox esta activado
    

    }else{
      switch(tipo){
        case 'epp':{
          if(this.validarNoAplica(this.listEPP))
          {
            this.messageService.add({severity:'warn' , summary:'No aplica' , detail:'Tiene activo no aplica, deshabilite No aplica'})
          }else{
            this.changeItem(item , estado);
          }

          break;
        }
        case 'epcc':{
          if(this.validarNoAplica(this.listEPCC))
          {
            this.messageService.add({severity:'warn' , summary:'No aplica' , detail:'Tiene activo no aplica, deshabilite No aplica'})
          }else{
            this.changeItem(item , estado);
          }

          break;
        }
        case 'herramientas':{
          if(this.validarNoAplica(this.listHerramienta))
          {
            this.messageService.add({severity:'warn' , summary:'No aplica' , detail:'Tiene activo no aplica, deshabilite No aplica'})
          }else{
            this.changeItem(item , estado);
          }

          break;
        }
      }
      
    }
  
}

changeItem(item:any , estado:string)
{
  if(item.inspeccion === estado)
  {
   item.inspeccion = null;
   item.active = 'N'
  }else{

    item.inspeccion = estado;
    item.active = 'Y'    
    
}

this.sistemaGestionServices.editEmpleadoGeneralidades(item)
                                .subscribe((resp:any) => { 
                                   
                                } , (err) => {
                                  
                                  Swal.fire({
                                    title:'Oops..',
                                    text:'error actualizando',
                                    icon:'error'
                                  });
                                });

}

 

back()
{
  window.history.back();
}
}
