import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { VehiculoServiceService } from '../services/vehiculo-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  constructor(private vehiculoService:VehiculoServiceService , private authService:AuthService) { }

  public listVehiculo:any[] = [];
  public loading:boolean = true;
  ngOnInit(): void {
    this.getFindByEmpresa(this.authService.usuario.id_empresa)
  }

  getFindByEmpresa(idEmpresa:number)
  {
    this.vehiculoService.vehiculoList(idEmpresa)
                          .subscribe((resp:any) => {
                            this.listVehiculo = resp.response;
                            this.loading = false;
                          })
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

}
