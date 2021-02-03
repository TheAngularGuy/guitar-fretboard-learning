import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {CAGED_SCALE} from 'src/app/constants/caged-scale.constant';
import {FretboardManipulationService} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import {PreferencesState, PreferencesStateModel} from 'src/app/shared/store/preferences/preferences.state';

import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';
import {
  ExploreSetFretEndAction,
  ExploreSetFretStartAction,
  ExploreSetSelectedNotesAction,
} from '../../store/explore.actions';
import {ExploreState, ExploreStateModel} from '../../store/explore.state';

@Component({
  selector: 'app-explore-notes',
  templateUrl: './explore-notes.page.html',
  styleUrls: ['./explore-notes.page.scss'],
})
export class ExploreNotesPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  exploreForm: FormGroup;
  fretboardNotes: string[][];
  chromaticScale: string[];
  cagedScale: string[];

  frets = new Array(18).fill(null).map((item, i) => i);

  preferences: PreferencesStateModel;
  exploreState: ExploreStateModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
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
  }

  setForm() {
    const form = this.fb.group({
      selectedNotes: [this.exploreState.selectedNotes, [Validators.required]],
      fretStart: [
        this.exploreState.fretStart,
        [Validators.required, Validators.min(0), Validators.max(17)],
      ],
      fretEnd: [this.exploreState.fretEnd, [Validators.required, Validators.min(0), Validators.max(17)]],
    });
    this.exploreForm = form;
    this.setFormListener();
  }

  setFormListener() {
    this.exploreForm.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: ExploreStateModel) => {
        const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);

        if (formValue.selectedNotes !== exploreSt.selectedNotes) {
          this.store.dispatch(
            new ExploreSetSelectedNotesAction({
              selectedNotes: formValue.selectedNotes,
            }),
          );
        }
        if (formValue.fretStart !== exploreSt.fretStart) {
          this.store.dispatch(
            new ExploreSetFretStartAction({
              fretStart: formValue.fretStart,
            }),
          );
        }
        if (formValue.fretEnd !== exploreSt.fretEnd) {
          this.store.dispatch(
            new ExploreSetFretEndAction({
              fretEnd: formValue.fretEnd,
            }),
          );
        }
      });
  }
}
