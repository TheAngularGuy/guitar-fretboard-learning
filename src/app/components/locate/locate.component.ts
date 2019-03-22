import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { chromaticScale } from 'src/app/data/chromatic-scale.data';
import { fretboardNotes } from 'src/app/data/fretboard-notes.data';
import { Note } from 'src/app/models/note.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

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

  constructor(private fb: FormBuilder, private utils: UtilitiesService) { }

  ngOnInit() {
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
      this.utils.openSnackBar(`The selected notes are not
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

}
