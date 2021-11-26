import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const C_SCALES: ScaleGroup = {
  rootNote: 'C',
  scales: {
    Major: {
      notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D'],
      segments: ['0,3', '3,5', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22']
    },
    Dorian: {
      notes: ['D#', 'F', 'G', 'A', 'A#', 'C', 'D'],
      segments: ['0,4', '2,6', '5, 8', '7,11', '10,13', '12,16', '14,18', '17,20']
    },
    Phrygian: {
      notes: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'C#'],
      segments: ['0,4', '3,6', '5, 9', '8,11', '10,14', '12,16', '15,18', '17,21']
    },
    Lydian: {
      notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
      segments: ['2,5', '4,8', '7, 10', '9,13', '11,15', '14,17', '16,20', '19,22']
    },
    Mixolydian: {
      notes: ['E', 'F', 'G', 'A', 'A#', 'C', 'D'],
      segments: ['0,3', '2,6', '5,8', '7,11', '9,13', '12,15', '14,18', '17,20']
    },
    Aeolian: {
      notes: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21']
    },
    Locrian: {
      notes: ['D#', 'F', 'F#', 'G#', 'A#', 'C', 'C#'],
      segments: ['1,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21']
    },


    HarmonicMinor: {
      notes: ['D#', 'F', 'G', 'G#', 'B', 'C', 'D'],
      segments: ['0,4', '2,6', '5,9', '7,11', '9,13', '12,16', '14,18', '17,21']
    },
    MelodicMinor: {
      notes: ['D#', 'F', 'G', 'A', 'B', 'C', 'D'],
      segments: ['0,4', '2,6', '4,8', '7,11', '9,13', '12,16', '14,18', '16,20']
    },

    MajorPentatonic: {
      notes: ['E', 'E', 'G', 'A', 'C', 'D'],
      segments: ['0,3', '2,5', '5,8', '7,10', '9,13', '12,15', '14,17', '17,20', '19,22']
    },
    MinorPentatonic: {
      notes: ['F', 'G', 'A#', 'C', 'D#'],
      segments: ['0,4', '3,6', '5,8', '8,11', '10,13', '12,16', '15,18', '17,20']
    },
    Blues: {
      notes: ['F', 'F#', 'G', 'A#', 'C', 'D#'],
      segments: ['0,4', '3,7', '5,9', '8,11', '10,14', '12,16', '15,19', '17,21']
    },
    MajorBlues: {
      notes: ['E', 'G', 'A', 'C', 'D#', 'D'],
      segments: ['0,4', '2,6', '5,8', '7,11', '9,13', '12,16', '14,18', '17,20']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
