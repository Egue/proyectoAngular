import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  public error:any;

  handleError(error:any)
  {
    this.error = error;
  }
}
