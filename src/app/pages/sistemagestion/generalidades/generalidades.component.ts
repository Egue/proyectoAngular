import { Component, OnInit } from '@angular/core';
import { SistemaGestionService } from '../../../services/sistema-gestion.service';
import { AuthService } from '../../../auth/auth.service';
import { TickOptions } from 'chart.js';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-generalidades',
  templateUrl: './generalidades.component.html',
  styles: [
  ]
})
export class GeneralidadesComponent implements OnInit {

  public tipoSelected:string = '';

  public loading:boolean = true;
  public listTipoGeneralidades: any[] = [];
  
  public modalFormGeneralidades:boolean = true;
  public formGeneralidad = this.fb.group({
    nombre : ['' , Validators.required],
		tipo: ['' , Validators.required],
		id_empresa: ['' , Validators.required],
    item: ['',  Validators.required]
  });

  //tabla
  public first:number = 0;
  public rows:number = 10;
  public listGeneralidadesByTipo:any[] = [];
  public cargadoReporte:boolean = false;
  constructor(private sistemaGestionService:SistemaGestionService , private authService:AuthService , private fb:FormBuilder) {
     this.sistemaGestionService.generalidadesDisct(this.authService.usuario.id_empresa)
                        .subscribe((resp:any) => {
                          this.listTipoGeneralidades = resp.response;
                          this.loading = false;
                        });

   }

  ngOnInit(): void {
  }
  save()
  {
    this.formGeneralidad.get("id_empresa")?.setValue(this.authService.usuario.id_empresa); 
    if(this.formGeneralidad.valid){
      console.log(this.formGeneralidad.value);
      this.sistemaGestionService.generalidadesSave(this.formGeneralidad.value)
                                          .subscribe((resp:any) => {
                                            if(resp.success)
                                            {
                                              Swal.fire({ 
                                                icon: 'success',
                                                title: 'Creado',
                                                showConfirmButton: false,
                                                timer: 1500
                                              })
                                              this.modalFormGeneralidades = true;
                                              this.formGeneralidad.reset();
                                              if(this.tipoSelected != '')
                                              {
                                                this.findByTipo(this.tipoSelected);
                                              }
                                            }
                                          } , (error) => {
                                            Swal.fire({
                                              title:'Oops..',
                                              text:'Error inesperado',
                                              icon:'error'
                                            });
                                            this.modalFormGeneralidades = true;
                                          })
    }
  }

  findByTipo(tipo:any)
  {
    this.tipoSelected = tipo;
    const find = {
      tipo : tipo.tipo,
      id_empresa : this.authService.usuario.id_empresa
    }

    this.sistemaGestionService.generalidadesFindByTipo(find)
                            .subscribe((resp:any) => {
                              this.listGeneralidadesByTipo = resp.response;
                              this.cargadoReporte = true;
                            })
  }



  //table
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listTipoGeneralidades ? this.first === (this.listTipoGeneralidades.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listTipoGeneralidades ? this.first === 0 : true;
}

cerrarModalGeneralidades()
{
  this.modalFormGeneralidades = true;
}
openModalGeneralidades()
{
  this.modalFormGeneralidades = false;
}
}
