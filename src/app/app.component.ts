import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { GameState } from '@shared-modules/store/game/game.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressModal } from './modals/progress/progress.modal';
import { UserLogInAction, UserLogOutAction } from './shared/store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @Select(GameState.isPlaying) isUserPlaying$: Observable<boolean>;
  morePages = [
    { title: 'Preferences', url: 'settings', svg: 'settings' },
    { title: 'Tools', url: 'tools', svg: 'tools' },
    { title: 'Games', url: 'games', svg: 'games' },
    { title: 'Explore', url: 'explore', svg: 'explore' },
    { title: 'Profile', url: 'profile', svg: 'user' },
  ];
  // icons set: https://www.flaticon.com/packs/seo-55
  // https://www.flaticon.com/packs/business-148
  // https://www.flaticon.com/packs/ecology-69

  constructor(
    private readonly store: Store,
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly swUpdate: SwUpdate,
    private readonly toastController: ToastController,
    private readonly modalCtrl: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkSWVersion();
    });

    this.listenToGameEnd();
  }

  listenToGameEnd() {
    this.store.select(GameState.lastCompleted)
      .pipe(
        tap(async ({ time, previous, current }) => {
          if ((Math.abs(time - Date.now()) <= 1000) && current > previous) {
            const modal = await this.modalCtrl.create({
              component: ProgressModal,
              animated: true,
              swipeToClose: true,
              cssClass: 'modal-transparent',
              componentProps: {
                current,
                previous,
              },
            });
            modal.present();
          }
        }),
      )
      .subscribe();
  }

  login() {
    this.store.dispatch(new UserLogInAction({
      provider: 'facebook',
    }));
  }

  logout() {
    this.store.dispatch(new UserLogOutAction());
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
