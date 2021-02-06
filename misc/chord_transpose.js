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