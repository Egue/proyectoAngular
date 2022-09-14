import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {StepsModule} from 'primeng/steps';
import { interval, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-elementos-proteccion',
  templateUrl: './elementos-proteccion.component.html',
  styles: [
  ]
})
export class ElementosProteccionComponent implements OnInit {
 
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
  public estadoModalBuenoMalo = true;
  public item = {};




  constructor(private sistemaGestionServices:SistemaGestionService , public auth:AuthService , private fb:FormBuilder) { }

  ngOnInit(): void {
  this.getInfoPermiso();
   
  }

  getInfoPermiso()
  {
    this.sistemaGestionServices.getInfoPermisoEmpleado(this.auth.usuario.id)
                                .subscribe((resp:any) => {
                                  this.permiso = resp.response;  
                                  if(this.permiso.length > 0)
                                  { 
                                    this.getlistEpp(this.permiso[0].id_permiso);
                                    this.getlistEpcc(this.permiso[0].id_permiso);
                                    this.getlistHerramientas(this.permiso[0].id_permiso);
                                  }
                                });
  }

  crearEmpleadoGeneralidades(tipo:string)
  {
     const data = {
      empleado_id : this.auth.usuario.id,
      permiso_id : this.permiso[0].id_permiso,
      tipo: tipo,
      id_empresa : this.auth.usuario.id_empresa
     } 

     this.sistemaGestionServices.createEmpleadoGeneralidades(data)
                              .subscribe((resp:any) => {
                                
                                
                                if(resp.response)
                                { 
                                  this.getInfoPermiso()
                                  
                                  Swal.fire({
                                    icon: 'success',
                                    title: 'Lista cargada con exito',
                                    showConfirmButton: false,
                                      timer: 1500
                                  })
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
                                })
  }
  statusActive(epp:any)
  {
    if(epp.item.active == 'Y')
    {
      epp.item.active = 'N'
    }else{
      epp.item.active = 'Y'
    }
    
    this.sistemaGestionServices.editEmpleadoGeneralidades(epp.item)
                                .subscribe((resp:any) => { 
                                } , (err) => {
                                  Swal.fire({
                                    title:'Oops..',
                                    text:'error actualizando',
                                    icon:'error'
                                  });
                                });
    //this.modalBuenoMalo(epp); 
 
  }


/*
* Tabla prime
*/
//functiojn primeng
next()
{
  this.first = this.first + this.rows;
}
prev()
{
  this.first = this.first - this.rows;
}
reset() {
  this.first = 0;
}
isLastPage():boolean{
  return this.listHerramienta ? this.first === (this.listHerramienta.length - this.rows):true;
}
isFirstPage():boolean{
  return this.listHerramienta ? this.first === 0 : true;
}
clear(table:any)
{
  table.clear();
}
/*fin tabla */

cerrarModalToken()
{
  this.modalToken = true;
}
OpenModal()
{
  this.modalToken = false;
}
generarToken()
{
  this.estadoToken = true; 
  this.sendInfoGenerateToken();
  this.intervalSegSusb = this.intervalsegundos().subscribe(
          valor => { 
            this.segundos = this.segundos - 1;

            if(valor==60)
            {
              this.minutos = "00";
              this.segundos = 59;
            }
            if(valor == 120)
            { 
              this.estadoToken = false; 
              this.minutos = '1';
              this.segundos = 59;
              this.formCodigo.reset();
              this.intervalSegSusb?.unsubscribe();
            }
          }
  );
}
sendInfoGenerateToken()
{
  const data = {
    id_user: this.auth.usuario.id,
    email: this.auth.usuario.email,
    user: this.auth.usuario.user,
    id_permiso: this.permiso[0].id_permiso,
    id_empresa: this.auth.usuario.id_empresa
  }
  this.sistemaGestionServices.generateTokenFirma(data)
                      .subscribe();
}

intervalsegundos():Observable<number>
{
  return interval(1000)
    .pipe(
      map(valor => {return valor + 1})
    )
}

validarToken()
{
  
  const {a ,b,c,d,e,f} = this.formCodigo.value;

  const data = {
    token : a+b+c+d+e+f,
    id_user: this.auth.usuario.id
  } 
  this.sistemaGestionServices.validarTokenMail(data)
                              .subscribe((resp:any) => {
                                this.tokenValidado = true;
                                //cuando se valide correctamento
                                this.estadoToken = false; 
                                this.minutos = '1';
                                this.segundos = 59;
                                this.formCodigo.reset();
                                this.intervalSegSusb?.unsubscribe();
                                this.cerrarModalToken();

                              } , (error) => {
                                this.respValidacion = false;
                                this.msmToken = 'token no valido';
                              })
}

firmarPermiso()
{
  const data = {
    id_permiso : this.permiso[0].id_permiso,
    id_empleado: this.auth.usuario.id
  }
  this.sistemaGestionServices.firmarElectronicamente(data)
                              .subscribe((resp:any) => {
                                if(resp.success)
                                {
                                  Swal.fire({
                                    icon:'success',
                                    text:'Firmado exitosamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                }
                              } , (error) => {
                                Swal.fire({
                                  title:'Oops..',
                                  text: 'Error al firmar consulte con el administrador',
                                  icon: 'error'
                                })
                              })
  
}

modalBuenoMalo(item:any)
{
  this.item = item;
  this.estadoModalBuenoMalo = false;
}

buenoMalo(item:any)
{
  if(item.inspeccion == null)
  {
    item.inspeccion = 1 ;
  }else{
    item.inspeccion = null;
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
}
