import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { VehiculoServiceService } from '../services/vehiculo-service.service';

@Component({
  selector: 'app-reportexdia',
  templateUrl: './reportexdia.component.html',
  styleUrls: ['./reportexdia.component.css']
})
export class ReportexdiaComponent implements OnInit {

  value:any;

  pipe:DatePipe = new DatePipe('en-US');

  listVehiculo:any[] = [];

  constructor(private authService:AuthService , private vehiculoService:VehiculoServiceService) { }

  ngOnInit(): void {
  }

  search()
  {
    const data = {
      fecha : this.pipe.transform(this.value , 'yyyy-MM-dd'),
      id_empresa : this.authService.usuario.id_empresa
    }
    this.vehiculoService.reporte_permiso_vehiculos(data).subscribe({
      next:(resp:any) => {
        this.listVehiculo = resp.response;
      },
      error:(error) => {
        console.log(error)
      }
    })

   
  }

}
