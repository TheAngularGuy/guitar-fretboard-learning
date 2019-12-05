import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { CAGED_SCALE } from 'src/app/constants/caged-scale.constant';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

import { CHROMATIC_SCALE } from '../../constants/chromatic-scale.constant';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  exploreForm: FormGroup;
  fretboardNotes: string[][];
  chromaticScale: string[];
  cagedScale: string[];

  preferences: PreferencesStateModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly utils: UtilsService,
    private readonly store: Store,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    const fretboard = this.store.selectSnapshot<string[][]>(PreferencesState.getFretboardNotes);

    this.fretboardNotes = fretboard;
    this.chromaticScale = CHROMATIC_SCALE;
    this.cagedScale = CAGED_SCALE;
    this.setForm();
  }

  setForm(): FormGroup {
    const form = this.fb.group({
      selectedNotes: [this.cagedScale, [Validators.required]],
      fretStart: [0, [Validators.required, Validators.min(0), Validators.max(12)]],
      fretEnd: [12, [Validators.required, Validators.min(0), Validators.max(12)]],
    });

    return (this.exploreForm = form);
  }
}
