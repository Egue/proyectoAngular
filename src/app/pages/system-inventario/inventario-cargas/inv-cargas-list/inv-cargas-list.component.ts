import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inv-cargas-list',
  templateUrl: './inv-cargas-list.component.html',
  styles: [
  ]
})


export class InvCargasListComponent implements OnInit {

  public loadingRanges:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  searchRange()
  {
    this.loadingRanges = true;
  }

}
