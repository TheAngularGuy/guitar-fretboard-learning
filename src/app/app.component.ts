import {AfterViewInit, Component, HostListener} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform, ToastController} from '@ionic/angular';
import {Select, Store} from '@ngxs/store';
import {GameState} from '@shared-modules/store/game/game.state';
import {Observable} from 'rxjs';
import {UserLogInAction, UserLogOutAction} from './shared/store/user/user.actions';
import {PreferencesState} from '@shared-modules/store/preferences/preferences.state';
import {
  PreferencesSetInvertedFretsModeAction,
  PreferencesSetInvertedStringsModeAction
} from '@shared-modules/store/preferences/preferences.actions';
import {Device} from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @Select(GameState.isPlaying) isUserPlaying$: Observable<boolean>;
  morePages = [
    {title: 'Settings', url: 'settings', svg: 'settings'},
    {title: 'Tools', url: 'tools', svg: 'tools'},
    {title: 'Games', url: 'games', svg: 'games'},
    {title: 'Explore', url: 'explore', svg: 'explore'},
    {title: 'Profile', url: 'profile', svg: 'user'},
  ];
  // icons set: https://www.flaticon.com/packs/seo-55
  // https://www.flaticon.com/packs/business-148
  // https://www.flaticon.com/packs/ecology-69

  lastWidthRegistred: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const preferences = this.store.selectSnapshot(PreferencesState.getState);
    const currentWidth = window.innerWidth;
    if (!this.lastWidthRegistred) {
      return;
    }
    if (this.lastWidthRegistred <= 760 && currentWidth > 760) { // mobile to tablet
      if (preferences.invertedStrings) {
        this.store.dispatch(new PreferencesSetInvertedStringsModeAction({invertedStrings: false}));
        this.store.dispatch(new PreferencesSetInvertedFretsModeAction({invertedFrets: true}));
      }
    } else if (this.lastWidthRegistred > 760 && currentWidth <= 760) { // tablet to mobile
      if (preferences.invertedFrets) {
        this.store.dispatch(new PreferencesSetInvertedFretsModeAction({invertedFrets: false}));
        this.store.dispatch(new PreferencesSetInvertedStringsModeAction({invertedStrings: true}));
      }
    }
    this.lastWidthRegistred = currentWidth;
  }

  constructor(
    private readonly store: Store,
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly swUpdate: SwUpdate,
    private readonly toastController: ToastController,
    private readonly device: Device,
  ) {
    this.initializeApp();
  }

  ngAfterViewInit() {
    this.lastWidthRegistred = window.innerWidth;

    if (!this.device?.model) { // Not an app
      // TODO: show cookies msg "This site uses cookies from Google to deliver its services and to analyze traffic."
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.statusBar.backgroundColorByHexString('#40413e');
      this.splashScreen.hide();
      this.checkSWVersion();
    });
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
              handler: () => {
              },
            },
          ],
        });
        toast.present();
      });
    }
  }
}
