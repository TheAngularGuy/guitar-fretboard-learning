import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const D_SHARP_SCALES: ScaleGroup = {
  rootNote: 'D#',
  scales: {
    Major: {
      notes: ['G', 'G#', 'A#', 'C', 'D', 'D#', 'F'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21'],
    },
    Dorian: {
      notes: ['F#', 'G#', 'A#', 'C', 'C#', 'D#', 'F'],
      segments: ['1,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21'],
    },
    Phrygian: {
      notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21'],
    },
    Lydian: {
      notes: ['G', 'A', 'A#', 'C', 'D', 'D#', 'F'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20'],
    },
    Mixolydian: {
      notes: ['G', 'G#', 'A#', 'C', 'C#', 'D#', 'F'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21'],
    },
    Aeolian: {
      notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
      segments: ['1,4', '3,7', '6,9', '8,12', '10,14', '13,16', '15,19', '18,21'],
    },
    Locrian: {
      notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22'],
    },
    HarmonicMinor: {
      notes: ['F#', 'G#', 'A#', 'B', 'D', 'D#', 'F'],
      segments: ['0,4', '3,7', '5,9', '8,12', '10,14', '12,16', '15,19', '17,21'],
    },
    MelodicMinor: {
      notes: ['F#', 'G#', 'A#', 'C', 'D', 'D#', 'F'],
      segments: ['0,4', '3,7', '5,9', '7,11', '10,14', '12,16', '15,19', '17,21'],
    },
    MajorPentatonic: {
      notes: ['G', 'G', 'A#', 'C', 'D#', 'F'],
      segments: ['0,4', '3,6', '5,8', '8,11', '10,13', '12,16', '15,18', '17,20'],
    },
    MinorPentatonic: {
      notes: ['G#', 'A#', 'C#', 'D#', 'F#'],
      segments: ['1,4', '3,7', '6,9', '8,11', '11,14', '13,16', '15,19', '18,21'],
    },
    Blues: {
      notes: ['G#', 'A', 'A#', 'C#', 'D#', 'F#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '11,14', '13,17', '15,19', '18,22'],
    },
    MajorBlues: {
      notes: ['G', 'A#', 'C', 'D#', 'F#', 'F'],
      segments: ['0,4', '3,7', '5,9', '8,11', '10,14', '12,16', '15,19', '17,21'],
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
