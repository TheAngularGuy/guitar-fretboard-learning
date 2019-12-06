import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  PreferencesSetLeftyModeAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from 'src/app/shared/store/preferences/preferences.actions';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  settingsForm: FormGroup;
  tunings = [
    'Standard',
    'A-E-A-E-A-C♯',
    'B-F♯-B-F♯-B-D♯',
    'C-C-G-C-E-G',
    'C-E-G-C-E-G',
    'C-F-C-F-A-C',
    'C-G-C-G-C-E',
    'C-G-D-G-B-D',
    'C♯-F♯-C♯-F♯-G#-C♯',
    'C♯-G♯-C♯-F-G♯-C♯',
    'D-A-D-F♯-A-D',
    'D-A-D-G-A-D',
    'D-A-D-G-B-E',
    'D-G-B-D-G-B-D',
    'D-G-D-G-B-D',
    'E-A-C♯-E-A-C♯',
    'E-A-C♯-E-A-E',
    'E-A-E-A-C♯-E',
    'E-B-E-G#-B-E',
    'F-A-C-F-C-F',
    'F-F-C-F-A-C',
    'F♯-A#-C♯-F♯-C♯-F♯',
    'F♯-B-D♯-F♯-B-D♯',
    'G-B-D-G-B-D',
    'G-B-D-G-B-D',
    'G-G-D-G-B-D',
  ];

  constructor(private readonly fb: FormBuilder, private readonly store: Store) {}

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    const preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    const form = this.fb.group({
      leftHandedMode: [preferences.leftHandedMode, [Validators.required]],
      activateSound: [preferences.activateSound, [Validators.required]],
      tuning: [preferences.tuning, [Validators.required]],
    });
    this.settingsForm = form;
    this.setFormListeners();
  }

  setFormListeners() {
    this.settingsForm
      .get('leftHandedMode')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((v: boolean) => {
        this.store.dispatch(new PreferencesSetLeftyModeAction({ leftHandedMode: v }));
      });
    this.settingsForm
      .get('activateSound')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((v: boolean) => {
        this.store.dispatch(new PreferencesSetSoundAction({ activateSound: v }));
      });
    this.settingsForm
      .get('tuning')
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((v: string) => {
        this.store.dispatch(new PreferencesSetTunningAction({ tuning: v }));
      });
  }
}
