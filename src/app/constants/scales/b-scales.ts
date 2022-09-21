import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const B_SCALES: ScaleGroup = {
  rootNote: 'B',
  scales: {
    Major: {
      notes: ['D#', 'E', 'F#', 'G#', 'A#', 'B', 'C#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21'],
    },
    Dorian: {
      notes: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22'],
    },
    Phrygian: {
      notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C'],
      segments: ['2,5', '4,8', '7,10', '6,10', '9,13', '11,15', '14,17', '16,20', '19,22'],
    },
    Lydian: {
      notes: ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'C#'],
      segments: ['1,4', '3,7', '6,9', '5,9', '8,12', '10,14', '13,16', '15,19', '18,21'],
    },
    Mixolydian: {
      notes: ['D#', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
      segments: ['1,5', '4,7', '3,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22'],
    },
    Aeolian: {
      notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      segments: ['2,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22'],
    },
    Locrian: {
      notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C'],
      segments: ['0,3', '2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22'],
    },
    HarmonicMinor: {
      notes: ['D', 'E', 'F#', 'G', 'A#', 'B', 'C#'],
      segments: ['1,5', '4,8', '6,10', '8,12', '11,15', '13,17', '16,20', '18,22'],
    },
    MelodicMinor: {
      notes: ['D', 'E', 'F#', 'G#', 'A#', 'B', 'C#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '11,15', '13,17', '15,19', '18,22'],
    },
    MajorPentatonic: {
      notes: ['D#', 'D#', 'F#', 'G#', 'B', 'C#'],
      segments: ['1,4', '4,7', '6,9', '5,9', '8,12', '11,14', '13,16', '16,19', '18,21'],
    },
    MinorPentatonic: {
      notes: ['E', 'F#', 'A', 'B', 'D'],
      segments: ['2,5', '4,7', '7,10', '9,12', '11,15', '14,17', '16,19', '19,22'],
    },
    Blues: {
      notes: ['E', 'F', 'F#', 'A', 'B', 'D'],
      segments: ['2,6', '4,8', '7,10', '9,13', '11,15', '14,18', '16,20', '19,22'],
    },
    MajorBlues: {
      notes: ['D#', 'F#', 'G#', 'B', 'D', 'C#'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,15', '13,17', '16,19', '18,22'],
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
