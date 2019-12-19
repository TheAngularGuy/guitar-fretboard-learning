import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CHORD_TYPES } from 'src/app/constants/chord-types.constant';
import {
  A_7SUS4_CHORDS,
  A_9_CHORDS,
  A_ADD9_CHORDS,
  A_FIVE_CHORDS,
  A_M7_CHORDS,
  A_MAJ7_CHORDS,
  A_MAJOR_CHORDS,
  A_MINOR_CHORDS,
  A_SEVEN_CHORDS,
  A_SUS2_CHORDS,
  A_SUS4_CHORDS,
} from 'src/app/constants/chords-list.constant';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { Chord } from 'src/app/models/chord.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

@Component({
  selector: 'app-explore-chords',
  templateUrl: './explore-chords.page.html',
  styleUrls: ['./explore-chords.page.scss'],
})
export class ExploreChordsPage implements OnInit {
  fretboardNotes: string[][];
  preferences: PreferencesStateModel;
  chromaticScale = CHROMATIC_SCALE;
  chordTypes = CHORD_TYPES;

  allChordsHash: { [key: string]: Chord[] };

  selectedNote: string;
  selectedType: string;

  selectedChords: Chord[];

  constructor(
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);

    this.allChordsHash = {
      A_MAJOR: A_MAJOR_CHORDS,
      A_MINOR: A_MINOR_CHORDS,
      A_5: A_FIVE_CHORDS,
      A_7: A_SEVEN_CHORDS,
      A_MAJ7: A_MAJ7_CHORDS,
      A_M7: A_M7_CHORDS,
      A_SUS4: A_SUS4_CHORDS,
      A_SUS2: A_SUS2_CHORDS,
      A_7SUS4: A_7SUS4_CHORDS,
      A_ADD9: A_ADD9_CHORDS,
      A_9: A_9_CHORDS,
    };
    this.onSelectNote('A');
  }

  onSelectNote(n: string) {
    this.selectedNote = n;
    this.onSelectType(this.chordTypes[0]);
  }

  onSelectType(n: string) {
    this.selectedType = n;
    this.onUpdateChord();
  }

  onUpdateChord() {
    this.selectedChords = this.allChordsHash[
      this.selectedNote.toUpperCase() + '_' + this.selectedType.toUpperCase()
    ];
  }

  getSelectedNotesFromChord(c: Chord) {
    return c.notes;
  }
}
