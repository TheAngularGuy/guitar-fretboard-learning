import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {popAnimation} from '../../../animations/pop.animation';
import {slideAnimation} from '../../../animations/slide.animation';
import {AlertController, IonContent} from '@ionic/angular';
import {Subject} from 'rxjs';
import {GameMode} from '@classes/game-mode.class';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {Store} from '@ngxs/store';
import {UtilsService} from '@shared-modules/services/utils/utils.service';
import {SoundService} from '@shared-modules/services/sound/sound.service';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Note} from '@models/note.model';
import {GameState} from '@shared-modules/store/game/game.state';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class PracticePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  game: GameMode = new GameMode();
  preferences: PreferencesStateModel;
  lastClickRegistered: number;
  scoreHistoric: { timeTook: number; }[];

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric.reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    public readonly utils: UtilsService,
    private readonly sound: SoundService,
    private readonly fretboardManipulationService: FretboardManipulationService,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnInit() {
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.initGameMode(this.preferences);
  }

  initGameMode(preferences: PreferencesStateModel) {
    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes(preferences);
    this.game.initGameMode(
      fretboardNotes,
      {
        onBeforeStart: () => {
          this.scoreHistoric = [];
        },
        onEnd: () => {
          this.content.scrollToTop(250);
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

  onNoteClicked(noteGuessed: Note) {
    if (!this.game.isPlaying || this.isLastClickTooCloseInTime()) {
      return;
    }

    if (noteGuessed.name === this.game.noteToFind.note.name) {
      // good answer
      this.game.increaseScoreGood();
      this.sound.playGood();
    } else {
      // bad answer
      this.game.increaseScoreBad();
      this.sound.playError();
    }
    this.scoreHistoric.push({timeTook: Date.now() - this.game.noteToFind.time - this.game.gameConfig.ANIMATION_TIME});
    setTimeout(() => this.game.pickRandomNote(), this.game.gameConfig.ANIMATION_DELAY);
  }

  private isLastClickTooCloseInTime() {
    const now = Date.now();
    const bool = now - this.lastClickRegistered <= this.game.gameConfig.CLICK_INTERVAL;
    if (!bool) {
      this.lastClickRegistered = now;
    }
    return bool;
  }

  start() {
    const notes = this.store.selectSnapshot(GameState.unlockedNotesSegment);
    const frets = this.store.selectSnapshot(GameState.unlockedFretsSegment);

    this.game.initRound(notes, frets);
    this.game.togglePlay();
  }

}
