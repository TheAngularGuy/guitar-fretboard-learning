import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { popAnimation } from '@animations/pop.animation';
import { slideAnimation } from '@animations/slide.animation';
import { GameMode } from '@classes/game-mode.class';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { SoundService } from '@core/services/sound/sound.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { BadNoteFound, GameComplete, GameStart, GameStop, GoodNoteFound } from '@core/stores/game/game.actions';
import { GameState } from '@core/stores/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { OpenOrderModalAction } from '@core/stores/user/user.actions';
import { UserState } from '@core/stores/user/user.state';
import { AlertController, IonButton, IonContent } from '@ionic/angular';
import { Note } from '@models/note.model';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const HEIGHT_OFFSET = 300;

@Component({
  selector: 'app-identify-sound',
  templateUrl: './identify-sound.page.html',
  styleUrls: ['./identify-sound.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifySoundPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  game: GameMode = new GameMode();
  preferences: PreferencesStateModel;
  lastClickRegistered: number;
  scoreHistoric: { timeTook: number }[];
  soundPlaying$ = new BehaviorSubject(false);

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    public readonly utils: UtilsService,
    private readonly sound: SoundService,
  ) {
  }

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric.reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  get isGameAvailable() {
    const isPro = this.store.selectSnapshot(UserState.getIsProModeUnlocked);
    if (isPro) {
      return true;
    }
    let sum = 0;
    const date = Date.now();
    const diff = date - (24 * 60 * 60 * 1000 * 6);
    const t1 = new Date(diff).getTime();
    const historic = this.store.selectSnapshot(GameState.getState).historic;
    historic.forEach(h => {
      if (h.date >= t1) {
        sum++;
      }
    });
    console.log({ sum });
    return sum < 10;
  }

  ngOnDestroy() {
    this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);

    this.initGameMode(this.preferences);
  }

  ngAfterViewInit() {
    this.listenToPreferences();
  }

  initGameMode(preferences: PreferencesStateModel) {
    const fretboardNotes = FretboardManipulationService.getFretboardNotes(preferences);

    this.game.initGameMode(fretboardNotes, {
      onBeforeStart: () => {
        this.store.dispatch(new GameStart({ tuning: preferences.tuning }));
        this.scoreHistoric = [];
      },
      onEnd: () => {
        this.store.dispatch(new GameStop({ tuning: preferences.tuning }));
        this.content.scrollToTop(250);
      },
      onComplete: () => {
        this.store.dispatch(new GameComplete({
          tuning: preferences.tuning,
          score: {
            score: 100 / this.scoreHistoric.length * this.game.score.good,
            gameMode: 'identify-sound',
            tuning: this.preferences.tuning,
          },
        }));
      },
      onNotePicked: () => {
        this.onNotePicked();
      },
    });
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
        this.initGameMode(this.preferences);
        this.cd.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  start() {
    if (!this.isGameAvailable) {
      this.presentAlert();
      return;
    }
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

    this.game.initRound(notes, frets);
    requestAnimationFrame(() => this.game.togglePlay());
  }

  onNotePicked() {
    // scroll to the note
    console.log('playing', this.game.noteToFind.note);
    this.soundPlaying$.next(true);
    setTimeout(() => this.soundPlaying$.next(false), 825);
    this.sound.playNote(this.game.noteToFind.note.name, 1125);
  }

  onNoteClicked(noteGuessed: string, btn: IonButton | any): boolean {
    if (!this.game.isPlaying || this.isLastClickTooCloseInTime()) {
      return;
    }
    const simpleNote: Note = { name: this.game.noteToFind.note.name, fret: null, string: null };

    if (noteGuessed === this.game.noteToFind.note.name) {
      // good answer
      this.store.dispatch(new GoodNoteFound({ note: simpleNote, tuning: this.preferences.tuning, noPlacement: true }));
      this.sound.playGood();
      this.game.increaseScoreGood();
      btn.el.color = 'success';
      setTimeout(() => btn.el.color = 'light', this.game.config.ANIMATION_DELAY);
    } else {
      // bad answer
      this.store.dispatch(new BadNoteFound({ note: simpleNote, tuning: this.preferences.tuning, noPlacement: true }));
      this.sound.playError();
      this.game.increaseScoreBad();
      btn.el.color = 'danger';
      setTimeout(() => btn.el.color = 'light', this.game.config.ANIMATION_DELAY);
    }

    this.scoreHistoric.push({
      timeTook: Date.now() - this.game.noteToFind.time - this.game.config.ANIMATION_TIME,
    });
    setTimeout(() => this.game.pickRandomNote(), this.game.config.ANIMATION_DELAY);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Uh oh',
      message: `You've reached the maximum number games for this week. You can use the practice game mode or get the pro version.`,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }, {
          text: 'Get Pro',
          handler: () => {
            this.store.dispatch(new OpenOrderModalAction());
          },
        },
      ],
    });

    await alert.present();
  }

  private isLastClickTooCloseInTime() {
    const now = Date.now();
    const bool = now - this.lastClickRegistered <= this.game.gameConfig.CLICK_INTERVAL;
    if (!bool) {
      this.lastClickRegistered = now;
    }
    return bool;
  }

}
