import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { MAX_FRETS } from '@constants/max-frets';
import { ALL_SCALES_HASH } from '@constants/scales/all-scales-hash';
import { ALL_SCALES_TYPES_LIST } from '@constants/scales/all-scales-types';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { ExploreSetSelectedScaleAction } from '@core/stores/explore/explore.actions';
import { ExploreState, ExploreStateModel } from '@core/stores/explore/explore.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { Scale, ScaleGroup } from '@models/scale';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-explore-scales',
  templateUrl: './explore-scales.page.html',
  styleUrls: ['./explore-scales.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  get isStandardTuning() {
    return this.preferences.tuning.toLowerCase() === 'standard';
  }

  get selectedSegmentIndex() {
    const selectedSegment = this.exploreForm.get('segment').value;
    return ['all', ...this.fretsSegments].findIndex(el => el === selectedSegment);
  }


  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnInit() {
    this.exploreState = this.store.selectSnapshot<ExploreStateModel>(ExploreState.getState);
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.fretboardNotes = FretboardManipulationService.getFretboardNotes(this.preferences);
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
        this.cd.markForCheck();
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
        this.fretboardNotes = FretboardManipulationService.getFretboardNotes(this.preferences);
        if (this.preferences.tuning.toLowerCase() !== 'standard') {
          this.exploreForm.get('segment').patchValue('all');
          this.exploreForm.get('segment').disable();
        } else {
          this.exploreForm.get('segment').enable();
        }
        this.cd.markForCheck();
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
        }),
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
        }),
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
        }),
      );
    }
  }

  toggleDropDown() {
    const bool = this.dropDownOpen$.getValue();
    this.dropDownOpen$.next(!bool);
  }

  onNextSegment() {
    const allSegments = ['all', ...this.fretsSegments];
    if (this.selectedSegmentIndex >= allSegments.length) {
      return;
    }
    const selectedSeg = allSegments[this.selectedSegmentIndex + 1];
    this.exploreForm.get('segment').patchValue(selectedSeg);
    if (!this.dropDownOpen$.getValue()) {
      this.onSelectedSegment(selectedSeg);
    }
    this.scrollToStartingFret();
  }

  onPrevSegment() {
    const allSegments = ['all', ...this.fretsSegments];
    if (this.selectedSegmentIndex <= 0) {
      return;
    }
    const selectedSeg = allSegments[this.selectedSegmentIndex - 1];
    this.exploreForm.get('segment').patchValue(selectedSeg);
    if (!this.dropDownOpen$.getValue()) {
      this.onSelectedSegment(selectedSeg);
    }
    this.scrollToStartingFret();
  }

  scrollToStartingFret() {
    const segmentA = this.exploreForm.get('segment').value.split(',')[0];
    const segmentB = this.exploreForm.get('segment').value.split(',')[1];
    if (this.preferences?.showOnlySelectedFrets) {
      return;
    }
    setTimeout(() => {
      const el = window['idFretNb' + Math.round((+segmentA + +segmentB) / 2)];
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 10);
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
