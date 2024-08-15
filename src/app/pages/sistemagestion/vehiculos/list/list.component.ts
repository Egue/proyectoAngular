import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { VehiculoServiceService } from '../services/vehiculo-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  public listVehiculo:any[] = [];
  public loading:boolean = false;
  public card:any = {
    list : false,
    report : false,
    reportday : false,
  }
  dataKilometrajeAcumulado: any;
  dataKilometrajeIndividual:any
  basicOptions: any;
  selectedVehiculo:any;
  rangeDates:any;
  public pipe:DatePipe = new DatePipe('en-US');

  constructor(private vehiculoService:VehiculoServiceService , private authService:AuthService) { }

 
  ngOnInit(): void {
    
  }

  get_vehiculos()
  {
    this.getFindByEmpresa(this.authService.usuario.id_empresa);

    this.card.list = true;
  }

  getFindByEmpresa(idEmpresa:number)
  {
    this.vehiculoService.vehiculoList(idEmpresa).subscribe({
      next:(resp:any) => {
                          this.listVehiculo = resp.response;
                                          if(this.listVehiculo.length > 0)
                                            {
                                                this.listVehiculo.forEach((element) => {
                                                  element.name_all = `${element.marca_nombre} | ${element.vehiculo_placa}`
                                                })
                                            }
       },error:(error) => {
        console.log(error)
       }
    })
  }

  show_reporte()
  {
    this.card.report = true;
    this.getFindByEmpresa(this.authService.usuario.id_empresa);
    
  }

  show_reporte_permiso()
  {
    this.card.reportday = true;
  }

  delete(id:any)
  {
    Swal.fire({
      icon:'warning',
      title: 'Esta seguro que desea Eliminar el vehiculo?', 
      showCancelButton: true,
      confirmButtonText: 'Eliminar', 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
      this.vehiculoService.delete(id)
                    .subscribe((resp:any) => {
                      this.getFindByEmpresa(this.authService.usuario.id_empresa);
                      Swal.fire({ 
                        icon: 'success',
                        title: 'Eliminado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    })

      }  
    })
  }

  clear(table: any) {
    table.clear();
}

search_reporte_kilometros()
{
  const data = {
    vehiculo_id : this.selectedVehiculo.vehiculo_id,
    initial : this.pipe.transform(this.rangeDates[0] , 'yyyy-MM-dd'),
    finally : this.pipe.transform(this.rangeDates[1] , 'yyyy-MM-dd')
  }
  this.vehiculoService.reporte_kilometraje(data).subscribe({
    next:(resp:any) => {
      this.update_charts(resp.response);
    } 
  })
}

update_charts(data:any){
  this.dataKilometrajeAcumulado = {
    labels: data.acumulado.meses,
    datasets: [
         
        {
            label: 'Kilometraje Acumulado',
            backgroundColor: '#58D68D',
            data: data.acumulado.kilometros
        }
    ]
    };
  
  this.dataKilometrajeIndividual = {
    labels: data.diadia.meses ,
    datasets : [
      {
        label: 'Kilometraje diario',
        backgroundColor:'#FFB111',
        data:  data.diadia.kilometros
      }
    ]
  }
}
}
