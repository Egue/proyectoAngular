import { Component, OnInit } from '@angular/core';
import { ContratosService } from '../../../services/contratos.service';


declare   const L:any;
@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styles: [
  ]
})
export class GeolocalizacionComponent implements OnInit {

  public marketsArray:any[] = [];
  public cusCantidad:number = 0;
  public btnMap:boolean = false;
  public selectMunicipio:boolean = false;
  public selectBarrio:boolean = false;
  public municipioList:any[] = [];
  //https://stackoverflow.com/questions/42968243/how-to-add-multiple-markers-in-leaflet-js
    constructor(private contratoService: ContratosService) { 
    this.getList();
  }

  /**
   * SELECT listas_barrios.nombre, lista_municipios.municipio
FROM listas_barrios
INNER JOIN lista_municipios ON lista_municipios.id_municipio = listas_barrios.id_municipio
   */
  ngOnInit(): void {
    
     
  }

  loadMap()
  {
    var map = L.map('map').setView([5.324, -72.393], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map); 
    //crear markets
    for(var i = 0 ; i < this.marketsArray.length; i++)
    {
      var marker = new L.marker([this.marketsArray[i].latitud , this.marketsArray[i].longitud])
        .bindPopup(`<h3>cus:${this.marketsArray[i].id_contrato}</h3><hr><p>Latitud:${this.marketsArray[i].latitud}</p><p>Longitud:${this.marketsArray[i].longitud}</p>`)
        .addTo(map);
      
        
 
    } 
   
  }


  getList()
  {
    this.contratoService.list()
    .subscribe(
      (data:any) => {
        this.marketsArray = data.response; 
        this.cusCantidad = this.marketsArray.length;
      }
    );
  }

  searchMunicipios(event:any)
  {
     
    this.contratoService.municipiosList(event.target.value)
    .subscribe((resp:any) => {
      this.municipioList = resp.response;
      this.selectMunicipio = true;
    })
  }

  searchBarrio(event:any)
  {
    this.contratoService.barriosList(event.value)
    .subscribe((resp:any) => {
      console.log(resp.response);
    })
  }

}
