import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const E_SCALES: ScaleGroup = {
  rootNote: 'E',
  scales: {
    Major: {
      notes: ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22']
    },
    Dorian: {
      notes: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#'],
      segments: ['2,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22']
    },
    Phrygian: {
      notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
      segments: ['0,3', '2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22']
    },
    Lydian: {
      notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21']
    },
    Mixolydian: {
      notes: ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22']
    },
    Aeolian: {
      notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      segments: ['2,5', '4,8', '7,10', '9,13', '11,15', '14,17', '16,20', '19,22']
    },
    Locrian: {
      notes: ['G', 'A', 'A#', 'C', 'D', 'E', 'F'],
      segments: ['0,3', '2,6', '5,8', '7,11', '9,13', '12,15', '14,18', '17,20']
    },
    HarmonicMinor: {
      notes: ['G', 'A', 'B', 'C', 'D#', 'E', 'F#'],
      segments: ['1,5', '4,8', '6,10', '9,13', '11,15', '13,17', '16,20', '18,22']
    },
    MelodicMinor: {
      notes: ['G', 'A', 'B', 'C#', 'D#', 'E', 'F#'],
      segments: ['1,5', '4,8', '6,10', '8,12', '11,15', '13,17', '16,20', '18,22']
    },
    MajorPentatonic: {
      notes: ['G#', 'G#', 'B', 'C#', 'E', 'F#'],
      segments: ['1,5', '4,7', '6,9', '9,12', '11,14', '13,17', '16,19', '18,21']
    },
    MinorPentatonic: {
      notes: ['A', 'B', 'D', 'E', 'G'],
      segments: ['0,3', '2,5', '4,8', '7,10', '9,12', '12,15', '14,17', '16,20', '19,22']
    },
    Blues: {
      notes: ['A', 'A#', 'B', 'D', 'E', 'G'],
      segments: ['0,3', '2,6', '4,8', '7,11', '9,13', '12,15', '14,18', '16,20']
    },
    MajorBlues: {
      notes: ['G#', 'B', 'C#', 'E', 'G', 'F#'],
      segments: ['1,5', '4,8', '6,10', '9,12', '11,15', '13,17', '16,20', '18,22']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
