import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Modulos
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component'; 
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; 

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent, 
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), 
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
