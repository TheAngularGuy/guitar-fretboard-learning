import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(private device: Device, private platform: Platform) {
  }

  /**
   * Get item from Local Storage
   */
  static getParsedItemFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Set item to Local Storage
   */
  static setParsedItemToLS(key: string, val: any = null) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  static shuffleArray(arr: any[]) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Vibrate using the web api
   */
  static vibrate(sequence: number[]) {
    if (window && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(sequence);
    }
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandomInt(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  static clone<T>(ob: T): T {
    return JSON.parse(JSON.stringify(ob));
  }

  static openLink(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  /**
   * Returns true if app runs on IOS
   */
  get isIOS(): boolean {
    return this.platform.is('ios');
  }

  get isAndroid(): boolean {
    return this.platform.is('android');
  }

}
