import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { popAnimation } from 'src/app/animations/pop.animation';
import { slideAnimation } from 'src/app/animations/slide.animation';
import { GameMode } from 'src/app/classes/game-mode.class';
import { Note } from 'src/app/models/note.model';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PreferencesState, PreferencesStateModel } from 'src/app/shared/store/preferences/preferences.state';

import { LocateSetFretEndAction, LocateSetFretStartAction, LocateSetSelectedNotesAction } from '../../store/locate.actions';
import { LocateState, LocateStateModel } from '../../store/locate.state';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class LocatePage extends GameMode implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  locateState: LocateStateModel;
  scoreHistoric: { timeTook: number; noteToFind: Note; noteGuessed: Note }[];

  constructor(
    public readonly utils: UtilsService,
    public readonly toastCtrl: ToastController,
    private readonly fb: FormBuilder,
    private readonly fretboardManipulationService: FretboardManipulationService,
    private readonly store: Store,
  ) {
    super(toastCtrl);
  }

  ngOnDestroy() {
    this.destroyed$.next(), this.destroyed$.complete();
  }

  ngOnInit() {
    this.locateState = this.store.selectSnapshot<LocateStateModel>(LocateState.getState);
    this.preferences = this.store.selectSnapshot<PreferencesStateModel>(PreferencesState.getState);

    const fretboardNotes = this.fretboardManipulationService.getFretboardNotes(this.preferences);
    const form = this.setForm();
    this.initGameMode(fretboardNotes, form, {
      onBeforeStart: () => {
        this.scoreHistoric = [];
      },
      onEnd: () => {
        this.content.scrollToTop(250);
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
      fretEnd: [this.locateState.fretEnd, [Validators.required, Validators.min(0), Validators.max(12)]],
    });
    this.setFormListener(form);
    return form;
  }

  setFormListener(form: FormGroup) {
    form.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: LocateStateModel) => {
        const locateState = this.store.selectSnapshot<LocateStateModel>(LocateState.getState);

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

  onNoteClicked(noteGuessed: Note) {
    const now = Date.now();
    if (!this.play || now - this.lastClickRegistered <= this.config.CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;
    if (noteGuessed.noteName === this.noteToFind.note.noteName) {
      this.score.good += 1;
    } else {
      // bad answer
      this.score.bad += 1;
      UtilsService.vibrate([100, 30, 100]);
    }
    this.scoreHistoric.push({
      noteGuessed,
      noteToFind: this.noteToFind.note,
      timeTook: Date.now() - this.noteToFind.time - this.config.ANIMATION_TIME,
    });

    if (this.scoreHistoric.length === this.config.MAX_RANGE) {
      setTimeout(() => {
        this.togglePlay();
      }, this.config.ANIMATION_DELAY);
      return;
    }
    setTimeout(() => this.pickRandomNote(), this.config.ANIMATION_DELAY);
    return;
  }

  getAverageTime() {
    if (!this.scoreHistoric || !this.scoreHistoric.length) {
      return;
    }
    return this.scoreHistoric.reduce((acc, n) => acc + n.timeTook, 0) / this.scoreHistoric.length / 1000;
  }
}