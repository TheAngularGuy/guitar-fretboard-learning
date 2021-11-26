import {ScaleGroup} from '@models/scale';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

export const G_SHARP_SCALES: ScaleGroup = {
  rootNote: 'G#',
  scales: {
    Major: {
      notes: ['C', 'C#', 'D#', 'F', 'G', 'G#', 'A#'],
      segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21']
    },
    Dorian: {
      notes: ['B', 'C#', 'D#', 'F', 'F#', 'G#', 'A#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '10,14', '13,16', '15,19', '18,21']
    },
    Phrygian: {
      notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A'],
      segments: ['1,5', '4,7', '3,7', '6,10', '8,12', '11,14', '13,17', '16,19', '18,22']
    },
    Lydian: {
      notes: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
      segments: ['0,4', '3,6', '2,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21']
    },
    Mixolydian: {
      notes: ['C', 'C#', 'D#', 'F', 'F#', 'G#', 'A#'],
      segments: ['1,4', '0,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21']
    },
    Aeolian: {
      notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
      segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21']
    },
    Locrian: {
      notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
      segments: ['1,5', '4,7', '6,10', '9,12', '11,15', '13,17', '16,19', '18,22']
    },
    HarmonicMinor: {
      notes: ['B', 'C#', 'D#', 'E', 'G', 'G#', 'A#'],
      segments: ['1,5', '3,7', '5,9', '8,12', '10,14', '13,17', '15,19', '17,21']
    },
    MelodicMinor: {
      notes: ['B', 'C#', 'D#', 'F', 'G', 'G#', 'A#'],
      segments: ['0,4', '3,7', '5,9', '8,12', '10,14', '12,16', '15,19', '17,21']
    },
    MajorPentatonic: {
      notes: ['C', 'C', 'D#', 'F', 'G#', 'A#'],
      segments: ['1,4', '3,6', '2,6', '5,9', '8,11', '10,13', '13,16', '15,18', '17,21']
    },
    MinorPentatonic: {
      notes: ['C#', 'D#', 'F#', 'G#', 'B'],
      segments: ['1,4', '4,7', '6,9', '8,12', '11,14', '13,16', '16,19', '18,21']
    },
    Blues: {
      notes: ['C#', 'D', 'D#', 'F#', 'G#', 'B'],
      segments: ['1,5', '4,7', '6,10', '8,12', '11,15', '13,17', '16,19', '18,22']
    },
    MajorBlues: {
      notes: ['C', 'D#', 'F', 'G#', 'B', 'A#'],
      segments: ['1,4', '3,7', '5,9', '8,12', '10,14', '13,16', '15,19', '17,21']
    },

    Chromatic: {
      notes: CHROMATIC_SCALE,
      segments: []
    },
  }
};
