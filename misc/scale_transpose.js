input =  {
    Major: {
        notes: ['D', 'D#', 'F', 'G', 'A', 'A#', 'C'],
        segments: ['0,4', '2,6', '5,8', '7,11', '10,13', '12,16', '14,18', '17,20']
    },
    Dorian: {
        notes: ['C#', 'D#', 'F', 'G', 'G#', 'A#', 'C'],
        segments: ['0,4', '3,6', '5,9', '8,11', '10,14', '12,16', '15,18', '17,21']
    },
    Phrygian: {
        notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'B'],
        segments: ['1,4', '3,7', '6,9', '5,9', '8,12', '10,14', '13,16', '15,19', '18,21']
    },
    Lydian: {
        notes: ['D', 'E', 'F', 'G', 'A', 'A#', 'C'],
        segments: ['0,3', '2,6', '5,8', '4,8', '7,11', '9,13', '12,15', '14,18', '17,20']
    },
    Mixolydian: {
        notes: ['D', 'D#', 'F', 'G', 'G#', 'A#', 'C'],
        segments: ['0,4', '3,6', '2,6', '5,9', '7,11', '10,13', '12,16', '15,18', '17,21']
    },
    Aeolian: {
        notes: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
        segments: ['0,4', '3,7', '5,9', '8,11', '10,14', '13,16', '15,19', '17,21']
    },
    Locrian: {
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
        segments: ['1,5', '3,7', '6,9', '8,12', '11,14', '13,17', '15,19', '18,21']
    },
    HarmonicMinor: {
        notes: ['C#', 'D#', 'F', 'F#', 'A', 'A#', 'C'],
        segments: ['0,4', '3,7', '5,9', '7,11', '10,14', '12,16', '15,19', '17,21']
    },
    MelodicMinor: {
        notes: ['C#', 'D#', 'F', 'G', 'A', 'A#', 'C'],
        segments: ['0,4', '2,6', '5,9', '7,11', '10,14', '12,16', '14,18', '17,21']
    },
    MajorPentatonic: {
        notes: ['D', 'D', 'F', 'G', 'A#', 'C'],
        segments: ['0,3', '3,6', '5,8', '4,8', '7,11', '10,13', '12,15', '15,18', '17,20']
    },
    MinorPentatonic: {
        notes: ['D#', 'F', 'G#', 'A#', 'C#'],
        segments: ['1,4', '3,6', '6,9', '8,11', '10,14', '13,16', '15,18', '18,21']
    },
    Blues: {
        notes: ['D#', 'E', 'F', 'G#', 'A#', 'C#'],
        segments: ['1,5', '3,7', '6,9', '8,12', '10,14', '13,17', '15,19', '18,21']
    },
    MajorBlues: {
        notes: ['D', 'F', 'G', 'A#', 'C#', 'C'],
        segments: ['0,4', '3,6', '5,9', '7,11', '10,14', '12,16', '15,18', '17,21']
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
        let segments = input[k].segments.map(seg => {
            let min = +seg.split(',')[0] + 1;
            let max = +seg.split(',')[1] + 1;
            if (max > 22) {
                min = 0; max -= 19;
            }
            return min + ',' + max;
        });
        segments.sort((seg1, seg2) => +seg1.split(',')[1] - +seg2.split(',')[1]);
        const listSegments = [];
        segments.forEach(seg => {
            if (listSegments.indexOf(seg) === -1) {
                listSegments.push(seg)
            }
        })

        output[k] = {
            notes,
            segments: listSegments,
        }
    });
    // console.log(output)
})();

fs = require('fs');
fs.writeFile('output.js', JSON.stringify(output), function (err) {
    if (err) return console.log(err);
    console.log('new scales at > output.js');
});