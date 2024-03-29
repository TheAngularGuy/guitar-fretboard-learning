import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noEnterAnimation } from '@animations/no-enter.animation';
import { popAnimation } from '@animations/pop.animation';
import { slideAnimation } from '@animations/slide.animation';
import { GameMode } from '@classes/game-mode.class';
import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { MAX_FRETS } from '@constants/max-frets';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { SoundService } from '@core/services/sound/sound.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { GameStart, GameStop } from '@core/stores/game/game.actions';
import { GameState } from '@core/stores/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { AlertController, IonContent } from '@ionic/angular';
import { Note } from '@models/note.model';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const ALL_FRETS = new Array(MAX_FRETS + 1).fill(null).map((item, i) => i);

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  animations: [popAnimation, slideAnimation, noEnterAnimation],
})
export class PracticePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  game: GameMode = new GameMode();
  preferences: PreferencesStateModel;
  lastClickRegistered: number;
  scoreHistoric: { timeTook: number }[];

  notes = CHROMATIC_SCALE;
  frets = ALL_FRETS;
  exploreForm: FormGroup;

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    public readonly utils: UtilsService,
    private readonly sound: SoundService,
    private readonly fb: FormBuilder,
  ) {
  }

  get averageTime(): string | number {
    if (!this.scoreHistoric?.length) {
      return '';
    }
    return this.scoreHistoric.reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnInit() {
    this.exploreForm = this.fb.group({
      selectedNotes: [UtilsService.getParsedItemFromLS('practice_selectedNotes')
      || this.store.selectSnapshot(GameState.getState).unlockedNotes, [Validators.required]],
      fretStart: [UtilsService.getParsedItemFromLS('practice_fretStart')
      || 0, [Validators.required, Validators.min(0), Validators.max(MAX_FRETS)]],
      fretEnd: [UtilsService.getParsedItemFromLS('practice_fretEnd')
      || 3, [Validators.required, Validators.min(0), Validators.max(MAX_FRETS)]],
    });
    this.store.select(GameState.getState).pipe(
      tap(state => {
        const maxFret = Math.max(...state.unlockedFrets);
        this.frets = new Array(maxFret + 1).fill(null).map((item, i) => i);
        this.notes = [...CHROMATIC_SCALE].filter(n => state.unlockedNotes.includes(n));
      }),
    ).subscribe();

    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);
    this.initGameMode(this.preferences);
  }

  initGameMode(preferences: PreferencesStateModel) {
    const fretboardNotes = FretboardManipulationService.getFretboardNotes(preferences);
    this.game.initGameMode(
      fretboardNotes,
      {
        onBeforeStart: () => {
          this.store.dispatch(new GameStart({ tuning: preferences.tuning }));
          this.scoreHistoric = [];
        },
        onEnd: () => {
          this.store.dispatch(new GameStop({ tuning: preferences.tuning }));
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
    this.scoreHistoric.push({ timeTook: Date.now() - this.game.noteToFind.time - this.game.gameConfig.ANIMATION_TIME });
    setTimeout(() => this.game.pickRandomNote(), this.game.gameConfig.ANIMATION_DELAY);
  }

  start() {
    const notes = this.exploreForm.get('selectedNotes').value;
    const frets: [number, number] = [this.exploreForm.get('fretStart').value, this.exploreForm.get('fretEnd').value];

    if (notes.length < 3 || frets[0] >= frets[1] - 1) {
      this.presentAlert();
      return;
    }
    this.game.initRound(notes, frets);
    this.game.togglePlay();
    this.scrollToStartingFret();
  }

  scrollToStartingFret() {
    if (this.preferences?.showOnlySelectedFrets) {
      return;
    }
    setTimeout(() => {
      const el = window['idFretNb' + (+this.game.fretsAvailable[0] + 1)];
      if (el) {
        console.log(el);
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 10);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Incorrect form',
      message: `Please select at least 3 different notes and 3 frets (ex: 0, 1, 2).`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  onSelectedFretEnd(fretEnd: number) {
    this.exploreForm.get('fretEnd').patchValue(fretEnd);
    UtilsService.setParsedItemToLS('practice_fretEnd', fretEnd);
  }

  onSelectedFretStart(fretStart: number) {
    this.exploreForm.get('fretStart').patchValue(fretStart);
    UtilsService.setParsedItemToLS('practice_fretStart', fretStart);
  }

  onSelectedNotes(selectedNotes: string[]) {
    this.exploreForm.get('selectedNotes').patchValue(selectedNotes);
    UtilsService.setParsedItemToLS('practice_selectedNotes', selectedNotes);
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
