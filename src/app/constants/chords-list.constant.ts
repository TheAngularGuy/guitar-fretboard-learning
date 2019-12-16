import { Chord } from '../models/chord.model';

export const A_CHORDS: Chord[] = [
  {
    fretStart: 8,
    fretEnd: 10,
    notes: [
      {
        fret: 8,
        noteName: 'C',
        string: 0,
      },
      {
        fret: 10,
        noteName: 'A',
        string: 1,
      },
      {
        fret: 9,
        noteName: 'E',
        string: 2,
      },
    ],
    disabledStrings: [3, 4, 5],
  },
];
