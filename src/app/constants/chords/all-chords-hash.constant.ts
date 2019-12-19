import { A_CHORDS } from 'src/app/constants/chords/a-chords-list.constant';
import { A_SHARP_CHORDS } from 'src/app/constants/chords/a-sharp-chords-list.constant';
import { B_CHORDS } from 'src/app/constants/chords/b-chords-list.constant';
import { C_CHORDS } from 'src/app/constants/chords/c-chords-list.constant';
import { C_SHARP_CHORDS } from 'src/app/constants/chords/c-sharp-chords-list.constant';
import { D_CHORDS } from 'src/app/constants/chords/d-chords-list.constant';
import { D_SHARP_CHORDS } from 'src/app/constants/chords/d-sharp-chords-list.constant';
import { E_CHORDS } from 'src/app/constants/chords/e-chords-list.constant';

export const ALL_CHORDS_HASH = {
  A_MAJOR: A_CHORDS.filter(c => c.type === 'Major'),
  A_MINOR: A_CHORDS.filter(c => c.type === 'Minor'),
  A_5: A_CHORDS.filter(c => c.type === '5'),
  A_7: A_CHORDS.filter(c => c.type === '7'),
  A_MAJ7: A_CHORDS.filter(c => c.type === 'maj7'),
  A_M7: A_CHORDS.filter(c => c.type === 'm7'),
  A_SUS4: A_CHORDS.filter(c => c.type === 'sus4'),
  A_SUS2: A_CHORDS.filter(c => c.type === 'sus2'),
  A_7SUS4: A_CHORDS.filter(c => c.type === '7sus4'),
  A_ADD9: A_CHORDS.filter(c => c.type === 'add9'),
  A_9: A_CHORDS.filter(c => c.type === '9'),
  A_7SHARP9: A_CHORDS.filter(c => c.type === '7#9'),

  B_MAJOR: B_CHORDS.filter(c => c.type === 'Major'),
  B_MINOR: B_CHORDS.filter(c => c.type === 'Minor'),
  B_5: B_CHORDS.filter(c => c.type === '5'),
  B_7: B_CHORDS.filter(c => c.type === '7'),
  B_MAJ7: B_CHORDS.filter(c => c.type === 'maj7'),
  B_M7: B_CHORDS.filter(c => c.type === 'm7'),
  B_SUS4: B_CHORDS.filter(c => c.type === 'sus4'),
  B_SUS2: B_CHORDS.filter(c => c.type === 'sus2'),
  B_7SUS4: B_CHORDS.filter(c => c.type === '7sus4'),
  B_ADD9: B_CHORDS.filter(c => c.type === 'add9'),
  B_9: B_CHORDS.filter(c => c.type === '9'),
  B_7SHARP9: B_CHORDS.filter(c => c.type === '7#9'),

  C_MAJOR: C_CHORDS.filter(c => c.type === 'Major'),
  C_MINOR: C_CHORDS.filter(c => c.type === 'Minor'),
  C_5: C_CHORDS.filter(c => c.type === '5'),
  C_7: C_CHORDS.filter(c => c.type === '7'),
  C_MAJ7: C_CHORDS.filter(c => c.type === 'maj7'),
  C_M7: C_CHORDS.filter(c => c.type === 'm7'),
  C_SUS4: C_CHORDS.filter(c => c.type === 'sus4'),
  C_SUS2: C_CHORDS.filter(c => c.type === 'sus2'),
  C_7SUS4: C_CHORDS.filter(c => c.type === '7sus4'),
  C_ADD9: C_CHORDS.filter(c => c.type === 'add9'),
  C_9: C_CHORDS.filter(c => c.type === '9'),
  C_7SHARP9: C_CHORDS.filter(c => c.type === '7#9'),

  D_MAJOR: D_CHORDS.filter(c => c.type === 'Major'),
  D_MINOR: D_CHORDS.filter(c => c.type === 'Minor'),
  D_5: D_CHORDS.filter(c => c.type === '5'),
  D_7: D_CHORDS.filter(c => c.type === '7'),
  D_MAJ7: D_CHORDS.filter(c => c.type === 'maj7'),
  D_M7: D_CHORDS.filter(c => c.type === 'm7'),
  D_SUS4: D_CHORDS.filter(c => c.type === 'sus4'),
  D_SUS2: D_CHORDS.filter(c => c.type === 'sus2'),
  D_7SUS4: D_CHORDS.filter(c => c.type === '7sus4'),
  D_ADD9: D_CHORDS.filter(c => c.type === 'add9'),
  D_9: D_CHORDS.filter(c => c.type === '9'),
  D_7SHARP9: D_CHORDS.filter(c => c.type === '7#9'),

  E_MAJOR: E_CHORDS.filter(c => c.type === 'Major'),
  E_MINOR: E_CHORDS.filter(c => c.type === 'Minor'),
  E_5: E_CHORDS.filter(c => c.type === '5'),
  E_7: E_CHORDS.filter(c => c.type === '7'),
  E_MAJ7: E_CHORDS.filter(c => c.type === 'maj7'),
  E_M7: E_CHORDS.filter(c => c.type === 'm7'),
  E_SUS4: E_CHORDS.filter(c => c.type === 'sus4'),
  E_SUS2: E_CHORDS.filter(c => c.type === 'sus2'),
  E_7SUS4: E_CHORDS.filter(c => c.type === '7sus4'),
  E_ADD9: E_CHORDS.filter(c => c.type === 'add9'),
  E_9: E_CHORDS.filter(c => c.type === '9'),
  E_7SHARP9: E_CHORDS.filter(c => c.type === '7#9'),

  A_SHARP_MAJOR: A_SHARP_CHORDS.filter(c => c.type === 'Major'),
  A_SHARP_MINOR: A_SHARP_CHORDS.filter(c => c.type === 'Minor'),
  A_SHARP_5: A_SHARP_CHORDS.filter(c => c.type === '5'),
  A_SHARP_7: A_SHARP_CHORDS.filter(c => c.type === '7'),
  A_SHARP_MAJ7: A_SHARP_CHORDS.filter(c => c.type === 'maj7'),
  A_SHARP_M7: A_SHARP_CHORDS.filter(c => c.type === 'm7'),
  A_SHARP_SUS4: A_SHARP_CHORDS.filter(c => c.type === 'sus4'),
  A_SHARP_SUS2: A_SHARP_CHORDS.filter(c => c.type === 'sus2'),
  A_SHARP_7SUS4: A_SHARP_CHORDS.filter(c => c.type === '7sus4'),
  A_SHARP_ADD9: A_SHARP_CHORDS.filter(c => c.type === 'add9'),
  A_SHARP_9: A_SHARP_CHORDS.filter(c => c.type === '9'),
  A_SHARP_7SHARP9: A_SHARP_CHORDS.filter(c => c.type === '7#9'),

  C_SHARP_MAJOR: C_SHARP_CHORDS.filter(c => c.type === 'Major'),
  C_SHARP_MINOR: C_SHARP_CHORDS.filter(c => c.type === 'Minor'),
  C_SHARP_5: C_SHARP_CHORDS.filter(c => c.type === '5'),
  C_SHARP_7: C_SHARP_CHORDS.filter(c => c.type === '7'),
  C_SHARP_MAJ7: C_SHARP_CHORDS.filter(c => c.type === 'maj7'),
  C_SHARP_M7: C_SHARP_CHORDS.filter(c => c.type === 'm7'),
  C_SHARP_SUS4: C_SHARP_CHORDS.filter(c => c.type === 'sus4'),
  C_SHARP_SUS2: C_SHARP_CHORDS.filter(c => c.type === 'sus2'),
  C_SHARP_7SUS4: C_SHARP_CHORDS.filter(c => c.type === '7sus4'),
  C_SHARP_ADD9: C_SHARP_CHORDS.filter(c => c.type === 'add9'),
  C_SHARP_9: C_SHARP_CHORDS.filter(c => c.type === '9'),
  C_SHARP_7SHARP9: C_SHARP_CHORDS.filter(c => c.type === '7#9'),

  D_SHARP_MAJOR: D_SHARP_CHORDS.filter(c => c.type === 'Major'),
  D_SHARP_MINOR: D_SHARP_CHORDS.filter(c => c.type === 'Minor'),
  D_SHARP_5: D_SHARP_CHORDS.filter(c => c.type === '5'),
  D_SHARP_7: D_SHARP_CHORDS.filter(c => c.type === '7'),
  D_SHARP_MAJ7: D_SHARP_CHORDS.filter(c => c.type === 'maj7'),
  D_SHARP_M7: D_SHARP_CHORDS.filter(c => c.type === 'm7'),
  D_SHARP_SUS4: D_SHARP_CHORDS.filter(c => c.type === 'sus4'),
  D_SHARP_SUS2: D_SHARP_CHORDS.filter(c => c.type === 'sus2'),
  D_SHARP_7SUS4: D_SHARP_CHORDS.filter(c => c.type === '7sus4'),
  D_SHARP_ADD9: D_SHARP_CHORDS.filter(c => c.type === 'add9'),
  D_SHARP_9: D_SHARP_CHORDS.filter(c => c.type === '9'),
  D_SHARP_7SHARP9: D_SHARP_CHORDS.filter(c => c.type === '7#9'),
};

/*

var interv = 1;

function add(ob) {
   ob.fretStart = (interv + ob.fretStart) ;
   ob.fretEnd = (interv + ob.fretEnd ) ;

   let modeModulo = false;

   if (ob.fretStart >= 12) {
      ob.fretStart = ( ob.fretStart) % 12 ;
      ob.fretEnd = ( ob.fretEnd ) % 12 ;

      modeModulo = true;
   }

   const newNotes = [];
   for (let n of  ob.notes) {

      if (modeModulo) {
        newNotes.push({
         fret: (interv + n.fret) % 12,
         string: n.string
       })
      } else {
       newNotes.push({
         fret: (interv + n.fret) ,
         string: n.string
       })
      }

   }

   ob.notes = newNotes;
   if (ob.barre) {
     if (modeModulo) {
      ob.barre.fret = (ob.barre.fret + interv ) % 12;
     } else {
      ob.barre.fret = (ob.barre.fret + interv );
     }
   }
   return ob;
}

function addToAll(arr) {
  const ret = [];

  for (let i of arr) {
    ret.push(add(i))
  }
  return ret;
}

*/
