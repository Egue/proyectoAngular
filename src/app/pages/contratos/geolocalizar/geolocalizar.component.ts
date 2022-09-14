import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContratosService } from 'src/app/services/contratos.service';
import Swal from 'sweetalert2';
declare const L:any;
@Component({
  selector: 'app-geolocalizar',
  templateUrl: './geolocalizar.component.html',
  styles: [
  ]
})
export class GeolocalizarComponent implements OnInit {

  public map:any;
  public formCus = this.fb.group({
    cus: ['' , Validators.required]
  })
  public ubicacionGpsEstado:boolean = false;
  public ubicacionGps:any[] = [];

  public direccionCus:any = {
    direccion : '',
    id_contrato: ''
  };
  public mapAltura:String = '';
  public cargando:boolean = false;

  public latitud:any;
  public longitud:any;

  constructor(private fb:FormBuilder , private contratosService:ContratosService) { }

  ngOnInit(): void {
    if(!navigator.geolocation)
    {
      console.log('no es soportada');
    }
    
    this.whatchPosition();
  }

 whatchPosition()
 {
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`Lat: ${position.coords.latitude} , long: ${position.coords.longitude}`);
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
    }, (err) => {
      console.log(err);
    } , {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
 }


  getFindDireccionByCus()
  {
    
    if(this.formCus.valid)
    {
      this.ubicacionGpsEstado = false;
      const {cus} = this.formCus.value;

      this.contratosService.getFindDireccionByCus(cus)
                    .subscribe((resp:any) => {
                      this.direccionCus = resp.response; 
                      if(this.direccionCus.id_contrato > 0)
                      { 
                        this.getGeolocalizacion(this.direccionCus.id_contrato);
                      }else{
                        Swal.fire({
                          title:'Opps..',
                          text: this.direccionCus,
                          icon:'error'
                        })
                      }
                    })
    }
  }

  getGeolocalizacion(cus:string)
  {
    this.contratosService.getGpsFindById(cus)
                      .subscribe((resp:any) => {
                        this.ubicacionGps = resp.response;
                        if(this.ubicacionGps.length > 0)
                        { 
                          this.prepararMap(this.ubicacionGps[0].latitud , this.ubicacionGps[0].longitud);
                        }
                      })
  }
  nuevoGps()
  {
    if(this.ubicacionGps.length > 0)
    {
      Swal.fire({
        title: 'Esta seguro?',
        text: "Usted desea geolocalizar nuevamente al cus!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, nuevamente'
      }).then((result) => {
        if (result.isConfirmed) {
          this.prepararMap(this.latitud , this.longitud);
        }
      })

      
    }else{
      this.prepararMap(this.latitud , this.longitud);
    }
    
  }
  prepararMap(lat:any , lon:any)
  {

    this.ubicacionGpsEstado = true;
                          this.cargando = true;
                          this.mapAltura = 'map-altura';
                          if(this.map != undefined){ this.map.remove();}
                          setTimeout( () => {
                            this.cargando = false;
                            
                            this.loadMap( lat , lon );

                          } , 2000)
  }

  loadMap(latitud:any , longitud:any)
  {
    this.map = L.map('map').setView([latitud, longitud], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(this.map); 
    //crear markets
    
      /*var marker = new L.marker([this.marketsArray[i].latitud , this.marketsArray[i].longitud])
        .bindPopup(`<h3>cus:${this.marketsArray[i].id_contrato}</h3><hr><p>Latitud:${this.marketsArray[i].latitud}</p><p>Longitud:${this.marketsArray[i].longitud}</p>`)
        .addTo(map);*/
        L.marker([latitud, longitud]).addTo(this.map)
      
        

    
  
  }
  updatedGps()
  {
    const data = {
      id_contrato : this.direccionCus.id_contrato,
      latitud: this.latitud,
      longitud: this.longitud
    }

    if(this.ubicacionGps.length == 0)
    {
      this.contratosService.saveContratoGps(data)
                          .subscribe((resp:any) => {
                            
                            if(resp.response)
                            {
                              Swal.fire({ 
                                icon: 'success',
                                title: 'Creado con éxito',
                                showConfirmButton: false,
                                timer: 1500
                              })
                            }
                          } , (error) => {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Error al crear', 
                            })
                              
                          })

    }else{
      
      this.contratosService.updatedContratoGps(data)
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
                            } , (error) => {
                              Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error al actualizar', 
                              })
                            })
    }
  }

}
