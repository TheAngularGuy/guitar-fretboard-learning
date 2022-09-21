import { Pipe, PipeTransform } from '@angular/core';
import { NotePipe } from '@shared/pipes/note-pipe/note.pipe';

@Pipe({ name: 'tuning' })
export class TuningPipe implements PipeTransform {
  notePipe = new NotePipe();

  transform(value: string, notation: string, useFlat: boolean, leftHanded): string {
    let notes = value.split('-').map(note => this.notePipe.transform(note, notation, useFlat));
    if (leftHanded) {
      notes = notes.reverse();
    }
    return notes.join('-');
  }
}
