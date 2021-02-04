input =  {
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
}
output = {}
CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
(function transform() {
    const keys = Object.keys(input)

    keys.forEach(k => {
        const notes = input[k].notes.map(n => {
            let index = CHROMATIC_SCALE.findIndex(item => item === n) + 1;
            if (index > 11) {index = 0}
            return CHROMATIC_SCALE[index];
        });
        const segments = input[k].segments.map(seg => {
            let min = +seg.split(',')[0] + 1;
            let max = +seg.split(',')[1] + 1;
            return min + ',' + max;
        });

        output[k] = {
            notes,
            segments,
        }
    });
    // console.log(output)
})();

fs = require('fs');
fs.writeFile('output.js', JSON.stringify(output), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});