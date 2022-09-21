import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { InAppReview } from '@awesome-cordova-plugins/in-app-review/ngx';
import { ExploreState } from '@core/stores/explore/explore.state';
import { GameState } from '@core/stores/game/game.state';
import { PreferencesState } from '@core/stores/preferences/preferences.state';
import { UserState } from '@core/stores/user/user.state';
import { environment } from '@environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,

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
    InAppReview,
    Device,
    InAppPurchase2,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
