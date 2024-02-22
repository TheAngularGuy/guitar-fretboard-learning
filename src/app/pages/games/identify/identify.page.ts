import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const HEIGHT_OFFSET = 300; // topbar + footer height -- maybe improve this later with the actual height

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifyPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  @ViewChildren('btn') btns: QueryList<IonButton>;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  game: GameMode = new GameMode();
  lastClickRegistered: number;
  scoreHistoric: { timeTook: number; }[];

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    private readonly sound: SoundService,
    public readonly utils: UtilsService,
  ) {
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
            gameMode: 'identify',
            tuning: this.preferences.tuning,
          },
        }));
      },
      onNotePicked: () => {
        this.onNotePicked();
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

  onNotePicked() {
    this.scrollToNote();
  }

  scrollToNote() {
    setTimeout(
      () => {
        if (
          (window as any).fretboard &&
          (window as any).fretboard.clientHeight > window.screen.height - HEIGHT_OFFSET
        ) {
          const el = window['idFretNb' + this.game.noteToFind.note.fret];
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      },
      this.scoreHistoric.length === 0 ? 100 : 10,
    );
  }

  onNoteClicked(noteGuessed: string, btn: IonButton | any): boolean {
    const now = Date.now();
    if (!this.game.isPlaying ||
      now - this.lastClickRegistered <= this.game.config.CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;
    if (noteGuessed === this.game.noteToFind.note.name) {
      // good answer
      this.store.dispatch(new GoodNoteFound({
        note: this.game.noteToFind.note,
        tuning: this.preferences.tuning,
      }));
      this.sound.playGood();
      this.game.increaseScoreGood();
      btn.el.color = 'success';
      setTimeout(() => {
        btn.el.color = 'light';
      }, this.game.config.ANIMATION_DELAY);
    } else {
      // bad answer
      this.store.dispatch(new BadNoteFound({
        note: this.game.noteToFind.note,
        tuning: this.preferences.tuning,
      }));
      this.sound.playError();
      this.game.increaseScoreBad();

      const correctBtn: IonButton | any = this.btns.find((el: IonButton | any) => {
        return el.el.innerText === this.game.noteToFind.note.name;
      });
      correctBtn.el.color = 'success';
      btn.el.color = 'danger';

      setTimeout(() => {
        btn.el.color = 'light';
        correctBtn.el.color = 'light';
      }, this.game.config.ANIMATION_DELAY);
    }
    this.scoreHistoric.push({
      timeTook: Date.now() - this.game.noteToFind.time - this.game.config.ANIMATION_TIME,
    });

    setTimeout(() => this.game.pickRandomNote(), this.game.config.ANIMATION_DELAY);
  }

  start() {
    if (!this.isGameAvailable) {
      this.presentAlert();
      return;
    }
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

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
}
