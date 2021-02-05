import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const F_SCALES: ScaleGroup = {
  rootNote: 'F',
  scales: {
    Major: {
      notes: ['A', 'A#', 'C', 'D', 'E', 'F', 'G'],
      segments: ['0,3', '2,6', '5,8', '7,11', '9,13', '12,15', '14,18', '17,20']
    },
    Dorian: {
      notes: ['G#', 'A#', 'C', 'D', 'D#', 'F', 'G'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21']
    },
    Phrygian: {
      notes: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'F#'],
      segments: ['1,4', '0,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21']
    },
    Lydian: {
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      segments: ['0,3', '2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22']
    },
    Mixolydian: {
      notes: ['A', 'A#', 'C', 'D', 'D#', 'F', 'G'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20']
    },
    Aeolian: {
      notes: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21']
    },
    Locrian: {
      notes: ['G#', 'A#', 'B', 'C#', 'D#', 'F', 'F#'],
      segments: ['1,4', '3,7', '6,9', '8,12', '10,14', '13,16', '15,19', '18,21']
    },
    HarmonicMinor: {
      notes: ['G#', 'A#', 'C', 'C#', 'E', 'F', 'G'],
      segments: ['0,4', '2,6', '5,9', '7,11', '10,14', '12,16', '14,18', '17,21']
    },
    MelodicMinor: {
      notes: ['G#', 'A#', 'C', 'D', 'E', 'F', 'G'],
      segments: ['0,4', '2,6', '5,9', '7,11', '9,13', '12,16', '14,18', '17,21']
    },
    MajorPentatonic: {
      notes: ['A', 'A', 'C', 'D', 'F', 'G'],
      segments: ['0,3', '2,6', '5,8', '7,10', '10,13', '12,15', '14,18', '17,20', '19,22']
    },
    MinorPentatonic: {
      notes: ['A#', 'C', 'D#', 'F', 'G#'],
      segments: ['1,4', '3,6', '5,9', '8,11', '10,13', '13,16', '15,18', '17,21']
    },
    Blues: {
      notes: ['A#', 'B', 'C', 'D#', 'F', 'G#'],
      segments: ['1,4', '3,7', '5,9', '8,12', '10,14', '13,16', '15,19', '17,21']
    },
    MajorBlues: {
      notes: ['A', 'C', 'D', 'F', 'G#', 'G'],
      segments: ['0,4', '2,6', '5,9', '7,11', '10,13', '12,16', '14,18', '17,21']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
