import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase/ngx';
import { UtilsService } from '@shared-modules/services/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  constructor(
    private device: Device,
    private ga: AnalyticsFirebase,
    private utils: UtilsService,
  ) { }

  init() {
    if (!this.utils.isIOS && !this.utils.isAndroid) {
      console.log('analitics not initialised. No app detected.');
      return;
    }
    console.log({ device: this.device });
    this.ga.setUserId(this.device.uuid);
  }

  logEvent(event: string, data?: any) {
    if (!this.utils.isIOS && !this.utils.isAndroid) {
      return;
    }
    this.ga.logEvent(event + '_' + data).then(x => console.log('event sent: ', event, data));
  }

  setCurrentScreen(event: string) {
    if (!this.utils.isIOS && !this.utils.isAndroid) {
      return;
    }
    this.ga.setCurrentScreen('page_' + event).then(x => console.log('screen sent: page_', event));
  }
}
