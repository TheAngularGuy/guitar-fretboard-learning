import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { chromaticScale } from 'src/app/data/chromatic-scale.data';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from 'src/app/models/note.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

const enum MODES {
  locate = 1,
  identify = 2,
}
const ANIMATION_TIME = 250;
const ANIMATION_DELAY = 1250;
const CLICK_INTERVAL = 500;
const MAX_RANGE = 5;

interface NoteToFind extends Note {
  time: number;
}

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss'],
  animations: [slideAnimation, popAnimation],
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

  noteToFind: NoteToFind;
  scoreHistory: { noteToFind: Note; noteGessed: Note; time: number; good: boolean }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly utils: UtilitiesService,
  ) {}

  ngOnInit() {
    this.mode = this.route.snapshot.params.mode ? MODES.identify : MODES.locate;
    this.setForm();
  }

  setForm(): FormGroup {
    return (this.locateForm = this.fb.group({
      selectedNotes: [this.notes, [Validators.required, this.utils.validateSelectedNotes]],
      fretStart: [
        0,
        [Validators.required, Validators.min(0), Validators.max(12), this.utils.validateFrets(this)],
      ],
      fretEnd: [
        12,
        [Validators.required, Validators.min(0), Validators.max(12), this.utils.validateFrets(this)],
      ],
    }));
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
    if (this.locateForm.invalid) {
      return;
    }
    this.paused = !this.paused;
    if (!this.paused) {
      this.showSettings = false;
      this.scoreHistory = [];
      this.pickRandomNote();
    } else {
      this.noteToFind = null;
    }
    return this.paused;
  }

  checkSelectedNotes(selectedNotes: string[]): boolean {
    const intervalNotes = this.fretboardNotes
      .slice(this.locateForm.value.fretStart, this.locateForm.value.fretEnd + 1)
      .join()
      .split(',');
    const areSelectedNotesInTheFretsInterval = selectedNotes
      .slice()
      .map((n: string) => intervalNotes.join(' ').includes(n + ' '))
      .includes(true);
    if (!areSelectedNotesInTheFretsInterval) {
      this.utils.openSnackBar(
        `The selected notes are not
        in the interval of frets you selected.
        Change the settiongs!`,
        null,
      );
      this.togglePaused();
      this.toggleSettings();
      return false;
    }
    return true;
  }

  pickRandomNote(): Note {
    const selectedNotes = this.locateForm.value.selectedNotes;
    if (!this.checkSelectedNotes(selectedNotes)) {
      return;
    }
    const randomString = Math.ceil(Math.random() * 1000) % 6;
    const randomFret = Math.max(
      Math.ceil(Math.random() * 1000) % (this.locateForm.value.fretEnd + 1),
      this.locateForm.value.fretStart,
    );
    const note = this.fretboardNotes[randomFret][randomString];
    if (!note || !selectedNotes.includes(note) || (this.noteToFind && note == this.noteToFind.note)) {
      return this.pickRandomNote();
    }
    return (this.noteToFind = {
      time: Date.now(),
      fret: randomFret,
      string: randomString,
      note,
    });
  }

  onNoteClicked(noteObject: Note): boolean {
    const now = Date.now();
    if (this.paused || now - this.lastClickRegistred <= CLICK_INTERVAL) {
      return false;
    }

    this.lastClickRegistred = now;
    this.scoreHistory.push({
      noteToFind: this.noteToFind,
      noteGessed: noteObject,
      good: noteObject.note == this.noteToFind.note,
      time: Date.now() - this.noteToFind.time - ANIMATION_TIME,
    });

    if (this.scoreHistory.length == MAX_RANGE) {
      this.paused = true;
      setTimeout(() => {
        this.showAll = false;
        this.noteToFind = null;
        // we need a timeout so when the user is wrong on the last guess
        // the note stay in red a little so he knows he was wrong.
      }, ANIMATION_DELAY);
      return;
    }
    setTimeout(() => this.pickRandomNote(), ANIMATION_DELAY);
    return true;
  }

  onNoteGuessed(n: string, btn: any) {
    const isRegistred = this.onNoteClicked({
      fret: 0,
      string: 0,
      note: n,
    });
    if (!isRegistred) {
      return;
    }
    if (n == this.noteToFind.note) {
      btn.color = 'primary';
    } else {
      btn.color = 'warn';
    }
    setTimeout(() => (btn.color = ''), ANIMATION_DELAY);
  }

  // utils
  getNumberOfGood() {
    return this.scoreHistory.reduce((acc, n) => acc + (n.good ? 1 : 0), 0);
  }
  getNumberOfBad() {
    return this.scoreHistory.length - this.getNumberOfGood();
  }
  getAverageTime() {
    return this.scoreHistory.reduce((acc, n) => acc + n.time, 0) / this.scoreHistory.length / 1000; // in second
  }
}
