import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LostComponent } from './components/lost/lost.component';
import { SharedModule } from './components/shared/shared.module';
import { UtilitiesService } from './services/utilities.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule
  ],
  providers: [
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
