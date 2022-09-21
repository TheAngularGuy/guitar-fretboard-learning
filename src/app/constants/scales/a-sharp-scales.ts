import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { ScaleGroup } from '@models/scale';

export const A_SHARP_SCALES: ScaleGroup = {
  rootNote: 'A#',
  scales: {
    Major: {
      notes: ['D', 'D#', 'F', 'G', 'A', 'A#', 'C'],
      segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20'],
    },
    Dorian: {
      notes: ['C#', 'D#', 'F', 'G', 'G#', 'A#', 'C'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21'],
    },
    Phrygian: {
      notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'B'],
      segments: ['1,4', '3,7', '6,9', '5,9', '8,12', '10,14', '13,16', '15,19', '18,21'],
    },
    Lydian: {
      notes: ['D', 'E', 'F', 'G', 'A', 'A#', 'C'],
      segments: ['0,3', '2,6', '5,8', '4,8', '7,11', '9,13', '12,15', '14,18', '17,20'],
    },
    Mixolydian: {
      notes: ['D', 'D#', 'F', 'G', 'G#', 'A#', 'C'],
      segments: ['0,4', '3,6', '2,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21'],
    },
    Aeolian: {
      notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
      segments: ['0,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21'],
    },
    Locrian: {
      notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21'],
    },
    HarmonicMinor: {
      notes: ['C#', 'D#', 'F', 'F#', 'A', 'A#', 'C'],
      segments: ['0,4', '3,7', '5,9', '7,11', '10,14', '12,16', '15,19', '17,21'],
    },
    MelodicMinor: {
      notes: ['C#', 'D#', 'F', 'G', 'A', 'A#', 'C'],
      segments: ['0,4', '2,6', '5,9', '7,11', '10,14', '12,16', '14,18', '17,21'],
    },
    MajorPentatonic: {
      notes: ['D', 'D', 'F', 'G', 'A#', 'C'],
      segments: ['0,3', '3,6', '5,8', '4,8', '7,11', '10,13', '12,15', '15,18', '17,20'],
    },
    MinorPentatonic: {
      notes: ['D#', 'F', 'G#', 'A#', 'C#'],
      segments: ['1,4', '3,6', '6,9', '8,11', '10,14', '13,16', '15,18', '18,21'],
    },
    Blues: {
      notes: ['D#', 'E', 'F', 'G#', 'A#', 'C#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '10,14', '13,17', '15,19', '18,21'],
    },
    MajorBlues: {
      notes: ['D', 'F', 'G', 'A#', 'C#', 'C'],
      segments: ['0,4', '3,6', '5,9', '7,11', '10,14', '12,16', '15,18', '17,21'],
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: [],
    },
  },
};
