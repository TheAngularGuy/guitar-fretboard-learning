import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION,
  DEBUG_MODE,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '@shared-modules/store/game/game.state';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreferencesState } from './shared/store/preferences/preferences.state';
import { UserState } from './shared/store/user/user.state';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AppRoutingModule,

    NgxsModule.forRoot([
        UserState,
        PreferencesState,
        GameState,
      ],
      { developmentMode: !environment.production }),
    !environment.production && environment.enableNgxsLogger ? [
      NgxsLoggerPluginModule.forRoot(),
    ] : [],
    !environment.production ? [
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ] : [],
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ToastController,
    ScreenTrackingService,
    { provide: DEBUG_MODE, useValue: environment.enableAnalyticsDebug },
    { provide: APP_VERSION, useValue: environment.version },
    { provide: APP_NAME, useValue: environment.firebaseConfig.projectId },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
