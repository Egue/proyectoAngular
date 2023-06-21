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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadService } from './components/preload/service/preload.service';
import { PreloadInterceptor } from './preload.interceptor';
import { PreloadModule } from './components/preload/preload.module'; 

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
    PreloadModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), 
  ], 

  providers:[PreloadService,{provide:HTTP_INTERCEPTORS , useClass:PreloadInterceptor, multi:true}]  
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
