import { FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { CHROMATIC_SCALE } from '../constants/chromatic-scale.constant';
import { GAMES_CONFIG } from '../constants/games-config.constant';
import { Note } from '../models/note.model';
import { UtilsService } from '../shared/services/utils/utils.service';

export interface GameModeEvents {
  onBeforeStart?: () => void;
  onStart?: () => void;
  onBeforeEnd?: () => void;
  onEnd?: () => void;
  onNotePicked?: () => void;
}

export class GameMode {
  protected config = GAMES_CONFIG;
  protected chromaticScale = CHROMATIC_SCALE;
  protected play: boolean;
  protected showSettings: boolean;
  protected showAll: boolean;
  protected lastClickRegistered: number;
  protected noteToFind: { note: Note; time: number };
  protected score: { good: number; bad: number };
  protected fretboardNotes: string[][];
  protected form: FormGroup; // must contain [selectedNotes, fretStart, fretEnd] properties
  private initialized: boolean;
  private callbacks: GameModeEvents;

  constructor(protected readonly toastController: ToastController) {}

  initGameMode(fretboardNotes: string[][], form: FormGroup, callbacks: GameModeEvents) {
    if (!!fretboardNotes && !!form) {
      if (
        !form.value ||
        !form.value.selectedNotes ||
        form.value.fretStart == null ||
        form.value.fretEnd == null
      ) {
        throw 'form must contain [selectedNotes, fretStart, fretEnd] properties.';
      }
      this.fretboardNotes = fretboardNotes;
      this.form = form;
      this.callbacks = callbacks;
      this.initialized = true;
    }
  }

  toggleShowAll(): boolean {
    return (this.showAll = !this.showAll);
  }

  toggleShowSettings() {
    return (this.showSettings = !this.showSettings);
  }

  togglePlay(): boolean {
    if (!this.initialized || !this.fretboardNotes || !this.form) {
      throw 'fretboardNotes && form must be set from children';
    }
    if (this.form.invalid || this.form.value.fretStart >= this.form.value.fretEnd) {
      const message =
        this.form.value.fretStart >= this.form.value.fretEnd
          ? 'Please set the ending fret to be greater than the starting fret.'
          : 'Invalid form, please select at least two notes and two frets (between 0 and 12).';
      this.toastController
        .create({
          message,
          duration: 3000,
        })
        .then(toast => {
          toast.present();
        });
      return;
    }
    for (const n of this.form.value.selectedNotes) {
      if (!this.checkIfNoteIsInTheFretInterval(n, this.form)) {
        const message =
          'The notes you selected are not all present in the interval of frets. ' +
          `For example ${n} is not present. Please change the settings.`;
        this.toastController
          .create({
            message,
            duration: 3000,
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

    if (this.callbacks && this.callbacks.onBeforeStart) {
      this.callbacks.onBeforeStart();
    }
    this.pickRandomNote();
    if (this.callbacks && this.callbacks.onStart) {
      this.callbacks.onStart();
    }
  }

  endRound() {
    if (this.callbacks && this.callbacks.onBeforeEnd) {
      this.callbacks.onBeforeEnd();
    }
    this.play = false;
    setTimeout(() => {
      // we need a timeout so if the user is wrong on the last guess
      // the note stay in red a little so he knows he was wrong.
      this.showAll = false;
      this.noteToFind = null;
    }, this.config.ANIMATION_DELAY);
    if (this.callbacks && this.callbacks.onEnd) {
      setTimeout(() => {
        this.callbacks.onEnd();
      }, this.config.ANIMATION_TIME);
    }
  }

  checkIfNoteIsInTheFretInterval(noteName: string, form: FormGroup): boolean {
    const allSelectedNotes = [
      ...this.fretboardNotes
        .slice(form.value.fretStart, form.value.fretEnd + 1)
        .join()
        .split(','),
    ];
    return allSelectedNotes.includes(noteName);
  }

  pickRandomNote() {
    const selectedNotes = this.form.value.selectedNotes;
    const randomString = UtilsService.getRandomInt(0, 6);
    const randomFret = UtilsService.getRandomInt(this.form.value.fretStart, this.form.value.fretEnd + 1);
    const note = this.fretboardNotes[randomFret][randomString];
    if (
      !note ||
      !selectedNotes.includes(note) ||
      (this.noteToFind && this.noteToFind.note && note === this.noteToFind.note.noteName)
    ) {
      return this.pickRandomNote();
    }
    this.showAll = false;
    this.noteToFind = {
      time: Date.now(),
      note: {
        noteName: note,
        fret: randomFret,
        string: randomString,
      },
    };

    if (this.callbacks && this.callbacks.onNotePicked) {
      this.callbacks.onNotePicked();
    }
  }
}
