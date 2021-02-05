import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Subject} from 'rxjs';
import {CAGED_SCALE} from 'src/app/constants/caged-scale.constant';
import {FretboardManipulationService} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import {PreferencesState, PreferencesStateModel} from 'src/app/shared/store/preferences/preferences.state';

import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';
import {ExploreSetFretEndAction, ExploreSetFretStartAction, ExploreSetSelectedNotesAction,} from '../../store/explore.actions';
import {ExploreState, ExploreStateModel} from '../../store/explore.state';
import {MAX_FRETS} from '@constants/max-frets';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-explore-notes',
  templateUrl: './explore-notes.page.html',
  styleUrls: ['./explore-notes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreNotesPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  dropDownOpen$ = new BehaviorSubject(true);
  exploreForm: FormGroup;
  fretboardNotes: string[][];
  chromaticScale: string[];
  cagedScale: string[];

  frets = new Array(MAX_FRETS + 1).fill(null).map((item, i) => i);

  preferences: PreferencesStateModel;
  exploreState: ExploreStateModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnInit() {
    this.exploreState = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
    this.chromaticScale = CHROMATIC_SCALE;
    this.cagedScale = CAGED_SCALE;
    this.setForm();
    this.listenToPreferences();
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
        this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
        this.cd.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  setForm() {
    this.exploreForm = this.fb.group({
      selectedNotes: [this.exploreState.selectedNotes, [Validators.required]],
      fretStart: [this.exploreState.fretStart, [Validators.required, Validators.min(0), Validators.max(MAX_FRETS)]],
      fretEnd: [this.exploreState.fretEnd, [Validators.required, Validators.min(0), Validators.max(MAX_FRETS)]],
    });
  }

  onSelectedNotes(selectedNotes: string[]) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (selectedNotes !== exploreSt.selectedNotes) {
      this.store.dispatch(
        new ExploreSetSelectedNotesAction({
          selectedNotes,
        }),
      );
    }
  }

  onSelectedFretStart(fretStart: number) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (fretStart !== exploreSt.fretStart) {
      this.store.dispatch(
        new ExploreSetFretStartAction({
          fretStart,
        }),
      );
    }
  }

  onSelectedFretEnd(fretEnd: number) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (fretEnd !== exploreSt.fretStart) {
      this.store.dispatch(
        new ExploreSetFretEndAction({
          fretEnd,
        }),
      );
    }
  }

  toggleDropDown() {
    const bool = this.dropDownOpen$.getValue();
    this.dropDownOpen$.next(!bool);
  }
}
