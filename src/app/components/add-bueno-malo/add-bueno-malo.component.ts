import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-bueno-malo',
  templateUrl: './add-bueno-malo.component.html',
  styles: [
  ]
})
export class AddBuenoMaloComponent implements OnInit {

  @Input() public estadoModalBuenoMalo:boolean = true;

  @Output('estadoModalBuenoMalo') cerradoModal:EventEmitter<boolean> = new EventEmitter();

  @Input() public item:any = []

  constructor() { }

  ngOnInit(): void {

  }

}
