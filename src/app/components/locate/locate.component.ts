import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators, AbstractControl,
  ValidatorFn, ValidationErrors, FormGroup
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from 'src/app/models/note.model';
import { chromaticScale } from 'src/app/data/chromatic-scale.data';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss']
})
export class LocateComponent implements OnInit {
  fretboardNotes = fretboardNotes;
  notes: string[] = chromaticScale;
  showAll = false;
  showSettings = false;
  paused = true;
  locateForm: FormGroup;

  noteToFind: Note;
  good = 0;
  bad = 0;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.setForm();
  }

  setForm(): FormGroup {
    return this.locateForm = this.fb.group({
      selectedNotes: [
        this.notes, [
          Validators.required,
          this.validateSelectedNotes
        ]
      ],
      fretStart: [
        0, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
          this.validateFrets(this)
        ]
      ],
      fretEnd: [
        12, [
          Validators.required,
          Validators.min(0),
          Validators.max(12),
          this.validateFrets(this)
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
    if (this.locateForm.invalid) { return; }
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
    const randomFret = Math.ceil(Math.random() * 1000) % 13;
    const randomString = Math.ceil(Math.random() * 1000) % 6;
    const note = this.fretboardNotes[randomFret][randomString];
    const selectedNotes = this.locateForm.value.selectedNotes;
    const intervalNotes = this.fretboardNotes
      .slice(this.locateForm.value.fretStart, this.locateForm.value.fretEnd + 1)
      .join().split(',');

    if (!this.checkSelectedNotes(selectedNotes, intervalNotes)) { return; }

    if (!note
      || !selectedNotes.includes(note)
      || !intervalNotes.join(' ').includes(note + ' ')
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

  checkSelectedNotes(selectedNotes: string[], intervalNotes: string[]) {
    const areSelectedNotesInTheFretsInterval = selectedNotes
      .slice()
      .map((n: string) => intervalNotes.join(' ').includes(n + ' '))
      .includes(true);
    if (!areSelectedNotesInTheFretsInterval) {
      this.openSnackBar(`The selected notes are not
        in the interval of frets you selected.
        Change the settiongs!`, null);
      this.togglePaused();
      this.toggleSettings();
      return false;
    }
    return true;
  }

  onNoteClicked(noteObject: Note) {
    if (this.paused) { return; }
    if (noteObject.note == this.noteToFind.note) {
      this.good++;
    } else {
      this.bad++;
    }
    // TODO: execute animation
    setTimeout(() => {
      this.pickRandomNote();
    }, 1250);
  }

  validateFrets(context: LocateComponent): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!context || !context.locateForm
        || !context.locateForm.get('fretEnd')
        || !context.locateForm.get('fretStart')) {
        return null;
      }
      const end = Number(context.locateForm.get('fretEnd').value);
      const start = Number(context.locateForm.get('fretStart').value);
      if (end <= start) { return { frets: true }; }
      return null;
    };
  }

  validateSelectedNotes(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value) { return null; }
    if (control.value.length <= 2) {
      return { selectedNotes: true };
    }
    return null;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

}
