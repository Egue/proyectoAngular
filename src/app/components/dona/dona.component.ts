import { Component, Input, OnInit } from '@angular/core';


import { ChartData, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() title:string = "sin titulo";
  @Input('label') public doughnutChartLabels:string[] = ['data1' , 'data2' , 'data3'];
  @Input('dat') public data:number[] =[ 100, 100, 100];
  // Doughnut
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data,
        backgroundColor:['#FF2323' , '#AF0999' , '#FC9000']
      },
      
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
