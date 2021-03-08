import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Device } from '@ionic-native/device/ngx';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { InAppReview } from '@ionic-native/in-app-review/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { GlobalModule } from '@shared-modules/modules/global/global.module';
import { ExploreState } from '@shared-modules/store/explore/explore.state';
import { GameState } from '@shared-modules/store/game/game.state';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetProModal } from './modals/get-pro/get-pro.modal';
import { ProgressModal } from './modals/progress/progress.modal';
import { PreferencesState } from './shared/store/preferences/preferences.state';
import { UserState } from './shared/store/user/user.state';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase/ngx';

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
    LoadingController,
    InAppPurchase2,
    InAppReview,
    AnalyticsFirebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
