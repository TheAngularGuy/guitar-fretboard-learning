import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { BadNoteFound, GameStart, GameStop, GoodNoteFound } from '@shared-modules/store/game/game.actions';
import { Subject } from 'rxjs';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { Note } from 'src/app/models/note.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

@Component({
  selector: 'app-locate-all',
  templateUrl: './locate-all.page.html',
  styleUrls: ['./locate-all.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class LocateAllPage implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  game: GameMode = new GameMode();
  chromaticScale = CHROMATIC_SCALE;
  lastClickRegistered: number;
  series: { good: boolean; noteGuessed: Note }[];
  seriesMaxRange: number;
  seriesDisplay: any[];
  scoreHistoric: { timeTook: number; good: boolean; result: any }[];

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric
      .reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  constructor(
    public readonly utils: UtilsService,
    public readonly toastCtrl: ToastController,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {}

  ngOnDestroy() {
    this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
    this.game.config.MAX_RANGE = 3;

    this.game.initGameMode(fretboardNotes, {
      onBeforeStart: () => {
        this.scoreHistoric = [];
        this.store.dispatch(new GameStart({ tuning: this.preferences.tuning }));
      },
      onNotePicked: () => {
        this.seriesMaxRange = this.numberOfNoteOccurrences(
          this.game.noteToFind.note.name,
          this.game.fretboardNotes,
        );
        this.series = [];
        this.seriesDisplay = new Array(this.seriesMaxRange).fill(undefined);
      },
      onEnd: () => {
        this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
        this.content.scrollToTop(250);
      },
      onError: msg => {},
    });
  }

  numberOfNoteOccurrences(noteName: string, fretboard: string[][]): number {
    const box = this.game.fretboardNotes
      .slice(0, 17 + 1)
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
    const now = Date.now();
    if (!this.game.isPlaying || now - this.lastClickRegistered <= this.game.config.CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;

    if (!this.isNotePresentInSeries(noteGuessed)) {
      this.registerSeriesNoteClick(noteGuessed);
    }

    if (this.series.length === this.seriesMaxRange) {
      this.nextSeries();
    }
  }

  isNotePresentInSeries(note: Note) {
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
            message: 'You already clicked on this note 🤭',
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

  registerSeriesNoteClick(noteGuessed: Note) {
    if (noteGuessed.name === this.game.noteToFind.note.name) {
      // good answer
      this.series.push({
        good: true,
        noteGuessed,
      });
      this.seriesDisplay[this.series.length - 1] = true;

      this.store.dispatch(
        new GoodNoteFound({ note: noteGuessed, tuning: this.preferences.tuning }),
      );
    } else {
      // bad answer
      this.series.push({
        good: false,
        noteGuessed,
      });
      UtilsService.vibrate([100, 30, 100]);
      this.seriesDisplay[this.series.length - 1] = false;

      this.store.dispatch(
        new BadNoteFound({ note: noteGuessed, tuning: this.preferences.tuning }),
      );
    }
  }

  nextSeries() {
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
      good,
      result: JSON.parse(JSON.stringify(this.series)),
    });

    setTimeout(() => this.game.pickRandomNote(), this.game.config.ANIMATION_DELAY);
  }
}
