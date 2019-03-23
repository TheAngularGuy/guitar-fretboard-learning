import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { chromaticScale } from 'src/app/data/chromatic-scale.data';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from 'src/app/models/note.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

const enum MODES {
  locate = 1,
  identify = 2
}
const ANIMATION_DELAY = 1250;
const CLICK_INTERVAL = 500;

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss']
})
export class LocateComponent implements OnInit {
  mode: MODES;
  locateForm: FormGroup;
  fretboardNotes = fretboardNotes;
  notes = chromaticScale;
  showAll = false;
  showSettings = false;
  paused = true;
  lastClickRegistred = 0;

  noteToFind: Note;
  good = 0;
  bad = 0;

  constructor(private fb: FormBuilder
    , private route: ActivatedRoute
    , private utils: UtilitiesService) { }

  ngOnInit() {
    this.mode = this.route.snapshot.params.mode ? MODES.identify : MODES.locate;
    this.setForm();
  }

  setForm(): FormGroup {
    return this.locateForm = this.fb.group({
      selectedNotes: [
        this.notes, [
          Validators.required,
          this.utils.validateSelectedNotes
        ]
      ],
      fretStart: [
        0, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
          this.utils.validateFrets(this)
        ]
      ],
      fretEnd: [
        12, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
          this.utils.validateFrets(this)
        ]
      ]
    });
  }

  onResetForm() {
    this.setForm();
  }

  toggleShowAll(): boolean {
    return (this.showAll = !this.showAll);
  }

  toggleSettings(): boolean {
    if (this.locateForm.invalid) {
      this.utils.openSnackBar('There seems to be an error in the inputs above.', null);
      return;
    }
    return (this.showSettings = !this.showSettings);
  }

  togglePaused(): boolean {
    if (this.locateForm.invalid) { return; }
    this.paused = !this.paused;
    if (!this.paused) {
      this.showSettings = false;
      this.good = this.bad = 0;
      this.pickRandomNote();
    } else {
      this.noteToFind = null;
    }
    return this.paused;
  }

  pickRandomNote(): Note {
    const selectedNotes = this.locateForm.value.selectedNotes;
    if (!this.checkSelectedNotes(selectedNotes)) { return; }

    const randomString = Math.ceil(Math.random() * 1000) % 6;
    const randomFret = Math.max(
      Math.ceil(Math.random() * 1000) % (this.locateForm.value.fretEnd + 1),
      this.locateForm.value.fretStart);
    const note = this.fretboardNotes[randomFret][randomString];

    if (!note
      || !selectedNotes.includes(note)
      || (this.noteToFind && note == this.noteToFind.note)) {
      console.log('bad note', note, randomFret, randomString);
      return this.pickRandomNote();
    }
    return this.noteToFind = {
      fret: randomFret,
      string: randomString,
      note
    };
  }

  checkSelectedNotes(selectedNotes: string[]) {
    const intervalNotes = this.fretboardNotes
      .slice(this.locateForm.value.fretStart, this.locateForm.value.fretEnd + 1)
      .join().split(',');
    const areSelectedNotesInTheFretsInterval = selectedNotes
      .slice()
      .map((n: string) => intervalNotes.join(' ').includes(n + ' '))
      .includes(true);
    if (!areSelectedNotesInTheFretsInterval) {
      this.utils.openSnackBar(`The selected notes are not
        in the interval of frets you selected.
        Change the settiongs!`, null);
      this.togglePaused();
      this.toggleSettings();
      return false;
    }
    return true;
  }

  onNoteClicked(noteObject: Note): boolean {
    const now = Date.now();
    if ((now - this.lastClickRegistred) < CLICK_INTERVAL) { return false; }
    if (this.paused) { return; }
    if (noteObject.note == this.noteToFind.note) {
      this.good++;
    } else {
      this.bad++;
    }
    setTimeout(() => this.pickRandomNote(), ANIMATION_DELAY);
    this.lastClickRegistred = now;
    return true;
  }

  onNoteGuessed(n: string, btn: any) {
    const isRegistred = this.onNoteClicked({
      fret: 0,
      string: 0,
      note: n
    });
    if (!isRegistred) { return; }
    if (n == this.noteToFind.note) {
      btn.color = 'primary';
    } else {
      btn.color = 'warn';
    }
    setTimeout(() => btn.color = '', ANIMATION_DELAY);
  }

}
