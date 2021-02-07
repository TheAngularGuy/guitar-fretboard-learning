import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {NavController} from '@ionic/angular';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {UserState, UserStateModel} from '@shared-modules/store/user/user.state';
import {GameState, GameStateModel, NoteScoreByTuning} from '@shared-modules/store/game/game.state';
import {LEVELS} from '@constants/levels';
import {UtilsService} from '@shared-modules/services/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  @Select(UserState.getState) userState$: Observable<UserStateModel>;
  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  @Select(PreferencesState.getState) preferencesState$: Observable<PreferencesStateModel>;
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

  getScoreByCurrentTuning(preferences: PreferencesStateModel, gameState: GameStateModel) {
    return gameState.scoreByTunings.find(st => st.tuning === preferences.tuning);
  }

  getLevel(gameState: GameStateModel) {
    return LEVELS.find(level => {
      return level.min <= gameState.globalPoints && gameState.globalPoints < level.max;
    });
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

  sortByBestNote(notes: NoteScoreByTuning[]) {
    return UtilsService.clone(notes).sort((a, b) => {
      if (a.value === b.value) {
        if (a.good === b.good) {
          return a.bad - b.bad;
        }
        return b.good - a.good;
      }
      return b.value - a.value;
    });
  }

  sortByWorstNote(notes: NoteScoreByTuning[]) {
    return this.sortByBestNote(notes).reverse();
  }

}
