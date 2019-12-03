import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home' },
    { title: 'Locate', url: '/locate' },
    { title: 'Identify', url: '/identify' },
    { title: 'Explore', url: '/explore' },
    { title: 'About', url: '/about' },
  ];

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly swUpdate: SwUpdate,
    private readonly toastController: ToastController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkSWVersion();
    });
  }

  checkSWVersion() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const toast = await this.toastController.create({
          message: 'New version available',
          position: 'top',
          buttons: [
            {
              side: 'end',
              icon: 'refresh',
              text: 'reload',
              handler: () => {
                window.location.reload();
              },
            },
            {
              text: 'ignore',
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
