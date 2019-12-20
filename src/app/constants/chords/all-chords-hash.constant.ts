import { A_CHORDS } from 'src/app/constants/chords/a-chords-list.constant';
import { A_SHARP_CHORDS } from 'src/app/constants/chords/a-sharp-chords-list.constant';
import { B_CHORDS } from 'src/app/constants/chords/b-chords-list.constant';
import { C_CHORDS } from 'src/app/constants/chords/c-chords-list.constant';
import { C_SHARP_CHORDS } from 'src/app/constants/chords/c-sharp-chords-list.constant';
import { D_CHORDS } from 'src/app/constants/chords/d-chords-list.constant';
import { D_SHARP_CHORDS } from 'src/app/constants/chords/d-sharp-chords-list.constant';
import { E_CHORDS } from 'src/app/constants/chords/e-chords-list.constant';
import { F_CHORDS } from 'src/app/constants/chords/f-chords-list.constant';
import { F_SHARP_CHORDS } from 'src/app/constants/chords/f-sharp-chords-list.constant';
import { G_CHORDS } from 'src/app/constants/chords/g-chords-list.constant';
import { G_SHARP_CHORDS } from 'src/app/constants/chords/g-sharp-chords-list.constant';

export const ALL_CHORDS_HASH = {
  A_CHORDS,
  B_CHORDS,
  C_CHORDS,
  D_CHORDS,
  E_CHORDS,
  F_CHORDS,
  G_CHORDS,
  A_SHARP_CHORDS,
  C_SHARP_CHORDS,
  D_SHARP_CHORDS,
  F_SHARP_CHORDS,
  G_SHARP_CHORDS,
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
