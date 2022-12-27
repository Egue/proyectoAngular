import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PeligrosService } from 'src/app/services/peligros.service';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  public permiso:number = 0;
  public modalPeligros:boolean = true;

  public loadingInModal:boolean = false;

  public listPermisoPeligro:any[] = [];
  public cargando:boolean = false;

  //PELIGROS list
  
  
  public listCategorias:any[] = [];
  public listPeligros:any[] = [];
  public categoriaOculta:boolean = true;
  public peligrosOculta:boolean = false;

  constructor(private activateRoute:ActivatedRoute, 
    private authService:AuthService , 
    private sistemaGestionService:SistemaGestionService,
    private peligrosService:PeligrosService,
    private location:Location) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(({permiso}) => {
      if(permiso)
      {
        this.permiso = permiso;
        this.getListPermisoPeligro();
      }
    })
  }

  getListPermisoPeligro()
  {
    this.cargando = true;
    this.sistemaGestionService.getListPermisoPeligro(this.permiso)
                              .subscribe((resp:any) => {
                                this.listPermisoPeligro = resp.response; 
                                this.cargando = false;
                              })
  }

  deletePermisoPeligro(item:any)
  {
    this.sistemaGestionService.deletePermisoPeligro(item.permiso_peligro_id)
                            .subscribe((resp:any) => {
                              this.getListPermisoPeligro();
                            })
  }

  savePermisoPeligro(item:any)
  {
    const data = {
      usuario_id: this.authService.usuario.id,
      permiso_id: this.permiso,
      peligro_id: item.id_peligro
    }
    this.sistemaGestionService.savePermisoPeligro(data)
                        .subscribe((resp) => {
                          this.getListPermisoPeligro();
                          this.closeModalPeligros();

                        })

  }

  openModalPeligros()
  {
    this.modalPeligros = false;
    this.loadingInModal = true;
    this.getListCategorias();
  }
  closeModalPeligros()
  {
    this.modalPeligros = true;
    this.peligrosOculta = false;
    this.categoriaOculta = true;
  }

  getListCategorias()
  {
    this.peligrosService.listClasificacion()
                        .subscribe((resp:any) => {
                          this.listCategorias = resp.response;
                          this.loadingInModal = false;
                        })
  }


  getListPeligros(item:any)
  {
    this.categoriaOculta = false;
    this.loadingInModal = true;
    const data = {
      id_clasificacion:item.id_clasificacion,
      id_empresa: this.authService.usuario.id_empresa
    }

    this.peligrosService.listPeligros(data)
                          .subscribe((resp:any) => {
                            this.listPeligros = resp;
                            this.peligrosOculta = true;
                            this.loadingInModal = false;
                          })
    
  }


  modalAtrasPeligros()
  {
    this.categoriaOculta = true;
    this.peligrosOculta = false;
  }

  back():void
  {
    this.location.back();
  }
 


}
