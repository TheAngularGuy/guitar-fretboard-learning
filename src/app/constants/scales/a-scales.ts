import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const A_SCALES: ScaleGroup = {
  rootNote: 'A',
  scales: {
    Major: {
      notes: ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22'],
    },
    Dorian: {
      notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
      segments: ['2,5', '4,8', '7,10', '9,13', '11,15', '14,17', '16,20', '19,22'],
    },
    Phrygian: {
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'A#'],
      segments: ['0,3', '2,6', '5,8', '4,8', '7,11', '9,13', '12,15', '14,18', '17,20'],
    },
    Lydian: {
      notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
      segments: ['1,5', '4,7', '3,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22'],
    },
    Mixolydian: {
      notes: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B'],
      segments: ['2,5', '1,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22'],
    },
    Aeolian: {
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      segments: ['2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22'],
    },
    Locrian: {
      notes: ['C', 'D', 'D#', 'F', 'G', 'A', 'A#'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20'],
    },
    HarmonicMinor: {
      notes: ['C', 'D', 'E', 'F', 'G#', 'A', 'B'],
      segments: ['2,6', '4,8', '6,10', '9,13', '11,15', '14,18', '16,20', '18,22'],
    },
    MelodicMinor: {
      notes: ['C', 'D', 'E', 'F#', 'G#', 'A', 'B'],
      segments: ['1,5', '4,8', '6,10', '9,13', '11,15', '13,17', '16,20', '18,22'],
    },
    MajorPentatonic: {
      notes: ['C#', 'C#', 'E', 'F#', 'A', 'B'],
      segments: ['2,5', '4,7', '3,7', '6,10', '9,12', '11,14', '14,17', '16,19', '18,22'],
    },
    MinorPentatonic: {
      notes: ['D', 'E', 'G', 'A', 'C'],
      segments: ['0,3', '2,5', '5,8', '7,10', '9,13', '12,15', '14,17', '17,20', '19,22'],
    },
    Blues: {
      notes: ['D', 'D#', 'E', 'G', 'A', 'C'],
      segments: ['0,4', '2,6', '5,8', '7,11', '9,13', '12,16', '14,18', '17,20'],
    },
    MajorBlues: {
      notes: ['C#', 'E', 'F#', 'A', 'C', 'B'],
      segments: ['2,5', '4,8', '6,10', '9,13', '11,15', '14,17', '16,20', '18,22'],
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
