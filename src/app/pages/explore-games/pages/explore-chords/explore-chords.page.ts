import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Chord } from 'src/app/models/chord.model';
import { Note } from 'src/app/models/note.model';
import {
  FretboardManipulationService,
} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import {
  PreferencesState,
  PreferencesStateModel,
} from 'src/app/shared/store/preferences/preferences.state';

@Component({
  selector: 'app-explore-chords',
  templateUrl: './explore-chords.page.html',
  styleUrls: ['./explore-chords.page.scss'],
})
export class ExploreChordsPage implements OnInit {
  fretboardNotes: string[][];
  preferences: PreferencesStateModel;

  chord: Chord = {
    fretStart: 8,
    fretEnd: 10,
    notes: [
      {
        fret: 8,
        noteName: 'C',
        string: 0,
      },
      {
        fret: 10,
        noteName: 'A',
        string: 1,
      },
      {
        fret: 9,
        noteName: 'E',
        string: 2,
      },
    ],
    disabledStrings: [3, 4, 5],
  };

  constructor(
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(
      PreferencesState.getState,
    );
    this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(
      this.preferences,
    );
  }

  getSelectedNotesFromChord(c: Chord) {
    const notes = c.notes.map((note: Note) => {
      return note.noteName;
    });
    return notes;
  }
}
