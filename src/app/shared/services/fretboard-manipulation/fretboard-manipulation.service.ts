import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PreferencesState, PreferencesStateModel } from '@shared-modules/store/preferences/preferences.state';
import { tap } from 'rxjs/operators';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { FRETBOARD_STANDARD } from 'src/app/constants/fretboard-notes.constant';

@Injectable()
export class FretboardManipulationService {

  constructor() {  }

  getFretboardNotes(preferences: { tuning: string; invertedStrings: boolean }): string[][] {
    let output: string[][];

    if (preferences.tuning.toLowerCase().includes('standard')) {
      output = FRETBOARD_STANDARD;
    } else {
      output = this.customTuningFretboardFactory(preferences.tuning);
    }

    return output;
  }

  private customTuningFretboardFactory(tuning: string): string[][] {
    const output = [];
    const nut = tuning
      .toUpperCase()
      .split('-')
      .reverse();

    if (nut.length !== 6) {
      throw { error: 'error parsing tuning' };
    }
    output.push(nut);

    for (let i = 1; i <= 17; i++) {
      const fret = output[i - 1].map(n => this.getNextNote(n));
      output.push(fret);
    }
    return output;
  }

  private getNextNote(noteName: string): string {
    const scale = [...CHROMATIC_SCALE].sort();
    if (!scale.includes(noteName)) {
      throw { error: 'error parsing tunings noteName' };
    }
    if (noteName === 'G#') {
      return 'A';
    }
    const noteIndex = scale.indexOf(noteName);
    return scale[noteIndex + 1];
  }
}
