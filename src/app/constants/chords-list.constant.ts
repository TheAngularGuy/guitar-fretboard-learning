import { Chord } from '../models/chord.model';

export const A_MAJOR_CHORDS: Chord[] = [
  {
    type: 'Major',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      {
        fret: 0,
        noteName: 'E',
        string: 0,
      },
      {
        fret: 2,
        noteName: 'C#',
        string: 1,
      },
      {
        fret: 2,
        noteName: 'A',
        string: 2,
      },
      {
        fret: 2,
        noteName: 'E',
        string: 3,
      },
      {
        fret: 0,
        noteName: 'A',
        string: 4,
      },
    ],
    disabledStrings: [5],
  },
  {
    type: 'Major',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      {
        fret: 5,
        noteName: 'A',
        string: 0,
      },
      {
        fret: 5,
        noteName: 'E',
        string: 1,
      },
      {
        fret: 6,
        noteName: 'C#',
        string: 2,
      },
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
      {
        fret: 7,
        noteName: 'E',
        string: 4,
      },
      {
        fret: 5,
        noteName: 'A',
        string: 5,
      },
    ],
    disabledStrings: [],
    barre: {
      fret: 5,
      stringEnd: 5,
      stringStart: 0,
    },
  },
  {
    type: 'Major',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      {
        fret: 5,
        noteName: 'A',
        string: 0,
      },
      {
        fret: 5,
        noteName: 'E',
        string: 1,
      },
      {
        fret: 6,
        noteName: 'C#',
        string: 2,
      },
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
      {
        fret: 7,
        noteName: 'E',
        string: 4,
      },
      {
        fret: 5,
        noteName: 'A',
        string: 5,
      },
    ],
    disabledStrings: [4, 5],
    barre: {
      fret: 5,
      stringEnd: 1,
      stringStart: 0,
    },
  },
  {
    type: 'Major',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      {
        fret: 5,
        noteName: 'A',
        string: 0,
      },
      {
        fret: 5,
        noteName: 'E',
        string: 1,
      },
      {
        fret: 6,
        noteName: 'C#',
        string: 2,
      },
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
      {
        fret: 7,
        noteName: 'E',
        string: 4,
      },
      {
        fret: 5,
        noteName: 'A',
        string: 5,
      },
    ],
    disabledStrings: [0, 1],
  },
  {
    type: 'Major',
    fretStart: 7,
    fretEnd: 10,
    notes: [
      {
        fret: 9,
        noteName: 'C#',
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
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'Major',
    fretStart: 9,
    fretEnd: 12,
    notes: [
      {
        fret: 9,
        noteName: 'C#',
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
      {
        fret: 11,
        noteName: 'C#',
        string: 3,
      },
      {
        fret: 12,
        noteName: 'A',
        string: 4,
      },
    ],
    disabledStrings: [5],
    barre: {
      fret: 9,
      stringEnd: 2,
      stringStart: 0,
    },
  },
  {
    type: 'Major',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      {
        fret: 5,
        noteName: 'A',
        string: 0,
      },
      {
        fret: 5,
        noteName: 'E',
        string: 1,
      },
      {
        fret: 6,
        noteName: 'C#',
        string: 2,
      },
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
      {
        fret: 7,
        noteName: 'E',
        string: 4,
      },
      {
        fret: 5,
        noteName: 'A',
        string: 5,
      },
    ],
    disabledStrings: [0, 5],
  },
];

export const A_MINOR_CHORDS: Chord[] = [
  {
    type: 'Minor',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      {
        fret: 0,
        noteName: 'E',
        string: 0,
      },
      {
        fret: 1,
        noteName: 'C',
        string: 1,
      },
      {
        fret: 2,
        noteName: '1',
        string: 2,
      },
      {
        fret: 2,
        noteName: 'E',
        string: 3,
      },
      {
        fret: 0,
        noteName: 'A',
        string: 4,
      },
    ],
    disabledStrings: [5],
  },
  {
    type: 'Minor',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      {
        fret: 5,
        noteName: 'E',
        string: 0,
      },
      {
        fret: 5,
        noteName: 'E',
        string: 1,
      },
      {
        fret: 5,
        noteName: 'C',
        string: 2,
      },
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
      {
        fret: 7,
        noteName: 'E',
        string: 4,
      },
      {
        fret: 5,
        noteName: 'A',
        string: 5,
      },
    ],
    disabledStrings: [],
    barre: {
      fret: 5,
      stringEnd: 5,
      stringStart: 0,
    },
  },
  {
    type: 'Minor',
    fretStart: 7,
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
      {
        fret: 7,
        noteName: 'A',
        string: 3,
      },
    ],
    disabledStrings: [4, 5],
  },
];
