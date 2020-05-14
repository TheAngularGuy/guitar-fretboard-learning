import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GameMode } from '@classes/game-mode.class';
import { IonButton, IonContent } from '@ionic/angular';
import { Note } from '@models/note.model';
import { Store } from '@ngxs/store';
import { FretboardManipulationService } from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import { SoundService } from '@shared-modules/services/sound/sound.service';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import {
  BadNoteFound,
  GameComplete,
  GameStart,
  GameStop,
  GoodNoteFound,
} from '@shared-modules/store/game/game.actions';
import { GameState } from '@shared-modules/store/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@shared-modules/store/preferences/preferences.state';
import { Subject } from 'rxjs';
import { popAnimation } from '../../../animations/pop.animation';
import { slideAnimation } from '../../../animations/slide.animation';

const HEIGHT_OFFSET = 300;

@Component({
  selector: 'app-identify-sound',
  templateUrl: './identify-sound.page.html',
  styleUrls: ['./identify-sound.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifySoundPage implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  game: GameMode = new GameMode();
  preferences: PreferencesStateModel;
  lastClickRegistered: number;
  lastPointsOnStart: number;
  scoreHistoric: { timeTook: number; noteToFind: Note; noteGuessed: Note }[];

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
  ) {}

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

  start() {
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

    this.game.initRound(notes, frets);
    this.game.togglePlay();
  }

  onNotePicked() {
    // scroll to the note

    console.log('playing', this.game.noteToFind.note);
    this.sound.playNote(this.game.noteToFind.note.name);
  }

  onNoteClicked(noteGuessed: string, btn: IonButton | any): boolean {
    const now = Date.now();
    if (!this.game.isPlaying ||
      now - this.lastClickRegistered <= this.game.config.CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;
    const simpleNote: Note = {
      name: this.game.noteToFind.note.name,
      fret: null,
      string: null,
    }
    if (noteGuessed === this.game.noteToFind.note.name) {
      // good answer
      this.store.dispatch(new GoodNoteFound({
        note: simpleNote,
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
        note: simpleNote,
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

}
