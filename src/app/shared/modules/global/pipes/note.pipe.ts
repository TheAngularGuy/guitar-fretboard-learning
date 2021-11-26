import {Pipe, PipeTransform} from '@angular/core';
import {Store} from '@ngxs/store';
import {PreferencesState} from '../../../store/preferences/preferences.state';
import {ALL_CHROMATIC_SCALES_NOTATIONS_HASH, CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

@Pipe({
  name: 'note',
})
export class NotePipe implements PipeTransform {
  constructor() {
  }

  transform(value: string, notation: string, useFlats: boolean): string {
    if (typeof value !== 'string') {
      return '';
    }
    return this.applyTransformation(value, notation, useFlats);
  }

  applyTransformation(value: string, notation: string, useFlats: boolean) {
    if (value && value.includes('#')) {
      if (useFlats) {
        const code = value.charCodeAt(0) + 1;
        return this.applyNotation(String.fromCharCode(code === 72 ? 65 : code), notation) + '♭'; // 71 ==> G
      }
      return this.applyNotation(value[0], notation) + '#';
    }
    return this.applyNotation(value, notation);
  }

  applyNotation(note: string, notation: string): string {
    const chromaticScale = ALL_CHROMATIC_SCALES_NOTATIONS_HASH[notation];
    const noteIndex = [...CHROMATIC_SCALE].indexOf(note);
    return chromaticScale[noteIndex];
  }
}
