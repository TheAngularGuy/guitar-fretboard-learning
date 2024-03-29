import { GAMES_CONFIG } from '@constants/games-config.constant';
import { UtilsService } from '@core/services/utils/utils.service';
import { Note } from '@models/note.model';

export interface GameModeEvents {
  onBeforeStart?: () => void;
  onStart?: () => void;
  onBeforeEnd?: () => void;
  onEnd?: () => void;
  onComplete?: () => void;
  onNotePicked?: () => void;
  onError?: (msg: string) => void;
}

export class GameMode {
  config = { ...GAMES_CONFIG }; // cuz the values are past by reference
  isPlaying: boolean;
  noteToFind: { note: Note; time: number }; // time: time of appearance
  score: { good: number; bad: number; total: number };

  notesAvailable: string[];
  fretsAvailable: [number, number];

  private initialized: boolean;
  private callbacks: GameModeEvents;
  private notesAppearances: { [key: string]: number } = {};
  private privateFretboardNotes: string[][];


  get gameConfig() {
    return this.config;
  }

  get scoreGood() {
    return this.score && this.score.good;
  }

  get scoreBad() {
    return this.score && this.score.bad;
  }

  get fretboardNotes() {
    return this.privateFretboardNotes;
  }

  set fretboardNotes(notes: string[][]) {
    this.privateFretboardNotes = notes;
  }

  initGameMode(fretboardNotes: string[][], callbacks: GameModeEvents) {
    this.fretboardNotes = fretboardNotes;
    this.callbacks = callbacks;
    this.initialized = true;
  }

  initRound(notes: string[], frets: [number, number]) {
    this.notesAvailable = notes;
    this.fretsAvailable = frets;
  }

  increaseScoreGood() {
    if (this.score.good + this.score.bad >= this.config.MAX_RANGE) {
      return;
    }
    this.score.good += 1;
  }

  increaseScoreBad() {
    if (this.score.good + this.score.bad >= this.config.MAX_RANGE) {
      return;
    }
    this.score.bad += 1;
  }

  togglePlay(): boolean {
    if (!this.isPlaying) {
      this.startRound();
    } else {
      this.endRound();
    }
    return this.isPlaying;
  }

  startRound() {
    if (!this.initialized || !this.fretboardNotes || !this.notesAvailable || !this.fretsAvailable) {
      throw new Error('fretboardNotes, etc... must be set from page');
    }

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
      this.notesAvailable = null;
      this.fretsAvailable = null;
    }, this.config.ANIMATION_DELAY);

    setTimeout(() => {
      if (this.callbacks && this.callbacks.onEnd) {
        this.callbacks.onEnd();
      }

      if (!!this.score && this.score.bad + this.score.good === this.config.MAX_RANGE) {
        if (this.callbacks && this.callbacks.onComplete) {
          this.callbacks.onComplete();
        }
      }
    }, this.config.ANIMATION_TIME);
  }

  pickRandomNote(loop = 0) {
    if (!this.isPlaying) {
      return;
    }
    if (this.score.total === this.score.good + this.score.bad) {
      this.togglePlay();
      return;
    }

    const selectedNotes = this.notesAvailable;
    const randomString = UtilsService.getRandomInt(0, 6);
    const randomFret = UtilsService.getRandomInt(this.fretsAvailable[0], this.fretsAvailable[1]);
    const note = this.fretboardNotes[randomFret][randomString];

    if (
      !note ||
      !selectedNotes.includes(note) ||
      this.isSameAsNoteToFindName(note) ||
      this.isNoteNameAppearanceTooHigh(note)
    ) {
      if (loop > 100) {
        console.error('Error picking random note!');
        console.log(note, UtilsService.clone(this.notesAppearances));
      } else {
        return this.pickRandomNote(loop + 1);
      }
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
    for (const n of this.notesAvailable) {
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
