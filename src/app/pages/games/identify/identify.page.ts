import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { SoundService } from '@shared-modules/services/sound/sound.service';
import {
  BadNoteFound,
  GameComplete,
  GameStart,
  GameStop,
  GoodNoteFound,
} from '@shared-modules/store/game/game.actions';
import { GameState } from '@shared-modules/store/game/game.state';
import { Subject } from 'rxjs';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { Note } from 'src/app/models/note.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

const HEIGHT_OFFSET = 300; // topbar + footer height -- maybe improve this later with the actual height

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifyPage implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  chromaticScale = CHROMATIC_SCALE;
  game: GameMode = new GameMode();
  lastClickRegistered: number;
  scoreHistoric: { timeTook: number; noteToFind: Note; noteGuessed: Note }[];
  lastPointsOnStart: number;

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric
      .reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  constructor(
    private readonly store: Store,
    public readonly utils: UtilsService,
    private readonly sound: SoundService,
    private readonly fretboardManipulationService: FretboardManipulationService,
  ) {
  }

  ngOnDestroy() {
    this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);

    this.game.initGameMode(fretboardNotes, {
      onBeforeStart: () => {
        this.store.dispatch(new GameStart({ tuning: this.preferences.tuning }));
        this.scoreHistoric = [];
        this.lastPointsOnStart = this.store.selectSnapshot(GameState.scoreGlobal);
      },
      onEnd: () => {
        this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
        this.content.scrollToTop(250);
        this.store.dispatch(new GameComplete({ previous: this.lastPointsOnStart }));
      },
      onNotePicked: () => {
        this.onNotePicked();
      },
    });
  }

  onNotePicked() {
    // scroll to the note
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
      // UtilsService.vibrate([100, 30, 100]);
      btn.el.color = 'danger';
      setTimeout(() => {
        btn.el.color = 'light';
      }, this.game.config.ANIMATION_DELAY);
    }
    this.scoreHistoric.push({
      noteGuessed: {
        fret: 0,
        string: 0,
        name: noteGuessed,
      },
      noteToFind: this.game.noteToFind.note,
      timeTook: Date.now() - this.game.noteToFind.time - this.game.config.ANIMATION_TIME,
    });

    setTimeout(() => this.game.pickRandomNote(), this.game.config.ANIMATION_DELAY);
  }

  start() {
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

    this.game.initRound(notes, frets);
    this.game.togglePlay();
  }
}
