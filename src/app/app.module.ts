import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION, CONFIG,
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
import { IonicModule, IonicRouteStrategy, ModalController, ToastController } from '@ionic/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '@shared-modules/store/game/game.state';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreferencesState } from './shared/store/preferences/preferences.state';
import { UserState } from './shared/store/user/user.state';
import { ProgressModal } from './modals/progress/progress.modal';
import { GlobalModule } from '@shared-modules/modules/global/global.module';
import { Device } from '@ionic-native/device/ngx';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import { ExploreState } from '@shared-modules/store/explore/explore.state';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { GetProModal } from './modals/get-pro/get-pro.modal';

@NgModule({
  declarations: [
    AppComponent,
    ProgressModal,
    GetProModal,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      // animated: !UtilsService.isIOS(),
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    GlobalModule,
    HttpClientModule,

    NgxsModule.forRoot([
      UserState,
      PreferencesState,
      GameState,
      ExploreState,
    ], {
      developmentMode: !environment.production,
    }),
    !environment.production && environment.enableNgxsLogger ? [NgxsLoggerPluginModule.forRoot()] : [],
    !environment.production ? [NgxsReduxDevtoolsPluginModule.forRoot()] : [],
  ],
  providers: [
    // ionic
    Device,
    StatusBar,
    SplashScreen,
    ToastController,
    ModalController,
    InAppPurchase2,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // firebase
    ScreenTrackingService,
    { provide: CONFIG, useValue: { anonymize_ip: true } },
    { provide: DEBUG_MODE, useValue: environment.enableAnalyticsDebug },
    { provide: APP_VERSION, useValue: environment.version },
    { provide: APP_NAME, useValue: environment.firebaseConfig.projectId },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
