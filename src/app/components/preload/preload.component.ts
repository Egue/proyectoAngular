import { Component, OnInit } from '@angular/core';
import { PreloadService } from './service/preload.service';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.css']
})
export class PreloadComponent implements OnInit {


  visible$ = this.preloadService.isVisible();

  constructor(private preloadService:PreloadService) { }

  ngOnInit(): void {
    
  }

}
