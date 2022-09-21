import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const C_SHARP_SCALES: ScaleGroup = {
  rootNote: 'C#',
  scales: {
    Major: {
      notes: ['F', 'F#', 'G#', 'A#', 'C', 'C#', 'D#'],
      segments: ['1,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21'],
    },
    Dorian: {
      notes: ['E', 'F#', 'G#', 'A#', 'B', 'C#', 'D#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21'],
    },
    Phrygian: {
      notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22'],
    },
    Lydian: {
      notes: ['F', 'G', 'G#', 'A#', 'C', 'C#', 'D#'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21'],
    },
    Mixolydian: {
      notes: ['F', 'F#', 'G#', 'A#', 'B', 'C#', 'D#'],
      segments: ['1,4', '3,7', '6,9', '8,12', '10,14', '13,16', '15,19', '18,21'],
    },
    Aeolian: {
      notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22'],
    },
    Locrian: {
      notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
      segments: ['2,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22'],
    },
    HarmonicMinor: {
      notes: ['E', 'F#', 'G#', 'A', 'C', 'C#', 'D#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '10,14', '13,17', '15,19', '18,22'],
    },
    MelodicMinor: {
      notes: ['E', 'F#', 'G#', 'A#', 'C', 'C#', 'D#'],
      segments: ['1,5', '3,7', '5,9', '8,12', '10,14', '13,17', '15,19', '17,21'],
    },
    MajorPentatonic: {
      notes: ['F', 'F', 'G#', 'A#', 'C#', 'D#'],
      segments: ['1,4', '3,6', '6,9', '8,11', '10,14', '13,16', '15,18', '18,21'],
    },
    MinorPentatonic: {
      notes: ['F#', 'G#', 'B', 'C#', 'E'],
      segments: ['1,5', '4,7', '6,9', '9,12', '11,14', '13,17', '16,19', '18,21'],
    },
    Blues: {
      notes: ['F#', 'G', 'G#', 'B', 'C#', 'E'],
      segments: ['1,5', '4,8', '6,10', '9,12', '11,15', '13,17', '16,20', '18,22'],
    },
    MajorBlues: {
      notes: ['F', 'G#', 'A#', 'C#', 'E', 'D#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '10,14', '13,17', '15,19', '18,21'],
    },
    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
