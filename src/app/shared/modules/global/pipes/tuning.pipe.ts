import {Pipe, PipeTransform} from '@angular/core';
import {Store} from '@ngxs/store';
import {PreferencesState} from '../../../store/preferences/preferences.state';
import {NotePipe} from '@shared-modules/modules/global/pipes/note.pipe';

@Pipe({
  name: 'tuning',
})
export class TuningPipe implements PipeTransform {
  notePipe = new NotePipe();

  constructor() {
  }

  transform(value: string, useFlat: boolean, leftHanded): string {
    let notes = value.split('-').map(note => this.notePipe.transform(note, useFlat));
    if (leftHanded) {
      notes = notes.reverse();
    }
    return notes.join('-');
  }
}
