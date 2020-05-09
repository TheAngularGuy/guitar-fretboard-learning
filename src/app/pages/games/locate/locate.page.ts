import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { BadNoteFound, GameStart, GameStop, GoodNoteFound } from '@shared-modules/store/game/game.actions';
import { Subject } from 'rxjs';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { Note } from 'src/app/models/note.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class LocatePage implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  game: GameMode = new GameMode();
  preferences: PreferencesStateModel;
  lastClickRegistered: number;
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
    private readonly fretboardManipulationService: FretboardManipulationService,
  ) {}

  ngOnDestroy() {
    this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes();

    this.game.initGameMode(fretboardNotes, {
      onBeforeStart: () => {
        this.store.dispatch(new GameStart({ tuning: this.preferences.tuning }));
        this.scoreHistoric = [];
      },
      onEnd: () => {
        this.store.dispatch(new GameStop({ tuning: this.preferences.tuning }));
        this.content.scrollToTop(250);
      },
    });
  }

  onNoteClicked(noteGuessed: Note) {
    const now = Date.now();
    if (!this.game.isPlaying ||
      now - this.lastClickRegistered <= this.game.gameConfig.CLICK_INTERVAL) {
      return;
    }

    this.lastClickRegistered = now;
    if (noteGuessed.name === this.game.noteToFind.note.name) {
      // good answer
      this.game.increaseScoreGood();

      this.store.dispatch(
        new GoodNoteFound({ note: noteGuessed, tuning: this.preferences.tuning })
      );
    } else {
      // bad answer
      this.game.increaseScoreBad();

      this.store.dispatch(
        new BadNoteFound({ note: noteGuessed, tuning: this.preferences.tuning })
      );
    }
    this.scoreHistoric.push({
      noteGuessed,
      noteToFind: this.game.noteToFind.note,
      timeTook: Date.now() - this.game.noteToFind.time - this.game.gameConfig.ANIMATION_TIME,
    });

    setTimeout(() => this.game.pickRandomNote(), this.game.gameConfig.ANIMATION_DELAY);
  }
}
