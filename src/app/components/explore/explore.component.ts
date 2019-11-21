import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cagedScale } from 'src/app/data/chromatic-scale.data';
import { Note } from 'src/app/models/note.model';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  exploreForm: FormGroup;
  notes = cagedScale;

  constructor(private fb: FormBuilder, private utils: UtilitiesService) {}

  ngOnInit() {
    this.setForm();
  }

  setForm(): FormGroup {
    return (this.exploreForm = this.fb.group({
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

  onNoteClicked(note: Note) {
    // Just in case we need to to something here in the future
  }
}
