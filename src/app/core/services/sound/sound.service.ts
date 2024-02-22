import { Injectable } from '@angular/core';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  preferences: PreferencesStateModel;
  audioContext: AudioContext;

  audioFiles = {
    click: new Audio('assets/sounds/click.mp3'),
    error: new Audio('assets/sounds/badstring.mp3'),
    good: new Audio('assets/sounds/good.mp3'),
    success: new Audio('assets/sounds/success.mp3'),
    coins: new Audio('assets/sounds/coins.mp3'),
  };

  constructor(private store: Store, private nativeAudio: NativeAudio) {
    this.store.select<PreferencesStateModel>(PreferencesState.getState)
      .pipe(
        tap((p) => {
          this.preferences = p;
        }),
      )
      .subscribe();
    this.audioContext = new AudioContext();
  }

  playClick(force?: boolean) {
    if (!this.preferences.activateSound && !force) {
      return;
    }
    const audio = this.audioFiles.click;
    audio.play();
  }

  playError() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = this.audioFiles.error;
    audio.play();
  }

  playGood() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = this.audioFiles.good;
    audio.play();
  }

  playSuccess() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = this.audioFiles.success;
    audio.play();
  }

  playCoins() {
    if (!this.preferences.activateSound) {
      return;
    }
    const audio = this.audioFiles.coins;
    audio.play();
  }

  playNote(note: string, duration = 750) {
    /* eslint-disable @typescript-eslint/naming-convention */
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
    /* eslint-enable @typescript-eslint/naming-convention */
    const audioContext = this.audioContext;
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
