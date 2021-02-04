import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {
  PreferencesSetFlatsModeAction,
  PreferencesSetInvertedFretsModeAction,
  PreferencesSetInvertedStringsModeAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from 'src/app/shared/store/preferences/preferences.actions';
import {PreferencesState, PreferencesStateModel} from 'src/app/shared/store/preferences/preferences.state';
import {SettingsState} from './store/settings.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  settingsForm: FormGroup;
  @Select(SettingsState.getCustomTunings) customTunnings: Observable<string[]>;
  tunings = [
    'Standard',
    'A-E-A-E-A-C#',
    'B-F#-B-F#-B-D#',
    'C-C-G-C-E-G',
    'C-E-G-C-E-G',
    'C-F-C-F-A-C',
    'C-G-C-G-C-E',
    'C-G-D-G-B-D',
    'C#-F#-C#-F#-G#-C#',
    'C#-G#-C#-F-G#-C#',
    'D-A-D-F#-A-D',
    'D-A-D-G-A-D',
    'D-A-D-G-B-E',
    'D-G-B-D-G-B-D',
    'D-G-D-G-B-D',
    'E-A-C#-E-A-C#',
    'E-A-C#-E-A-E',
    'E-A-E-A-C#-E',
    'E-B-E-G#-B-E',
    'F-A-C-F-C-F',
    'F-F-C-F-A-C',
    'F#-A#-C#-F#-C#-F#',
    'F#-B-D#-F#-B-D#',
    'G-B-D-G-B-D',
    'G-B-D-G-B-D',
    'G-G-D-G-B-D',
  ];

  get isLeftHanded() {
    return this.settingsForm.get('invertedStrings').value;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalController: ModalController,
    private readonly store: Store,
    private readonly router: Router,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    const preferences = this.store.selectSnapshot<PreferencesStateModel>(
      PreferencesState.getState,
    );
    this.settingsForm = this.fb.group({
      invertedStrings: [preferences.invertedStrings, [Validators.required]],
      invertedFrets: [preferences.invertedFrets, [Validators.required]],
      activateSound: [preferences.activateSound, [Validators.required]],
      useFlats: [preferences.useFlats, [Validators.required]],
      tuning: [preferences.tuning, [Validators.required]],
    });
    this.setFormListeners();
  }

  setFormListeners() {
    this.settingsForm.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: PreferencesStateModel) => {
        const preferences = this.store.selectSnapshot<PreferencesStateModel>(
          PreferencesState.getState,
        );

        if (formValue.invertedStrings !== preferences.invertedStrings) {
          this.store.dispatch(
            new PreferencesSetInvertedStringsModeAction({
              invertedStrings: formValue.invertedStrings,
            }),
          );
        }
        if (formValue.invertedFrets !== preferences.invertedFrets) {
          this.store.dispatch(
            new PreferencesSetInvertedFretsModeAction({
              invertedFrets: formValue.invertedFrets,
            }),
          );
        }
        if (formValue.activateSound !== preferences.activateSound) {
          this.store.dispatch(
            new PreferencesSetSoundAction({activateSound: formValue.activateSound}),
          );
        }
        if (formValue.useFlats !== preferences.useFlats) {
          this.store.dispatch(
            new PreferencesSetFlatsModeAction({useFlats: formValue.useFlats}),
          );
        }
        if (formValue.tuning !== preferences.tuning) {
          this.store.dispatch(
            new PreferencesSetTunningAction({tuning: formValue.tuning}),
          );
        }
      });
  }

  goToCustomSettingsPage() {
    this.router.navigate(['settings', 'custom-tuning']);
  }

  goToAboutPage() {
    this.router.navigate(['settings', 'about']);
  }
}
