import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios=>{
      console.log(usuarios);
    });
   /* const promesa = new Promise((resolve , reject)=>{
      if(false){
        resolve('hola munod');
      }else{
        reject('algo salio mas');
      }
    });

    promesa.then((data)=>{
      console.log(data);
    })
    .catch(error=> {
      console.log('error den la promgesa' + error);
    });
    console.log('fin init');*/
  }

  getUsuarios(){
    return new  Promise( resolve =>{
      fetch('https://reqres.in/api/users?page=2')
    .then( resp =>resp.json())
    .then(body =>resolve(body.data));
    });

     
  }

}
