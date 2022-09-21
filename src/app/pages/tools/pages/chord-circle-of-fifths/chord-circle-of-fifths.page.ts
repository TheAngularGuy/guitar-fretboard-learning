import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CHORD_TYPES } from '@constants/chord-types.constant';
import { ALL_CHORDS_HASH } from '@constants/chords/all-chords-hash.constant';
import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { FRETBOARD_STANDARD } from '@constants/fretboard-notes.constant';
import { ExploreSetSelectedChordAction } from '@core/stores/explore/explore.actions';
import { ExploreState, ExploreStateModel } from '@core/stores/explore/explore.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { Chord, ChordType } from '@models/chord.model';
import { Note } from '@models/note.model';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chord-circle-of-fifths',
  templateUrl: './chord-circle-of-fifths.page.html',
  styleUrls: ['./chord-circle-of-fifths.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChordCircleOfFifthsPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  dropDownOpen$ = new BehaviorSubject(true);
  fretboardNotes: string[][];
  preferences: PreferencesStateModel;
  exploreState: ExploreStateModel;
  chromaticScale = [...CHROMATIC_SCALE];
  chordTypes = CHORD_TYPES;
  allChordsHash: { [key: string]: Chord[] };
  selectedNote: string;
  selectedType: ChordType;
  selectedChords: Chord[];

  exploreForm: FormGroup;
  showChordNb = 0;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  get isNextChordAvailable() {
    return this.showChordNb < this.selectedChords?.length - 1;
  }

  get isPrevChordAvailable() {
    return this.showChordNb > 0;
  }

  get isStandardTuning() {
    return this.preferences.tuning.toLowerCase() === 'standard';
  }


  nextChord() {
    if (this.showChordNb < this.selectedChords?.length - 1) {
      this.showChordNb++;
    } else {
      this.showChordNb = 0;
    }
    this.scrollToFretBoard();
  }

  prevChord() {
    if (this.showChordNb > 0) {
      this.showChordNb--;
    } else {
      this.showChordNb = this.selectedChords?.length - 1;
    }
    this.scrollToFretBoard();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    let s = 0;
    Object.keys(ALL_CHORDS_HASH).forEach(key => {
      s += ALL_CHORDS_HASH[key].length;
    });
    console.log(s);
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.exploreState = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    this.fretboardNotes = FRETBOARD_STANDARD;
    this.allChordsHash = ALL_CHORDS_HASH;

    this.listenToPreferences();
    this.listenToChordsChange();
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
        this.cd.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  listenToChordsChange() {
    this.store.select(ExploreState.getState).pipe(
      tap(ecploreState => {
        console.log({ ecploreState });
        this.exploreState = ecploreState;
        this.selectedNote = ecploreState.selectedChord.noteName;
        this.selectedType = ecploreState.selectedChord.type;

        this.exploreForm = this.fb.group({
          note: [this.exploreState.selectedChord.noteName, [Validators.required]],
          type: [this.exploreState.selectedChord.type, [Validators.required]],
        });
        this.onUpdateChord();
        this.cd.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  onSelectNote(n: string) {
    this.selectedNote = n;
    this.onSelectType(this.selectedType || this.exploreState.selectedChord.type);
  }

  onSelectType(n: ChordType) {
    this.selectedType = n;
    this.onUpdateChord();
  }

  onUpdateChord() {
    this.showChordNb = 0;
    const chordsKey = this.selectedNote.toUpperCase().replace('#', '_SHARP') + '_CHORDS';
    this.selectedChords = this.allChordsHash[chordsKey].filter(c => c.type === this.selectedType);

    if (
      !this.exploreState.selectedChord ||
      this.selectedNote !== this.exploreState.selectedChord.noteName ||
      this.selectedType !== this.exploreState.selectedChord.type
    ) {
      this.store.dispatch(
        new ExploreSetSelectedChordAction({
          noteName: this.selectedNote,
          type: this.selectedType,
        }),
      );
    }
  }

  getSelectedNotesFromChord(c: Chord) {
    // TODO: remove this as any...
    return c.notes as any as Note[];
  }

  toggleDropDown() {
    const bool = this.dropDownOpen$.getValue();
    this.dropDownOpen$.next(!bool);
  }

  scrollToFretBoard() {
    return;
    if ((window as any).fretboard) {
      (window as any).fretboard.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
