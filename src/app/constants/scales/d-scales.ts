import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const D_SCALES: ScaleGroup = {
  rootNote: 'D',
  scales: {
    Major: {
      notes: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E'],
      segments: ['2,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22']
    },
    Dorian: {
      notes: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
      segments: ['0,3', '2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22']
    },
    Phrygian: {
      notes: ['F', 'G', 'A', 'A#', 'C', 'D', 'D#'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20']
    },
    Lydian: {
      notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22']
    },
    Mixolydian: {
      notes: ['F#', 'G', 'A', 'B', 'C', 'D', 'E'],
      segments: ['2,5', '4,8', '7,10', '9,13', '11,15', '14,17', '16,20', '19,22']
    },
    Aeolian: {
      notes: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
      segments: ['0,3', '2,6', '5,8', '7,11', '9,13', '12,15', '14,18', '17,20']
    },
    Locrian: {
      notes: ['F', 'G', 'G#', 'A#', 'C', 'D', 'D#'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21']
    },
    HarmonicMinor: {
      notes: ['F', 'G', 'A', 'A#', 'C#', 'D', 'E'],
      segments: ['2,6', '4,8', '7,11', '9,13', '11,15', '14,18', '16,20']
    },
    MelodicMinor: {
      notes: ['F', 'G', 'A', 'B', 'C#', 'D', 'E'],
      segments: ['2,6', '4,8', '6,10', '9,13', '11,15', '14,18', '16,20', '18,22']
    },
    MajorPentatonic: {
      notes: ['F#', 'F#', 'A', 'B', 'D', 'E'],
      segments: ['2,5', '4,7', '7,10', '9,12', '11,15', '14,17', '16,19', '19,22']
    },
    MinorPentatonic: {
      notes: ['G', 'A', 'C', 'D', 'F'],
      segments: ['0,3', '2,6', '5,8', '7,10', '10,13', '12,15', '14,18', '17,20', '19,22']
    },
    Blues: {
      notes: ['G', 'G#', 'A', 'C', 'D', 'F'],
      segments: ['0,4', '2,6', '5,9', '7,11', '10,13', '12,16', '14,18', '17,21']
    },
    MajorBlues: {
      notes: ['F#', 'A', 'B', 'D', 'F', 'E'],
      segments: ['2,6', '4,8', '7,10', '9,13', '11,15', '14,18', '16,20', '19,22']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
