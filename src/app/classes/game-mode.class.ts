import { FormGroup } from '@angular/forms';
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
  onError?: (msg: string) => void;
}

export class GameMode {
  config = { ...GAMES_CONFIG }; // cuz the values are past by reference
  isPlaying: boolean;
  noteToFind: { note: Note; time: number }; // time: time of appearance
  score: { good: number; bad: number; total: number; };

  private initialized: boolean;
  private callbacks: GameModeEvents;
  private notesAppearances: { [key: string]: number } = {};
  private _fretboardNotes: string[][];

  // setters
  set fretboardNotes(notes: string[][]) {this._fretboardNotes = notes;}

  // getters
  get fretboardNotes() {return this._fretboardNotes;}

  get gameConfig() {return this.config;}

  getScoreGood = () => this.score && this.score.good;
  getScoreBad = () => this.score && this.score.bad;

  constructor() {}

  initGameMode(fretboardNotes: string[][], callbacks: GameModeEvents) {
    this.fretboardNotes = fretboardNotes;
    this.callbacks = callbacks;
    this.initialized = true;
  }

  increaseScoreGood() {
    this.score.good += 1;
  }

  increaseScoreBad() {
    this.score.bad += 1;
  }

  togglePlay(): boolean {
    if (!this.initialized || !this.fretboardNotes) {
      throw 'fretboardNotes && form must be set from children';
    }
    if (!this.isPlaying) {
      this.startRound();
    } else {
      this.endRound();
    }
    return this.isPlaying;
  }

  startRound() {
    this.isPlaying = true;
    this.score = {
      good: 0,
      bad: 0,
      total: this.gameConfig.MAX_RANGE,
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
    this.isPlaying = false;
    setTimeout(() => {
      // we need a timeout so if the user is wrong on the last guess
      // the note stay in red a little so he knows he was wrong.
      this.noteToFind = null;
    }, this.config.ANIMATION_DELAY);
    if (this.callbacks && this.callbacks.onEnd) {
      setTimeout(() => {
        this.callbacks.onEnd();
      }, this.config.ANIMATION_TIME);
    }
  }

  pickRandomNote(loop = 0) {
    if (this.score.total === this.score.good + this.score.bad) {
      this.togglePlay();
      return;
    }

    const selectedNotes = CHROMATIC_SCALE;
    const randomString = UtilsService.getRandomInt(0, 6);
    const randomFret = UtilsService.getRandomInt(0, 17);
    const note = this.fretboardNotes[randomFret][randomString];

    if (
      !note ||
      !selectedNotes.includes(note) ||
      this.isSameAsNoteToFindName(note) ||
      this.isNoteNameAppearanceTooHigh(note)
    ) {
      return this.pickRandomNote(loop + 1);
    }
    this.notesAppearances[note] = this.notesAppearances[note] ? this.notesAppearances[note] + 1 : 1;
    this.noteToFind = {
      time: Date.now(),
      note: {
        name: note,
        fret: randomFret,
        string: randomString,
      },
    };

    if (this.callbacks && this.callbacks.onNotePicked) {
      this.callbacks.onNotePicked();
    }
  }

  private isSameAsNoteToFindName(noteName: string) {
    return this.noteToFind && this.noteToFind.note && noteName === this.noteToFind.note.name;
  }

  private setNotesAppearance() {
    for (const n of CHROMATIC_SCALE) {
      this.notesAppearances[n] = 0;
    }
  }

  private isNoteNameAppearanceTooHigh(noteName: string) {
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

  private checkIfNoteIsInTheFretInterval(noteName: string, fretStart: number, fretEnd: number): boolean {
    const allSelectedNotes = [
      ...this.fretboardNotes
        .slice(fretStart, fretEnd + 1)
        .join()
        .split(','),
    ];
    return allSelectedNotes.includes(noteName);
  }
}
