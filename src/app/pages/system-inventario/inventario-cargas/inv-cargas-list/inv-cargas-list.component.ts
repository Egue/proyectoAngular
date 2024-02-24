import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { InventarioCargasService } from '../services/inventario-cargas.service';

@Component({
  selector: 'app-inv-cargas-list',
  templateUrl: './inv-cargas-list.component.html',
  styles: [
  ]
})


export class InvCargasListComponent implements OnInit {

  public pipe:DatePipe = new DatePipe('en-US');

  public rangeDate:any[] = [];

  public loadingRanges:boolean = false;

  public listIngreso:any[] = [];

  public loading:boolean = false;

  constructor(private inventarioCargaService:InventarioCargasService , public authService:AuthService) { }

  ngOnInit(): void {
  }

  searchRange()
  {
    this.loading = true;
    const data = {
      valor1 : this.pipe.transform(this.rangeDate[0] , 'yyyy-MM-dd'),
      valor2 : this.pipe.transform(this.rangeDate[1] , 'yyyy-MM-dd')
    }
 
    this.inventarioCargaService.inventarioCargaFindBetween(data).subscribe((resp:any) => {
      this.listIngreso = resp.response;
      //console.log(this.listIngreso);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

}
