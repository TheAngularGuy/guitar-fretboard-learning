import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Subject} from 'rxjs';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {ExploreState, ExploreStateModel} from '@pages/explore/store/explore.state';
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';
import {ExploreSetSelectedScaleAction} from '@pages/explore/store/explore.actions';
import {MAX_FRETS} from '@constants/max-frets';
import {ALL_SCALES_TYPES_LIST} from '@constants/scales/all-scales-types';
import {ALL_SCALES_HASH} from '@constants/scales/all-scales-hash';
import {Scale, ScaleGroup} from '@models/scale';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-explore-scales',
  templateUrl: './explore-scales.page.html',
  styleUrls: ['./explore-scales.page.scss'],
})
export class ExploreScalesPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  dropDownOpen$ = new BehaviorSubject(true);
  exploreForm: FormGroup;
  fretboardNotes: string[][];

  fretsSegments: string[] = [];
  selectedNotes: string[] = [];
  rootNote: string = null;
  fretStart = 0;
  fretEnd = MAX_FRETS;
  scaleTypesList = ALL_SCALES_TYPES_LIST;
  chromaticScale = CHROMATIC_SCALE;
  allScales = ALL_SCALES_HASH;

  preferences: PreferencesStateModel;
  exploreState: ExploreStateModel;

  get isStandardTuning() {
    return this.preferences.tuning.toLowerCase() === 'standard';
  }

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
    this.setForm();

    this.store.select(ExploreState.getSelectedScale).pipe(
      tap((selectedScale) => {
        const scaleGroup: ScaleGroup = this.allScales[selectedScale.rootNote];
        if (!scaleGroup) {
          return console.error('No scaleGroup found');
        }
        const scale: Scale = scaleGroup.scales[selectedScale.scale];
        if (!scale) {
          return console.error('No scale found');
        }
        this.rootNote = selectedScale.rootNote;
        this.selectedNotes = scale.notes;
        this.fretsSegments = scale.segments;
        this.setFretStartAndEndFromSegment(selectedScale.segment);
      }),
      takeUntil(this.destroyed$),
    ).subscribe();

    this.listenToPreferences();
  }

  listenToPreferences() {
    if (this.preferences.tuning.toLowerCase() !== 'standard') {
      this.exploreForm.get('segment').patchValue('all');
      this.exploreForm.get('segment').disable();
    }
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
        this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
        if (this.preferences.tuning.toLowerCase() !== 'standard') {
          this.exploreForm.get('segment').patchValue('all');
          this.exploreForm.get('segment').disable();
        } else {
          this.exploreForm.get('segment').enable();
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  setFretStartAndEndFromSegment(segment: string) {
    if (!segment || segment === 'all') {
      this.fretStart = 0;
      this.fretEnd = MAX_FRETS;
    } else {
      this.fretStart = +segment.split(',')[0];
      this.fretEnd = +segment.split(',')[1];
    }
  }

  setForm() {
    const selectedScale = this.store.selectSnapshot(ExploreState.getSelectedScale);
    this.exploreForm = this.fb.group({
      rootNote: [selectedScale.rootNote, [Validators.required]],
      scaleType: [selectedScale.scale, [Validators.required]],
      segment: [selectedScale.segment, [Validators.required]],
    });
  }

  onSelectedNotes(selectedNote: string) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (selectedNote !== exploreSt.selectedScale.rootNote) {
      this.store.dispatch(
        new ExploreSetSelectedScaleAction({
          rootNote: selectedNote,
          scale: exploreSt.selectedScale.scale,
          segment: 'all',
        })
      );
      this.exploreForm.get('segment').patchValue('all');
    }
  }

  onSelectedScale(selectedScale: string) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (selectedScale !== exploreSt.selectedScale.scale) {
      this.store.dispatch(
        new ExploreSetSelectedScaleAction({
          rootNote: exploreSt.selectedScale.rootNote,
          scale: selectedScale,
          segment: 'all',
        })
      );
      this.exploreForm.get('segment').patchValue('all');
    }
  }

  onSelectedSegment(segment: string) {
    const exploreSt = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    if (segment !== exploreSt.selectedScale.segment) {
      this.setFretStartAndEndFromSegment(segment);

      this.store.dispatch(
        new ExploreSetSelectedScaleAction({
          rootNote: exploreSt.selectedScale.rootNote,
          scale: exploreSt.selectedScale.scale,
          segment,
        })
      );
    }
  }

  toggleDropDown() {
    const bool = this.dropDownOpen$.getValue();
    this.dropDownOpen$.next(!bool);
  }

}
