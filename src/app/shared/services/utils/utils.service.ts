import {Injectable} from '@angular/core';
import {Device} from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(private device: Device) {
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

  /**
   * Returns true if app runs on IOS
   */
  static isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isIphoneX() {
    try {
      const iphoneModel = (this.device || (window as any).device)?.model;
      if (!iphoneModel) {
        return UtilsService.isIOS();
      }
      const m = iphoneModel.match(/iPhone(\d+),?(\d+)?/);
      const model = +m[1];

      if (model >= 10) { // is iphone X
        return true;
      }
    } catch (e) {
    }

    return false;
  }

  /**
   * Returns true if app is a PWA
   */
  isPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
  }

  /**
   * Returns true if app is a PWA on IOS
   */
  isIOSPWA(): boolean {
    return this.isIphoneX() && this.isPWA();
  }
}
