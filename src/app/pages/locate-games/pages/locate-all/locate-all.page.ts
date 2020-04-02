import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { Note } from 'src/app/models/note.model';
import {
  FretboardManipulationService,
} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import {
  PreferencesState,
  PreferencesStateModel,
} from 'src/app/shared/store/preferences/preferences.state';

import {
  LocateSetFretEndAction,
  LocateSetFretStartAction,
  LocateSetSelectedNotesAction,
} from '../../store/locate.actions';
import { LocateState, LocateStateModel } from '../../store/locate.state';

@Component({
  selector: 'app-locate-all',
  templateUrl: './locate-all.page.html',
  styleUrls: ['./locate-all.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class LocateAllPage extends GameMode implements OnInit, OnDestroy {
  @ViewChild('content') content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  locateState: LocateStateModel;
  chromaticScale = CHROMATIC_SCALE;
  lastClickRegistered: number;
  series: { good: boolean; noteGuessed: Note }[];
  seriesMaxRange: number;
  seriesDisplay: any[];
  scoreHistoric: { timeTook: number; good: boolean; result: any }[];

  constructor(
    public readonly utils: UtilsService,
    public readonly toastCtrl: ToastController,
    private readonly fb: FormBuilder,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {
    super();
  }

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.locateState = this.store.selectSnapshot<LocateStateModel>(LocateState.getState);
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(
      PreferencesState.getState,
    );

    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes(
      this.preferences,
    );
    const form = this.setForm();
    this.initGameMode(fretboardNotes, form, {
      onBeforeStart: () => {
        this.scoreHistoric = [];
      },
      onNotePicked: () => {
        this.seriesMaxRange = this.numberOfNoteOccurrences(
          this.getNoteToFind().note.noteName,
          this.getFretboardNotes(),
        );
        this.series = [];
        this.seriesDisplay = new Array(this.seriesMaxRange).fill(undefined);
      },
      onEnd: () => {
        this.content.scrollToTop(250);
      },
      onError: msg => {
        this.handleError(msg);
      },
    });
  }

  setForm(): FormGroup {
    const form = this.fb.group({
      selectedNotes: [
        this.locateState.selectedNotes,
        [
          Validators.required,
          (c: FormControl) => {
            if (!c || !c.value) {
              return;
            }
            if (c.value.length < 2) {
              return { notes: true };
            }
          },
        ],
      ],
      fretStart: [
        this.locateState.fretStart,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
      fretEnd: [
        this.locateState.fretEnd,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
    });
    this.setFormListener(form);
    return form;
  }

  setFormListener(form: FormGroup) {
    form.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: LocateStateModel) => {
        const locateState = this.store.selectSnapshot<LocateStateModel>(
          LocateState.getState,
        );

        if (formValue.selectedNotes !== locateState.selectedNotes) {
          this.store.dispatch(
            new LocateSetSelectedNotesAction({
              selectedNotes: formValue.selectedNotes,
            }),
          );
        }
        if (formValue.fretStart !== locateState.fretStart) {
          this.store.dispatch(
            new LocateSetFretStartAction({
              fretStart: formValue.fretStart,
            }),
          );
        }
        if (formValue.fretEnd !== locateState.fretEnd) {
          this.store.dispatch(
            new LocateSetFretEndAction({
              fretEnd: formValue.fretEnd,
            }),
          );
        }
      });
  }

  numberOfNoteOccurrences(noteName: string, fretboard: string[][]): number {
    const box = this.getFretboardNotes()
      .slice(this.getForm().value.fretStart, this.getForm().value.fretEnd + 1)
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
    if (
      !this.isGamePlaying() ||
      now - this.lastClickRegistered <= this.getGameConfig().CLICK_INTERVAL
    ) {
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
        guess.noteGuessed.noteName === note.noteName &&
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
    if (noteGuessed.noteName === this.getNoteToFind().note.noteName) {
      this.series.push({
        good: true,
        noteGuessed,
      });
      this.seriesDisplay[this.series.length - 1] = true;
    } else {
      // bad answer
      this.series.push({
        good: false,
        noteGuessed,
      });
      UtilsService.vibrate([100, 30, 100]);
      this.seriesDisplay[this.series.length - 1] = false;
    }
    this.setShowAllNotes(false);
  }

  nextSeries() {
    const good = this.series.reduce((accu: boolean, current) => {
      return current.good && accu;
    }, true);
    if (good) {
      this.increaseScoreGood();
    } else {
      this.increaseScoreBad();
    }
    this.scoreHistoric.push({
      timeTook:
        Date.now() - this.getNoteToFind().time - this.getGameConfig().ANIMATION_TIME,
      good,
      result: JSON.parse(JSON.stringify(this.series)),
    });

    if (this.scoreHistoric.length === this.getGameConfig().MAX_RANGE) {
      setTimeout(() => {
        this.togglePlay();
      }, this.getGameConfig().ANIMATION_DELAY);
      return;
    } else {
      setTimeout(() => this.pickRandomNote(), this.getGameConfig().ANIMATION_DELAY);
    }
  }

  getAverageTime() {
    if (!this.scoreHistoric || !this.scoreHistoric.length) {
      return;
    }
    return (
      this.scoreHistoric.reduce((acc, n) => acc + n.timeTook, 0) /
      this.scoreHistoric.length /
      1000
    );
  }

  handleError(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
      })
      .then(toast => {
        toast.present();
      });
  }
}
