import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators, AbstractControl,
  ValidatorFn, ValidationErrors, FormGroup
} from '@angular/forms';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from '../../models/note.model';
import { chromaticScale } from 'src/app/data/chromatic-scale.data';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.scss']
})
export class LocateComponent implements OnInit {
  fretboardNotes = fretboardNotes;
  notes: string[] = chromaticScale;
  showSettings = false;
  paused = true;
  locateForm: FormGroup;

  noteToFind: Note;
  good = 0;
  bad = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setForm();
  }

  setForm(): FormGroup {
    return this.locateForm = this.fb.group({
      selectedNotes: [this.notes, Validators.required],
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

  toggleSettings(): boolean {
    return (this.showSettings = !this.showSettings);
  }

  togglePaused(): boolean {
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
    const formValues = this.locateForm.value;
    const randomFret = Math.ceil(Math.random() * 1000) % 13;
    const randomString = Math.ceil(Math.random() * 1000) % 6;
    const note = this.fretboardNotes[randomFret][randomString];

    if (!note
      || !formValues.selectedNotes.includes(note)
      || !this.fretboardNotes.slice(formValues.fretStart, formValues.fretEnd + 1)
        .join().split(',').join(' ').includes(note + ' ')
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
      if (end < start) { return { frets: true }; }
      return null;
    };
  }

}
