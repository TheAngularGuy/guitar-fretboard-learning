import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { A_MINOR_CHORDS } from 'src/app/constants/chords-list.constant';
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

  chord: Chord = A_MINOR_CHORDS[0];

  constructor(
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
  }

  getSelectedNotesFromChord(c: Chord) {
    return c.notes;
  }
}
