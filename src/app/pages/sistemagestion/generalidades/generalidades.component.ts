import { Component, OnInit } from '@angular/core';
import { SistemaGestionService } from '../../../services/sistema-gestion.service';
import { AuthService } from '../../../auth/auth.service';
import { TickOptions } from 'chart.js';

@Component({
  selector: 'app-generalidades',
  templateUrl: './generalidades.component.html',
  styles: [
  ]
})
export class GeneralidadesComponent implements OnInit {


  public listTipoGeneralidades: any[] = [];
  

  //tabla
  public first:number = 0;
  public rows:number = 10;
  public listGeneralidadesByTipo:any[] = [];
  public cargadoReporte:boolean = false;
  constructor(private sistemaGestionService:SistemaGestionService , private authService:AuthService) {
     this.sistemaGestionService.generalidadesDisct(this.authService.usuario.id_empresa)
                        .subscribe((resp:any) => {
                          this.listTipoGeneralidades = resp.response;
                        });

   }

  ngOnInit(): void {
  }

  findByTipo(tipo:any)
  {
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
}
