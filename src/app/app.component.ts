import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { InAppStoreService } from '@core/services/in-app-store/in-app-store.service';
import { GameState } from '@core/stores/game/game.state';
import {
  PreferencesSetInvertedFretsModeAction,
  PreferencesSetInvertedStringsModeAction,
} from '@core/stores/preferences/preferences.actions';
import { PreferencesState } from '@core/stores/preferences/preferences.state';
import { Platform, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @Select(GameState.isPlaying) isUserPlaying$: Observable<boolean>;
  morePages = [
    { title: 'Settings', url: 'settings', svg: 'settings' },
    { title: 'Tools', url: 'tools', svg: 'tools' },
    { title: 'Games', url: 'games', svg: 'games' },
    { title: 'Explore', url: 'explore', svg: 'explore' },
    { title: 'Profile', url: 'profile', svg: 'user' },
  ];
  // icons set: https://www.flaticon.com/packs/seo-55
  // https://www.flaticon.com/packs/business-148
  // https://www.flaticon.com/packs/ecology-69

  lastWidthRegistred: number;


  constructor(
    private readonly store: Store,
    private readonly toastController: ToastController,
    private readonly platform: Platform,
    private readonly device: Device,
    private readonly iapService: InAppStoreService,
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  ngAfterViewInit() {
    this.lastWidthRegistred = window.innerWidth;
    this.initializeApp();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const preferences = this.store.selectSnapshot(PreferencesState.getState);
    const currentWidth = window.innerWidth;
    if (!this.lastWidthRegistred) {
      return;
    }
    if (this.lastWidthRegistred <= 760 && currentWidth > 760) { // mobile to tablet
      if (preferences.invertedStrings) {
        this.store.dispatch(new PreferencesSetInvertedStringsModeAction({ invertedStrings: false }));
        this.store.dispatch(new PreferencesSetInvertedFretsModeAction({ invertedFrets: true }));
      }
    } else if (this.lastWidthRegistred > 760 && currentWidth <= 760) { // tablet to mobile
      if (preferences.invertedFrets) {
        this.store.dispatch(new PreferencesSetInvertedFretsModeAction({ invertedFrets: false }));
        this.store.dispatch(new PreferencesSetInvertedStringsModeAction({ invertedStrings: true }));
      }
    }
    this.lastWidthRegistred = currentWidth;
  }

  initializeApp() {
    this.iapService.init();
    StatusBar.setStyle({ style: Style.Dark });
    SplashScreen.hide();
  }

  tabsChanged(e: { tab: string }) {
    // noop
  }
}
