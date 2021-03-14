import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { SoundService } from '@shared-modules/services/sound/sound.service';
import { BadNoteFound, GameComplete, GameStart, GameStop, GoodNoteFound } from '@shared-modules/store/game/game.actions';
import { GameState } from '@shared-modules/store/game/game.state';
import { OpenOrderModalAction } from '@shared-modules/store/user/user.actions';
import { UserState } from '@shared-modules/store/user/user.state';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { Note } from 'src/app/models/note.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';
import { noEnterAnimation } from '../../../animations/no-enter.animation';

@Component({
  selector: 'app-locate-all',
  templateUrl: './locate-all.page.html',
  styleUrls: ['./locate-all.page.scss'],
  animations: [popAnimation, slideAnimation, noEnterAnimation],
})
export class LocateAllPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  game: GameMode = new GameMode();
  lastClickRegistered: number;
  series: { good: boolean; noteGuessed: Note }[];
  seriesMaxRange: number;
  seriesDisplay: boolean[];
  scoreHistoric: { timeTook: number; }[];

  selectedNotes$ = new BehaviorSubject<Note[]>([]);

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric
      .reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    public readonly utils: UtilsService,
    public readonly toastCtrl: ToastController,
    private readonly sound: SoundService,
    private readonly analyticsService: AnalyticsService,
  ) {
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

  initGameMode(preferences: PreferencesStateModel) {
    const fretboardNotes = FretboardManipulationService.getFretboardNotes(preferences);
    this.game.config.MAX_RANGE = 5;

    this.game.initGameMode(fretboardNotes, {
      onBeforeStart: () => {
        this.store.dispatch(new GameStart({ tuning: preferences.tuning }));
        this.scoreHistoric = [];
      },
      onNotePicked: () => {
        this.seriesMaxRange = this.numberOfNoteOccurrences(this.game.noteToFind.note.name, this.game.fretboardNotes);
        this.series = [];
        this.selectedNotes$.next([]);
        this.seriesDisplay = new Array(this.seriesMaxRange).fill(undefined);
      },
      onEnd: () => {
        this.store.dispatch(new GameStop({ tuning: preferences.tuning }));
        this.content.scrollToTop(250);
      },
      onComplete: () => {
        this.store.dispatch(new GameComplete({
          tuning: preferences.tuning,
          score: { score: 100 / this.scoreHistoric.length * this.game.score.good, gameMode: 'locate-all', tuning: this.preferences.tuning },
        }));
      },
    });
  }

  ngAfterViewInit() {
    this.listenToPreferences();
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

  private numberOfNoteOccurrences(noteName: string, fretboard: string[][]): number {
    const box = this.game.fretboardNotes
      .slice(this.game.fretsAvailable[0], this.game.fretsAvailable[1] + 1)
      .join(',')
      .split(',');
    let occurrences = 0;
    for (const n of box) {
      if (n.toLowerCase() === noteName.toLowerCase()) {
        occurrences++;
      }
    }
    return occurrences;
  }

  onNoteClicked(noteGuessed: Note) {
    if (!this.game.isPlaying || this.isLastClickTooCloseInTime()) {
      return;
    }

    if (!this.isNotePresentInSeries(noteGuessed)) {
      this.registerSeriesNoteClick(noteGuessed);

      if (this.series.length === this.seriesMaxRange) {
        this.nextSeries();
      }
    }
  }

  private isLastClickTooCloseInTime() {
    const now = Date.now();
    const bool = now - this.lastClickRegistered <= 250;
    if (!bool) {
      this.lastClickRegistered = now;
    }
    return bool;
  }

  private isNotePresentInSeries(note: Note) {
    for (const guess of this.series) {
      if (guess.good === false) {
        continue;
      }
      if (
        guess.noteGuessed.name === note.name &&
        guess.noteGuessed.fret === note.fret &&
        guess.noteGuessed.string === note.string
      ) {
        this.toastCtrl
          .create({
            message: 'You already clicked on this note!',
            duration: 3000,
            buttons: [
              {
                role: 'cancel',
                text: 'Ok',
              },
            ],
          })
          .then(t => {
            t.present();
          });
        return true;
      }
    }
    return false;
  }

  private registerSeriesNoteClick(noteGuessed: Note) {
    if (noteGuessed.name === this.game.noteToFind.note.name) {
      // good answer
      this.series.push({
        good: true,
        noteGuessed,
      });
      this.seriesDisplay[this.series.length - 1] = true;
      this.sound.playGood();
      this.store.dispatch(
        new GoodNoteFound({ note: noteGuessed, tuning: this.preferences.tuning }),
      );
      this.selectedNotes$.next([...this.selectedNotes$.getValue(), noteGuessed]);
    } else {
      // bad answer
      this.series.push({
        good: false,
        noteGuessed,
      });
      this.seriesDisplay[this.series.length - 1] = false;
      this.sound.playError();
      this.store.dispatch(
        new BadNoteFound({ note: noteGuessed, tuning: this.preferences.tuning }),
      );

      this.nextSeries();
    }
  }

  private nextSeries() {
    const good = this.series.reduce((accu: boolean, current) => {
      return current.good && accu;
    }, true);
    if (good) {
      this.game.increaseScoreGood();
    } else {
      this.game.increaseScoreBad();
    }
    this.scoreHistoric.push({
      timeTook: Date.now() - this.game.noteToFind.time - this.game.config.ANIMATION_TIME,
    });

    setTimeout(() => this.game.pickRandomNote(), this.game.config.ANIMATION_DELAY);
  }

  start() {
    if (!this.isGameAvailable) {
      this.presentAlert();
      this.analyticsService.logEvent('game', 'blocked_locateAll');
      return;
    }
    this.analyticsService.logEvent('game', 'start_locateAll');
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

    this.game.initRound(notes, frets);
    this.game.togglePlay();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Uh oh',
      message: `You've reached the maximum number games for this week.`,
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

  get isGameAvailable() {
    const isPro = this.store.selectSnapshot(UserState.getIsProModeUnlocked);
    if (isPro) {
      return true;
    }
    let sum = 0;
    const date = new Date();
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const t1 = new Date(date.setDate(diff)).getTime();
    const historic = this.store.selectSnapshot(GameState.getState).historic;
    historic.forEach(h => {
      if (h.date >= t1) {
        sum++;
      }
    });
    console.log({ sum });
    return sum < 10;
  }
}
