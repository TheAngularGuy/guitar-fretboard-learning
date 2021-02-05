import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {NavController} from '@ionic/angular';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;

  get isLeftHanded() {
    return this.preferences?.invertedStrings || this.preferences?.invertedFrets;
  }

  constructor(private store: Store, private navCtrl: NavController) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.listenToPreferences();
  }

  listenToPreferences() {
    this.preferences = this.store.selectSnapshot(PreferencesState.getState);
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

}
