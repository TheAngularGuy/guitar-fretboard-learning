import { Injectable } from '@angular/core';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { FRETBOARD_STANDARD } from 'src/app/constants/fretboard-notes.constant';

@Injectable({
  providedIn: 'root',
})
export class FretboardManipulationService {
  getFretboardNotes(preferences: { tuning: string; leftHandedMode: boolean }): string[][] {
    let output: string[][];
    if (preferences.tuning.toLowerCase().includes('standard')) {
      output = FRETBOARD_STANDARD;
    } else {
      output = this.customTuningFretboardFactory(preferences.tuning);
    }

    if (!!preferences.leftHandedMode) {
      return output.map(fret => fret.reverse());
    }
    return output;
  }

  private customTuningFretboardFactory(tuning: string): string[][] {
    console.log('Debbug log: tuning', tuning);
    const output = [];
    const nut = tuning
      .toUpperCase()
      .split('-')
      .reverse();

    if (nut.length !== 6) {
      throw { error: 'error parsing tuning' };
    }
    output.push(nut);

    for (let i = 1; i <= 12; i++) {
      const fret = output[i - 1].map(n => this.getNextNote(n));
      output.push(fret);
    }

    console.log('Debbug log: output', output);
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
