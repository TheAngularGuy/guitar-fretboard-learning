import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PreferencesState, PreferencesStateModel } from '@shared-modules/store/preferences/preferences.state';
import { tap } from 'rxjs/operators';
import has = Reflect.has;

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  preferences: PreferencesStateModel;

  constructor(private store: Store) {
    this.store.select<PreferencesStateModel>(PreferencesState.getState)
      .pipe(
        tap((p) => {
          this.preferences = p;
        }),
      )
      .subscribe();
  }

  playClick() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = new Audio('assets/sounds/click.mp3');
    audio.play();
  }

  playError() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = new Audio('assets/sounds/badstring.mp3');
    audio.play();
  }

  playGood() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = new Audio('assets/sounds/good.mp3');
    audio.play();
  }

  playSuccess() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = new Audio('assets/sounds/success.mp3');
    audio.play();
  }

  playCoins() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = new Audio('assets/sounds/coins.mp3');
    audio.play();
  }

  playNote(note: string, duration = 750) {
    const hash = {
      A: 440,
      B: 246.94,
      C: 261.63,
      D: 293.66,
      E: 329.63,
      F: 349.23,
      G: 392.00,
      'A#': 466.16,
      'C#': 277.18,
      'D#': 311.13,
      'F#': 369.99,
      'G#': 415.30,
    };
    console.log(hash[note]);
    const audioContext = new AudioContext();
    const frequency = hash[note];
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.frequency.value = frequency;

    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }
}
