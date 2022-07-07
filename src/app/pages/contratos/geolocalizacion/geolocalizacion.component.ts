import { Component, OnInit } from '@angular/core';
import { ContratosService } from '../../../services/contratos.service'; 
//nfimport {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {DatePipe} from '@angular/common'; 
import { PaginatorModule } from 'primeng/paginator';
import * as FileSaver from 'file-saver';
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
  public barriosList:any[] = [];
  public cargando:boolean = false;
  public rangeDates:Date[]  = [];
  public cargandoReporte:boolean=false;
  public pipe:DatePipe = new DatePipe('en-US');
  public tableContratos:any[] = [];
  public mapAltura:string = '';

  //table primeng
  public first:number = 0;
  public rows:number = 10;
  
  //https://stackoverflow.com/questions/42968243/how-to-add-multiple-markers-in-leaflet-js
    constructor(private contratoService: ContratosService) { 
     
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
      /*var marker = new L.marker([this.marketsArray[i].latitud , this.marketsArray[i].longitud])
        .bindPopup(`<h3>cus:${this.marketsArray[i].id_contrato}</h3><hr><p>Latitud:${this.marketsArray[i].latitud}</p><p>Longitud:${this.marketsArray[i].longitud}</p>`)
        .addTo(map);*/
        var circle = new L.circle([this.marketsArray[i].latitud , this.marketsArray[i].longitud],
          {color:'red' , fillColo: '#f03' , fillOpacity:0.5, radius:10})
          .bindPopup(`<h3>cus:${this.marketsArray[i].id_contrato}</h3><hr><p>Latitud:${this.marketsArray[i].latitud}</p><p>Longitud:${this.marketsArray[i].longitud}</p>`)
          .addTo(map);
      
        
 
    } 
   
  }


  getList(event:any)
  {
    this.mapAltura = 'map-altura';
    this.cargando = true;
    this.contratoService.list(event.value)
    .subscribe(
      (data:any) => {
        this.marketsArray = data.response; 
        this.cusCantidad = this.marketsArray.length;
        this.cargando = false;
      }
    );
  }

  searchMunicipios(event:any)
  {
    this.cargando = true;
    this.contratoService.municipiosList(event.target.value)
    .subscribe((resp:any) => {
      this.municipioList = resp.response;
      this.selectMunicipio = true;
      this.cargando = false;
    })
  }

  searchBarrio(event:any)
  {
    this.cargando = true;
    this.contratoService.barriosList(event.value)
    .subscribe((resp:any) => {
      this.barriosList = resp.response;
      this.selectBarrio = true;
      this.cargando = false;
    })
  }

  searchByBetween(){
    const range = {
      valor1: this.pipe.transform(this.rangeDates[0] , 'yyyy-MM-dd') ,
      valor2: this.pipe.transform(this.rangeDates[1] , 'yyyy-MM-dd')
    };

     this.contratoService.fechaBetwenn(range)
                          .subscribe((resp:any) => {
                            this.tableContratos = resp.response;
                            this.cargandoReporte = true;
                          });
  }

  //functiojn primeng
  next()
  {
    this.first = this.first + this.rows;
  }
  prev()
  {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage():boolean{
    return this.tableContratos ? this.first === (this.tableContratos.length - this.rows):true;
  }
  isFirstPage():boolean{
    return this.tableContratos ? this.first === 0 : true;
  }

  exportExcel(){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.tableContratos);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

}
