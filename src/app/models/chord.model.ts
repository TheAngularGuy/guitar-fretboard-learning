import { Note } from './note.model';

export interface Barre {
  fret: number;
  stringStart: number;
  stringEnd: number;
}

export interface Chord {
  notes: Note[];
  fretStart: number;
  fretEnd: number;
  disabledStrings: number[];
  type: ChordType;
  name?: string;
  barre?: Barre;
}

export type ChordType =
  | 'Major'
  | 'Minor'
  | '5'
  | '7'
  | 'maj7'
  | 'm7'
  | 'sus4'
  | 'sus2'
  | '7sus4'
  | 'add9'
  | '7#9'
  | '9';
