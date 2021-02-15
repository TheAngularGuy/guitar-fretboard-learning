import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState, UserStateModel} from '@shared-modules/store/user/user.state';
import {Observable, Subject} from 'rxjs';
import {GameState, GameStateModel, NoteScoreByTuning} from '@shared-modules/store/game/game.state';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {Router} from '@angular/router';
import {LEVELS} from '@constants/levels';
import {takeUntil, tap} from 'rxjs/operators';
import {UtilsService} from '@shared-modules/services/utils/utils.service';
import {UserLogOutAction} from '@shared-modules/store/user/user.actions';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDataPage implements OnInit, OnDestroy {
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

  sortByBestNote(notes: NoteScoreByTuning[], unlockedNotes: string[]) {
    return UtilsService.clone(notes).sort((a, b) => {
      if (a.value === b.value) {
        if (a.good === b.good) {
          return a.bad - b.bad;
        }
        return b.good - a.good;
      }
      return b.value - a.value;
    }).filter(n => {
      return unlockedNotes.includes(n.name);
    });
  }

  getLockedNotes(unlockedNotes: string[]): { note: string, level: string }[] {
    const output: { note: string, level: string }[] = [];
    LEVELS.forEach(level => {
      level.unlockedNotes.forEach(n => {
        if (!unlockedNotes.includes(n)) {
          output.push({
            note: n,
            level: level.name
          });
        }
      });
    });
    return output;
  }

  getLockedFrets(unlockedFrets: number[]): { fret: number, level: string }[] {
    const output: { fret: number, level: string }[] = [];
    LEVELS.forEach(level => {
      level.unlockedFrets.forEach(f => {
        if (!unlockedFrets.includes(f)) {
          output.push({
            fret: f,
            level: level.name
          });
        }
      });
    });
    return output;
  }

  goToNoteDetail(note: NoteScoreByTuning) {
    this.navCtrl.navigateForward(['profile', 'note-detail', note.name]);
  }

  onLogOut() {
    if (confirm('Do you want to log out?')) {
      this.store.dispatch(new UserLogOutAction());
    }
  }
}
