import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { noEnterAnimation } from '@animations/no-enter.animation';
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
import { AlertController, IonContent, ToastController } from '@ionic/angular';
import { Note } from '@models/note.model';
import { Store } from '@ngxs/store';
import { FretboardComponent } from '@shared/components/fretboard/fretboard.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';

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
  scoreHistoric: { timeTook: number }[];
  mode$ = new BehaviorSubject<number>(0);
  selectedNotes$ = new BehaviorSubject<Note[]>([]);

  showSelectedNoteNames$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    private readonly utils: UtilsService,
    private readonly toastCtrl: ToastController,
    private readonly sound: SoundService,
  ) {
  }

  get isIOS() {
    return this.utils.isIOS;
  }

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric
      .reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
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
          score: {
            score: 100 / this.scoreHistoric.length * this.game.score.good,
            gameMode: 'locate-all',
            tuning: this.preferences.tuning,
          },
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

  onNoteClicked(noteGuessed: Note, fretboardElement: FretboardComponent) {
    if (!this.game.isPlaying || this.isLastClickTooCloseInTime()) {
      return;
    }

    if (!this.isNotePresentInSeries(noteGuessed)) {

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
        this.showSelectedNoteNames$.next(true);
        fretboardElement.badNoteHidden.pipe(first()).subscribe(() => this.showSelectedNoteNames$.next(false));

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

      if (this.series.length === this.seriesMaxRange) {
        this.nextSeries();
      }
    }
  }

  start() {
    if (!this.isGameAvailable) {
      this.presentAlert();
      this.cd.markForCheck();
      return;
    }
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    let frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);
    if (!!this.mode$.getValue()) {
      frets = [0, this.mode$.getValue()];
    }

    this.game.initRound(notes, frets);
    this.game.togglePlay();
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

  onModeChange(detail) {
    this.mode$.next(+detail.value);
  }

  isOptionAvailable(nb: number) {
    const fretsAvailable = this.store.selectSnapshot(GameState.getState).unlockedFrets;
    return Math.max(...fretsAvailable) >= +nb;
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
}
