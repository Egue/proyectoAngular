import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api'; 
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
@Component({
  selector: 'app-permiso-graficos',
  templateUrl: './permiso-graficos.component.html',
  styleUrls: ['./permiso-graficos.component.css'],
})
export class PermisoGraficosComponent implements OnInit {


selectedNode: any;

  constructor(private _sistemaGestionService:SistemaGestionService) { }


  public data:TreeNode[] = [];

  public pipe:DatePipe = new DatePipe('en-US');

  public fecha:any ="";
  public value:Date | undefined;

  ngOnInit(): void {
     

       this.get_data_tree_node( );
    
  }

  

  get_data_tree_node( )
  {
    const data = {
      fecha: this.fecha
    }

    this._sistemaGestionService.reporte_tree_node(data).subscribe((resp:any) => {

        this.data = [resp.response];
        console.log(this.data);
    })
  }

  onNodeSelect($event: any) {
    throw new Error('Method not implemented.');
    }

  search() {
      this.fecha = this.pipe.transform(this.value , 'yyyy-MM-dd');
      this.get_data_tree_node();
      
      }


}
