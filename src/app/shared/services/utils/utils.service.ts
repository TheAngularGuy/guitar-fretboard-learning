import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
    private _isIOS: boolean;
    private _isPWA: boolean;

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
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Returns true if app runs on IOS
     */
    isIOS(): boolean {
        if (this._isIOS != null) {
            return this._isIOS;
        }
        this._isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        return this._isIOS;
    }

    /**
     * Returns true if app is a PWA
     */
    isPWA(): boolean {
        if (this._isPWA != null) {
            return this._isPWA;
        }
        this._isPWA =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone ||
            document.referrer.includes('android-app://');
        return this._isPWA;
    }

    /**
     * Returns true if app is a PWA on IOS
     */
    isIOSPWA(): boolean {
        return this._isIOS && this._isPWA;
    }
}
