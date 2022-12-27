import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  public lugarTrabajo:string = '';
  public id_permiso:any;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({permiso})=> {
      if(permiso)
      {
        this.lugarTrabajo = permiso.lugar_de_trabajo,
        this.id_permiso = permiso.id_permiso
      }
    })
  }

}
