import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonButton, IonContent, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { Note } from 'src/app/models/note.model';
import {
  FretboardManipulationService,
} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import {
  PreferencesState,
  PreferencesStateModel,
} from 'src/app/shared/store/preferences/preferences.state';

import { CHROMATIC_SCALE } from '../../constants/chromatic-scale.constant';
import { CanDeactivateComponent } from '../../shared/guards/deactivate.guard';
import {
  IdentifySetFretEndAction,
  IdentifySetFretStartAction,
  IdentifySetSelectedNotesAction,
} from './store/identify.actions';
import { IdentifyState, IdentifyStateModel } from './store/identify.state';

const ANIMATION_TIME = 250;
const ANIMATION_DELAY = 1250;
const CLICK_INTERVAL = 500;
const MAX_RANGE = 20;
const HEIGHT_OFFSET = 300; // topbar + footer height -- maybe improve this later with the actual height

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifyPage implements OnInit, OnDestroy, CanDeactivateComponent {
  @ViewChild('content', { static: false }) content: IonContent;
  destroyed$ = new Subject();
  identifyForm: FormGroup;
  maxRange: number;
  fretboardNotes: string[][];
  chromaticScale: string[];
  preferences: PreferencesStateModel;
  identifyState: IdentifyStateModel;

  play: boolean;
  showSettings: boolean;
  showAll: boolean;
  lastClickRegistered: number;

  noteToFind: { note: Note; time: number };
  score: { good: number; bad: number };
  scoreHistoric: { timeTook: number; noteToFind: Note; noteGuessed: Note }[];

  constructor(
    public readonly utils: UtilsService,
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.identifyState = this.store.selectSnapshot<IdentifyStateModel>(
      IdentifyState.getState,
    );
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(
      PreferencesState.getState,
    );
    this.fretboardNotes = this.fretboardManipulationService.getFretboardNotes(
      this.preferences,
    );
    this.maxRange = MAX_RANGE;
    this.chromaticScale = CHROMATIC_SCALE;
    this.setForm();
  }

  setForm() {
    const form = this.fb.group({
      selectedNotes: [
        this.identifyState.selectedNotes,
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
        this.identifyState.fretStart,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
      fretEnd: [
        this.identifyState.fretEnd,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
    });
    this.identifyForm = form;
    this.setFormListener();
  }

  setFormListener() {
    this.identifyForm.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: IdentifyStateModel) => {
        const identifyState = this.store.selectSnapshot<IdentifyStateModel>(
          IdentifyState.getState,
        );

        if (formValue.selectedNotes !== identifyState.selectedNotes) {
          this.store.dispatch(
            new IdentifySetSelectedNotesAction({
              selectedNotes: formValue.selectedNotes,
            }),
          );
        }
        if (formValue.fretStart !== identifyState.fretStart) {
          this.store.dispatch(
            new IdentifySetFretStartAction({
              fretStart: formValue.fretStart,
            }),
          );
        }
        if (formValue.fretEnd !== identifyState.fretEnd) {
          this.store.dispatch(
            new IdentifySetFretEndAction({
              fretEnd: formValue.fretEnd,
            }),
          );
        }
      });
  }

  toggleShowAll(): boolean {
    return (this.showAll = !this.showAll);
  }

  toggleShowSettings() {
    return (this.showSettings = !this.showSettings);
  }

  togglePlay(): boolean {
    if (
      this.identifyForm.invalid ||
      this.identifyForm.value.fretStart >= this.identifyForm.value.fretEnd
    ) {
      this.toastController
        .create({
          message: 'Invalid form, please select at least 2 notes and 2 frets',
          duration: 3000,
          position: 'top',
        })
        .then(toast => {
          toast.present();
        });
      return;
    }
    for (const n of this.identifyForm.value.selectedNotes) {
      if (!this.checkIfNoteIsInTheFretInterval(n)) {
        const message =
          'The notes you selected are not all present in the interval of frets' +
          `For example ${n} is not present. Please change the settings.`;
        this.toastController
          .create({
            message,
            duration: 3000,
            position: 'top',
          })
          .then(toast => {
            toast.present();
          });
        return;
      }
    }
    if (!this.play) {
      this.startRound();
    } else {
      this.endRound();
    }
    return this.play;
  }

  startRound() {
    this.showAll = false;
    this.showSettings = false;
    this.play = true;
    this.score = {
      good: 0,
      bad: 0,
    };
    this.scoreHistoric = [];
    this.pickRandomNote();
  }

  endRound() {
    this.play = false;
    setTimeout(() => {
      // we need a timeout so when the user is wrong on the last guess
      // the note stay in red a little so he knows he was wrong.
      this.showAll = false;
      this.noteToFind = null;
    }, ANIMATION_DELAY);
    setTimeout(() => {
      this.content.scrollToTop(250);
    }, ANIMATION_TIME);
  }

  checkIfNoteIsInTheFretInterval(noteName: string): boolean {
    const allSelectedNotes = [
      ...this.fretboardNotes
        .slice(this.identifyForm.value.fretStart, this.identifyForm.value.fretEnd + 1)
        .join()
        .split(','),
    ];
    return allSelectedNotes.includes(noteName);
  }

  pickRandomNote() {
    const selectedNotes = this.identifyForm.value.selectedNotes;
    const randomString = this.utils.getRandomInt(0, 6);
    const randomFret = this.utils.getRandomInt(
      this.identifyForm.value.fretStart,
      this.identifyForm.value.fretEnd + 1,
    );
    const note = this.fretboardNotes[randomFret][randomString];
    if (
      !note ||
      !selectedNotes.includes(note) ||
      (this.noteToFind && this.noteToFind.note && note === this.noteToFind.note.noteName)
    ) {
      return this.pickRandomNote();
    }
    this.noteToFind = {
      time: Date.now(),
      note: {
        noteName: note,
        fret: randomFret,
        string: randomString,
      },
    };
    this.showAll = false;

    // scroll
    setTimeout(
      () => {
        if (
          (window as any).fretboard &&
          (window as any).fretboard.clientHeight > window.screen.height - HEIGHT_OFFSET
        ) {
          const el = window['idFretNb' + this.noteToFind.note.fret];
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
    if (!this.play || now - this.lastClickRegistered <= CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;
    if (noteGuessed === this.noteToFind.note.noteName) {
      this.score.good += 1;
      btn.el.color = 'success';
      setTimeout(() => {
        btn.el.color = 'light';
      }, ANIMATION_DELAY);
    } else {
      this.score.bad += 1;
      btn.el.color = 'danger';
      setTimeout(() => {
        btn.el.color = 'light';
      }, ANIMATION_DELAY);
    }
    this.scoreHistoric.push({
      noteGuessed: {
        fret: 0,
        string: 0,
        noteName: noteGuessed,
      },
      noteToFind: this.noteToFind.note,
      timeTook: Date.now() - this.noteToFind.time - ANIMATION_TIME,
    });

    if (this.scoreHistoric.length === MAX_RANGE) {
      setTimeout(() => {
        this.togglePlay();
      }, ANIMATION_DELAY);
      return;
    }
    setTimeout(() => this.pickRandomNote(), ANIMATION_DELAY);
    return;
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

  async canDeactivateComp() {
    let ret = true;
    if (this.play) {
      const alert = await this.alertController.create({
        header: 'Do you want to leave?',
        message:
          'It looks like you are in the middle of something, are you sure you want to leave this page ?',
        buttons: [
          {
            text: 'Yes',
            role: 'cancel',
          },
          {
            text: 'No',
            handler: () => {
              ret = false;
            },
          },
        ],
      });
      await alert.present();
      await alert.onWillDismiss();
    }
    return ret;
  }
}
