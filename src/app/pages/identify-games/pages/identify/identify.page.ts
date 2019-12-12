import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonButton, IonContent, ToastController } from '@ionic/angular';
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

import {
  IdentifySetFretEndAction,
  IdentifySetFretStartAction,
  IdentifySetSelectedNotesAction,
} from '../../store/identify.actions';
import { IdentifyState, IdentifyStateModel } from '../../store/identify.state';

const HEIGHT_OFFSET = 300; // topbar + footer height -- maybe improve this later with the actual height

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
  animations: [popAnimation, slideAnimation],
})
export class IdentifyPage extends GameMode implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: IonContent;
  destroyed$ = new Subject();
  preferences: PreferencesStateModel;
  identifyState: IdentifyStateModel;
  scoreHistoric: { timeTook: number; noteToFind: Note; noteGuessed: Note }[];

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
    this.identifyState = this.store.selectSnapshot<IdentifyStateModel>(IdentifyState.getState);
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
      onNotePicked: () => {
        this.onNotePicked();
      },
      onError: msg => {
        this.handleError(msg);
      },
    });
  }

  setForm(): FormGroup {
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
    this.setFormListener(form);
    return form;
  }

  setFormListener(form: FormGroup) {
    form.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(500))
      .subscribe((formValue: IdentifyStateModel) => {
        const identifyState = this.store.selectSnapshot<IdentifyStateModel>(IdentifyState.getState);

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

  onNotePicked() {
    // scroll to the note
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
    if (!this.play || now - this.lastClickRegistered <= this.config.CLICK_INTERVAL) {
      return;
    }
    this.lastClickRegistered = now;
    if (noteGuessed === this.noteToFind.note.noteName) {
      this.score.good += 1;
      btn.el.color = 'success';
      setTimeout(() => {
        btn.el.color = 'light';
      }, this.config.ANIMATION_DELAY);
    } else {
      // bad answer
      this.score.bad += 1;
      UtilsService.vibrate([100, 30, 100]);
      this.showAll = true;
      btn.el.color = 'danger';
      setTimeout(() => {
        btn.el.color = 'light';
      }, this.config.ANIMATION_DELAY);
    }
    this.scoreHistoric.push({
      noteGuessed: {
        fret: 0,
        string: 0,
        noteName: noteGuessed,
      },
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
