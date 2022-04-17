import { ActivationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {filter,map} from 'rxjs/operators'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

public titulo:string = '';

public tituloSusb$:Subscription;

  constructor(private router:Router) { 

    this.tituloSusb$ = this.getArgumentosRuta()
    .subscribe(({titulo})=>{
      this.titulo = titulo; //({titulo}) desestructuracion de la data del observable, es variable de event
      document.title = `AdminPro - ${titulo}`;
    });

  }
  ngOnDestroy(): void {
    this.tituloSusb$.unsubscribe();
  }


  getArgumentosRuta(){
   return  this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:any) => event.snapshot.firstChild===null),
      map((event:any) => event.snapshot.data),

    );
  }

  

}
