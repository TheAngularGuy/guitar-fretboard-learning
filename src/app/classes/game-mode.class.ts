import { FormGroup } from '@angular/forms';

import { GAMES_CONFIG } from '../constants/games-config.constant';
import { Note } from '../models/note.model';
import { UtilsService } from '../shared/services/utils/utils.service';

export interface GameModeEvents {
  onBeforeStart?: () => void;
  onStart?: () => void;
  onBeforeEnd?: () => void;
  onEnd?: () => void;
  onNotePicked?: () => void;
  onError?: (msg: string) => void;
}

export class GameMode {
  config = { ...GAMES_CONFIG }; // cuz the values are past by reference
  play: boolean;
  showSettings: boolean;
  showAll: boolean; // show all notes of the fretboard
  noteToFind: { note: Note; time: number }; // time: time of appearance
  score: { good: number; bad: number };
  fretboardNotes: string[][];
  form: FormGroup; // must contain [selectedNotes, fretStart, fretEnd] properties
  private initialized: boolean;
  private callbacks: GameModeEvents;
  private notesAppearances: { [key: string]: number } = {};

  // getters
  getForm = () => this.form;
  getFretboardNotes = () => this.fretboardNotes;
  getNoteToFind = () => this.noteToFind;
  getGameConfig = () => this.config;
  getScoreGood = () => this.score && this.score.good;
  getScoreBad = () => this.score && this.score.bad;
  getShowSettings = () => this.showSettings;
  getShowAllNotes = () => this.showAll;
  isGamePlaying = () => this.play;

  // setters
  setShowSettings = (v: boolean) => (this.showSettings = v);
  setShowAllNotes = (v: boolean) => (this.showAll = v);

  constructor() {}

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

  increaseScoreGood() {
    this.score.good += 1;
  }

  increaseScoreBad() {
    this.score.bad += 1;
  }

  togglePlay(): boolean {
    if (!this.initialized || !this.fretboardNotes || !this.form) {
      throw 'fretboardNotes && form must be set from children';
    }
    if (this.form.invalid || this.form.value.fretStart >= this.form.value.fretEnd) {
      const message =
        this.form.value.fretStart >= this.form.value.fretEnd
          ? 'Please set the ending fret to be greater than the starting fret.'
          : 'Invalid form, please select at least two notes and two frets (between 0 and 17).';
      if (this.callbacks && this.callbacks.onError) {
        this.callbacks.onError(message);
      }
      return;
    }
    for (const n of this.form.value.selectedNotes) {
      if (!this.checkIfNoteIsInTheFretInterval(n, this.form)) {
        const message =
          'The notes you selected are not all present in the interval of frets. ' +
          `For example ${n} is not present. Please change the settings.`;
        if (this.callbacks && this.callbacks.onError) {
          this.callbacks.onError(message);
        }
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
    this.setNotesAppearance();

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

  pickRandomNote(loop = 0) {
    const selectedNotes = this.form.value.selectedNotes;
    const randomString = UtilsService.getRandomInt(0, 6);
    const randomFret = UtilsService.getRandomInt(this.form.value.fretStart, this.form.value.fretEnd + 1);
    const note = this.fretboardNotes[randomFret][randomString];

    if (
      !note ||
      !selectedNotes.includes(note) ||
      this.compareWithNoteToFind(note) ||
      this.isNotesAppearanceTooHight(note)
    ) {
      return this.pickRandomNote(loop + 1);
    }
    this.showAll = false;
    this.notesAppearances[note] = this.notesAppearances[note] ? this.notesAppearances[note] + 1 : 1;
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

  private compareWithNoteToFind(noteName: string) {
    return this.noteToFind && this.noteToFind.note && noteName === this.noteToFind.note.noteName;
  }

  private setNotesAppearance() {
    for (const n of this.form.value.selectedNotes) {
      this.notesAppearances[n] = 0;
    }
  }

  private isNotesAppearanceTooHight(noteName: string) {
    if (!this.notesAppearances) {
      return false;
    }
    let maxAppearance = 0;
    let minAppearance = +Infinity;
    for (const noteKey in this.notesAppearances) {
      if (noteName === noteKey) {
        continue;
      }
      maxAppearance = Math.max(maxAppearance, this.notesAppearances[noteKey]);
      minAppearance = Math.min(minAppearance, this.notesAppearances[noteKey]);
    }
    if (maxAppearance === minAppearance) {
      return this.notesAppearances[noteName] > maxAppearance;
    }
    return this.notesAppearances[noteName] >= maxAppearance;
  }
}
