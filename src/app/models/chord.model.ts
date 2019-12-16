import { Note } from './note.model';

export interface Chord {
  notes: Note[];
  fretStart: number;
  fretEnd: number;
  disabledStrings: number[];
  name?: string;
}
