export class UtilsService {
  private _isIosPWA: boolean;

  constructor() {}

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Returns true if app is a PWA
   */
  isIosPWA(): boolean {
    if (this._isIosPWA != null) {
      return this._isIosPWA; // returns the last known value either true or false
    }
    this._isIosPWA =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://'));
    return this._isIosPWA;
  }
}
