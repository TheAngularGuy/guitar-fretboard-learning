import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, ToastController } from '@ionic/angular';

import { AnalyticsService } from './shared/services/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    // { title: 'Home', url: '/home', img: 'assets/imgs/home.svg' },
    { title: 'Locate', url: '/locate-games', img: 'assets/imgs/locate.svg' },
    { title: 'Identify', url: '/identify-games', img: 'assets/imgs/identified.svg' },
    { title: 'Explore', url: '/explore-games', img: 'assets/imgs/explore.svg' },
  ];
  morePages = [
    { title: 'Preferences', url: '/settings' },
    { title: 'About', url: '/about' },
  ];
  // icons set: https://www.flaticon.com/packs/seo-55
  // https://www.flaticon.com/packs/business-148
  // https://www.flaticon.com/packs/ecology-69

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly swUpdate: SwUpdate,
    private readonly analyticsService: AnalyticsService,
    private readonly toastController: ToastController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkSWVersion();
      this.analyticsService.init();
    });
  }

  checkSWVersion() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const toast = await this.toastController.create({
          message: 'New version available',
          color: 'primary',
          buttons: [
            {
              side: 'end',
              icon: 'refresh',
              text: 'Reload',
              handler: () => {
                window.location.reload();
              },
            },
            {
              text: 'Ignore',
              role: 'cancel',
              handler: () => {},
            },
          ],
        });
        toast.present();
      });
    }
  }
}
