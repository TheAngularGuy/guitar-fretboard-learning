import { Chord } from 'src/app/models/chord.model';

export const D_CHORDS: Chord[] = [
  {
    type: 'Major',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 2, string: 0 },
      { fret: 3, string: 1 },
      { fret: 2, string: 2 },
      { fret: 0, string: 3 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'Major',
    fretStart: 2,
    fretEnd: 5,
    notes: [
      { fret: 2, string: 0 },
      { fret: 3, string: 1 },
      { fret: 2, string: 2 },
      { fret: 4, string: 3 },
      { fret: 5, string: 4 },
    ],
    disabledStrings: [5],
  },
  {
    type: 'Major',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 0 },
      { fret: 7, string: 1 },
      { fret: 7, string: 2 },
      { fret: 7, string: 3 },
      { fret: 5, string: 4 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringStart: 0, stringEnd: 4 },
  },
  {
    type: 'Major',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 0 },
      { fret: 10, string: 1 },
      { fret: 11, string: 2 },
      { fret: 12, string: 3 },
      { fret: 12, string: 4 },
      { fret: 10, string: 5 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },
  {
    type: 'Major',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 0 },
      { fret: 10, string: 1 },
      { fret: 11, string: 2 },
      { fret: 12, string: 3 },
      { fret: 12, string: 4 },
      { fret: 10, string: 5 },
    ],
    disabledStrings: [4, 5],
    barre: { fret: 10, stringEnd: 1, stringStart: 0 },
  },
  {
    type: 'Major',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 0 },
      { fret: 10, string: 1 },
      { fret: 11, string: 2 },
      { fret: 12, string: 3 },
      { fret: 12, string: 4 },
      { fret: 10, string: 5 },
    ],
    disabledStrings: [0, 1],
  },
  {
    type: 'Major',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 0 },
      { fret: 10, string: 1 },
      { fret: 11, string: 2 },
      { fret: 12, string: 3 },
      { fret: 12, string: 4 },
      { fret: 10, string: 5 },
    ],
    disabledStrings: [0, 5],
  },

  {
    type: 'Minor',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 1, string: 0 },
      { fret: 3, string: 1 },
      { fret: 2, string: 2 },
      { fret: 0, string: 3 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'Minor',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 0 },
      { fret: 6, string: 1 },
      { fret: 7, string: 2 },
      { fret: 7, string: 3 },
      { fret: 5, string: 4 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: 'Minor',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 0 },
      { fret: 10, string: 1 },
      { fret: 10, string: 2 },
      { fret: 12, string: 3 },
      { fret: 12, string: 4 },
      { fret: 10, string: 5 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },

  // ----------------------------------
  {
    type: 'Diminished',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 6, string: 3 },
      { fret: 7, string: 2 },
      { fret: 6, string: 1 },
    ],
    disabledStrings: [0, 5],
  },

  {
    type: '5',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 3, string: 1 },
    ],
    disabledStrings: [0, 4, 5],
  },
  {
    type: '5',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 3, string: 1 },
    ],
    disabledStrings: [0, 1, 4, 5],
  },
  {
    type: '5',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 7, string: 2 },
    ],
    disabledStrings: [0, 1, 5],
  },
  {
    type: '5',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
    ],
    disabledStrings: [0, 1, 2, 5],
  },
  {
    type: '5',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 12, string: 3 },
    ],
    disabledStrings: [0, 1, 2],
  },
  {
    type: '5',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
    ],
    disabledStrings: [0, 1, 2, 3],
  },

  {
    type: '7',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 1, string: 1 },
      { fret: 2, string: 0 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: '7',
    fretStart: 3,
    fretEnd: 5,
    notes: [
      { fret: 5, string: 4 },
      { fret: 4, string: 3 },
      { fret: 5, string: 2 },
      { fret: 3, string: 1 },
    ],
    disabledStrings: [0, 5],
  },
  {
    type: '7',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 5, string: 2 },
      { fret: 7, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: '7',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 10, string: 3 },
      { fret: 11, string: 2 },
      { fret: 10, string: 1 },
      { fret: 10, string: 0 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },

  {
    type: 'maj7',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 2, string: 1 },
      { fret: 2, string: 0 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'maj7',
    fretStart: 2,
    fretEnd: 5,
    notes: [
      { fret: 5, string: 4 },
      { fret: 4, string: 3 },
      { fret: 2, string: 2 },
      { fret: 2, string: 1 },
      { fret: 2, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 2, stringEnd: 2, stringStart: 0 },
  },
  {
    type: 'maj7',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 6, string: 2 },
      { fret: 7, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: 'maj7',
    fretStart: 9,
    fretEnd: 12,
    notes: [
      { fret: 12, string: 3 },
      { fret: 11, string: 2 },
      { fret: 10, string: 1 },
      { fret: 9, string: 0 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'maj7',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 11, string: 3 },
      { fret: 11, string: 2 },
      { fret: 10, string: 1 },
      { fret: 10, string: 0 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },
  {
    type: 'maj7',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 11, string: 3 },
      { fret: 11, string: 2 },
      { fret: 10, string: 1 },
    ],
    disabledStrings: [4, 0],
  },

  {
    type: 'm7',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 1, string: 1 },
      { fret: 1, string: 0 },
    ],
    disabledStrings: [4, 5],
    barre: { fret: 1, stringEnd: 1, stringStart: 0 },
  },
  {
    type: 'm7',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 5, string: 2 },
      { fret: 6, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: 'm7',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 10, string: 3 },
      { fret: 10, string: 2 },
      { fret: 10, string: 1 },
      { fret: 10, string: 0 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },

  {
    type: 'sus4',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 3, string: 1 },
      { fret: 3, string: 0 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: 'sus4',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 7, string: 2 },
      { fret: 8, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: 'sus4',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 12, string: 3 },
      { fret: 12, string: 2 },
      { fret: 10, string: 1 },
      { fret: 10, string: 0 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },

  {
    type: 'add9',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 12, string: 3 },
      { fret: 11, string: 2 },
      { fret: 10, string: 1 },
      { fret: 12, string: 0 },
    ],
    disabledStrings: [4, 5],
  },

  {
    type: 'sus2',
    fretStart: 0,
    fretEnd: 3,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 3, string: 1 },
      { fret: 0, string: 0 },
    ],
    disabledStrings: [5, 4],
  },
  {
    type: 'sus2',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 7, string: 2 },
      { fret: 5, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },

  {
    type: '7sus4',
    fretStart: 0,
    fretEnd: 4,
    notes: [
      { fret: 0, string: 3 },
      { fret: 2, string: 2 },
      { fret: 1, string: 1 },
      { fret: 3, string: 0 },
    ],
    disabledStrings: [4, 5],
  },
  {
    type: '7sus4',
    fretStart: 5,
    fretEnd: 8,
    notes: [
      { fret: 5, string: 4 },
      { fret: 7, string: 3 },
      { fret: 5, string: 2 },
      { fret: 8, string: 1 },
      { fret: 5, string: 0 },
    ],
    disabledStrings: [5],
    barre: { fret: 5, stringEnd: 4, stringStart: 0 },
  },
  {
    type: '7sus4',
    fretStart: 10,
    fretEnd: 13,
    notes: [
      { fret: 10, string: 5 },
      { fret: 12, string: 4 },
      { fret: 10, string: 3 },
      { fret: 12, string: 2 },
      { fret: 10, string: 1 },
      { fret: 10, string: 0 },
    ],
    disabledStrings: [],
    barre: { fret: 10, stringEnd: 5, stringStart: 0 },
  },

  {
    type: '9',
    disabledStrings: [0, 5],
    fretStart: 4,
    fretEnd: 6,
    notes: [
      { fret: 5, string: 4 },
      { fret: 4, string: 3 },
      { fret: 5, string: 2 },
      { fret: 5, string: 1 },
    ],
  },
  {
    type: '9',
    disabledStrings: [5],
    fretStart: 4,
    fretEnd: 6,
    notes: [
      { fret: 5, string: 4 },
      { fret: 4, string: 3 },
      { fret: 5, string: 2 },
      { fret: 5, string: 1 },
      { fret: 5, string: 0 },
    ],
    barre: { fret: 5, stringEnd: 2, stringStart: 0 },
  },
  {
    type: '7#9',
    disabledStrings: [0, 5],
    fretStart: 4,
    fretEnd: 7,
    notes: [
      { fret: 5, string: 4 },
      { fret: 4, string: 3 },
      { fret: 5, string: 2 },
      { fret: 6, string: 1 },
    ],
  },
  {
    type: '7#9',
    disabledStrings: [4, 5],
    fretStart: 11,
    fretEnd: 14,
    notes: [
      { fret: 12, string: 3 },
      { fret: 11, string: 2 },
      { fret: 13, string: 1 },
      { fret: 13, string: 0 },
    ],
  },
];
