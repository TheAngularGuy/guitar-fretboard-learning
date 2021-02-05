import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import {takeUntil, tap} from 'rxjs/operators';

import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { SettingsAddCustomTuningAction } from '../../store/settings.actions';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-custom-tuning',
  templateUrl: './custom-tuning.page.html',
  styleUrls: ['./custom-tuning.page.scss'],
})
export class CustomTuningPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  chromaticScale = CHROMATIC_SCALE;
  customTuning = ['C', 'C', 'C', 'C', 'C', 'C'];

  get isLeftHanded() {
    return this.preferences?.invertedStrings || this.preferences?.invertedFrets;
  }

  constructor(private store: Store, private navCtrl: NavController) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.listenToPreferences();
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  save() {
    let customTuning = this.customTuning.join('-');
    if (this.isLeftHanded) {
      customTuning = customTuning.split('-').reverse().join('-');
    }
    this.store.dispatch(
      new SettingsAddCustomTuningAction({
        customTuning,
      }),
    )
      .pipe(
        tap(() => {
          this.navCtrl.back();
        }),
      )
      .subscribe();
  }
}
