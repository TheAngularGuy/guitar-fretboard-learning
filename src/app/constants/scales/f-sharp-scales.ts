import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const F_SHARP_SCALES: ScaleGroup = {
  rootNote: 'F#',
  scales: {
    Major: {
      notes: ['A#', 'B', 'C#', 'D#', 'F', 'F#', 'G#'],
      segments: ['1,4', '3,7', '6,9', '8,12', '10,14', '13,16', '15,19', '18,21']
    },
    Dorian: {
      notes: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G#'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22']
    },
    Phrygian: {
      notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G'],
      segments: ['2,5', '1,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22']
    },
    Lydian: {
      notes: ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#'],
      segments: ['1,4', '0,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21']
    },
    Mixolydian: {
      notes: ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21']
    },
    Aeolian: {
      notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22']
    },
    Locrian: {
      notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G'],
      segments: ['2,5', '4,8', '7,10', '9,13', '11,15', '14,17', '16,20', '19,22']
    },
    HarmonicMinor: {
      notes: ['A', 'B', 'C#', 'D', 'F', 'F#', 'G#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '11,15', '13,17', '15,19', '18,22']
    },
    MelodicMinor: {
      notes: ['A', 'B', 'C#', 'D#', 'F', 'F#', 'G#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '10,14', '13,17', '15,19', '18,22']
    },
    MajorPentatonic: {
      notes: ['A#', 'A#', 'C#', 'D#', 'F#', 'G#'],
      segments: ['1,4', '0,4', '3,7', '6,9', '8,11', '11,14', '13,16', '15,19', '18,21']
    },
    MinorPentatonic: {
      notes: ['B', 'C#', 'E', 'F#', 'A'],
      segments: ['2,5', '4,7', '6,10', '9,12', '11,14', '14,17', '16,19', '18,22']
    },
    Blues: {
      notes: ['B', 'C', 'C#', 'E', 'F#', 'A'],
      segments: ['2,5', '4,8', '6,10', '9,13', '11,15', '14,17', '16,20', '18,22']
    },
    MajorBlues: {
      notes: ['A#', 'C#', 'D#', 'F#', 'A', 'G#'],
      segments: ['1,5', '3,7', '6,10', '8,12', '11,14', '13,17', '15,19', '18,22']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
