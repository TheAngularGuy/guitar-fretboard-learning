export class UtilsService {
  private isIosPrivateValue: boolean;
  private isStandalonePrivateValue: boolean;

  /**
   * Get item from Local Storage
   */
  public static getParsedItemFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Set item to Local Storage
   */
  public static setParsedItemToLS(key: string, val: any = null) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  /**
   * Vibrate using the web api
   */
  public static vibrate(sequence: number[]) {
    if (window && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(sequence);
    }
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Returns true if app runs on IOS
   */
  isIOS(): boolean {
    if (this.isIosPrivateValue != null) {
      return this.isIosPrivateValue;
    }
    this.isIosPrivateValue = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return this.isIosPrivateValue;
  }

  /**
   * Returns true if app is a PWA
   */
  isPWA(): boolean {
    if (this.isStandalonePrivateValue != null) {
      return this.isStandalonePrivateValue;
    }
    this.isStandalonePrivateValue =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    return this.isStandalonePrivateValue;
  }

  /**
   * Returns true if app is a PWA on IOS
   */
  isIOSPWA(): boolean {
    return this.isIosPrivateValue && this.isStandalonePrivateValue;
  }
}
