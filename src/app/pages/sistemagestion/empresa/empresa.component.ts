import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import {DropdownModule} from 'primeng/dropdown';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [
  ]
})
export class EmpresaComponent implements OnInit {

  public listEmpresa:any[] = [];
  public selectedEmpresa:any = {};

  

  editForm = this.fb.group({
    id_empresa:[],
    razon_social: ['' , [Validators.required]],
    nit: ['' , [Validators.required]],
    dv: [ '' , [Validators.required]],
    codigo_soporte:['' , [Validators.required]],
    logo:[],
    direccion:['' , [Validators.required]],
    prefijo:['' , [Validators.required]],
    html1:[],
    html2:[],
    html3: [],
    host:[],
    mail_send:[],
    password: [],
    port: []
  });
  constructor(private fb:FormBuilder , private sistemagestionService:SistemaGestionService) { }

  ngOnInit(): void {
    this.getlistEmpresa();
  }

  getlistEmpresa()
  {
    this.sistemagestionService.getlistEmpresa()
                              .subscribe((resp:any) => {
                                this.listEmpresa = resp.response;
                              });
  }

  onSelectedEmpresa(){
     
      this.updateForm(this.selectedEmpresa);
     
  }

  updateForm(empresa:any | null | undefined):void{
    if(empresa.id_empresa)
    {
      this.editForm.reset({...empresa} , {emitEvent: false , onlySelf:true});
    }
  }

  save()
  {
    this.sistemagestionService.updatedEmpresa(this.editForm.value)
                              .subscribe((resp:any) => {
                                  if(resp.response)
                                  {
                                    Swal.fire({
                                      icon: 'success',
                                      title: 'Actualizado con éxito',
                                      showConfirmButton: false,
                                        timer: 1500
                                    })
                                  }
                              } , (err:any) => {
                                Swal.fire({
                                  title:'Oops..',
                                  text:'error actualizando',
                                  icon:'error'
                                });
                              })
  }


}
