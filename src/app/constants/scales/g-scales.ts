import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const G_SCALES: ScaleGroup = {
  rootNote: 'G',
  scales: {
    Major: {
      notes: ['B', 'C', 'D', 'E', 'F#', 'G', 'A'],
      segments: ['2,5', '4,8', '7,10', '9,13', '11,15', '14,17', '16,20', '19,22'],
    },
    Dorian: {
      notes: ['A#', 'C', 'D', 'E', 'F', 'G', 'A'],
      segments: ['0,4', '2,6', '5,8', '7,11', '9,13', '12,15', '14,18', '17,20'],
    },
    Phrygian: {
      notes: ['A#', 'C', 'D', 'D#', 'F', 'G', 'G#'],
      segments: ['0,4', '3,6', '2,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21'],
    },
    Lydian: {
      notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
      segments: ['2,5', '1,5', '4,8', '6,10', '9,12', '11,15', '14,17', '16,20', '18,22'],
    },
    Mixolydian: {
      notes: ['B', 'C', 'D', 'E', 'F', 'G', 'A'],
      segments: ['0,3', '2,6', '4,8', '7,10', '9,13', '12,15', '14,18', '16,20', '19,22'],
    },
    Aeolian: {
      notes: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20'],
    },
    Locrian: {
      notes: ['A#', 'C', 'C#', 'D#', 'F', 'G', 'G#'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21'],
    },
    HarmonicMinor: {
      notes: ['A#', 'C', 'D', 'D#', 'F#', 'G', 'A'],
      segments: ['0,4', '2,6', '4,8', '7,11', '9,13', '12,16', '14,18', '16,20'],
    },
    MelodicMinor: {
      notes: ['A#', 'C', 'D', 'E', 'F#', 'G', 'A'],
      segments: ['2,6', '4,8', '7,11', '9,13', '11,15', '14,18', '16,20'],
    },
    MajorPentatonic: {
      notes: ['B', 'B', 'D', 'E', 'G', 'A'],
      segments: ['0,3', '2,5', '1,5', '4,8', '7,10', '9,12', '12,15', '14,17', '16,20', '19,22'],
    },
    MinorPentatonic: {
      notes: ['C', 'D', 'F', 'G', 'A#'],
      segments: ['0,3', '3,6', '5,8', '7,11', '10,13', '12,15', '15,18', '17,20'],
    },
    Blues: {
      notes: ['C', 'C#', 'D', 'F', 'G', 'A#'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,14', '12,16', '15,18', '17,21'],
    },
    MajorBlues: {
      notes: ['B', 'D', 'E', 'G', 'A#', 'A'],
      segments: ['0,3', '2,6', '4,8', '7,11', '9,13', '12,15', '14,18', '16,20'],
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
